import prisma from "../config/db";
import {
  extractImageAndExtension,
  saveBase64Image,
} from "../utils/base64ToImage";
import {
  SingleUserParam,
  UserLogin,
  UserRegister,
} from "../validations/userValidations";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const allUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error: any) {
    throw error;
  }
};

export const createUser = async (input: UserRegister) => {
  try {
    const { email, fullname, password, phone, username, image, menuRights } =
      input;

    const emailExists = await ifUserExistsByEmail(email);

    if (emailExists) {
      throw new Error("Email already exists");
    }

    const usernameExists = await ifUserExistsByUsername(username);

    if (usernameExists) {
      throw new Error("Username already exists");
    }

    //   Hash password
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        fullname,
        hashedPassword,
        phone,
        username,
        UserMenuRight: {
          createMany: {
            data: menuRights,
          },
        },
      },
    });

    let imageName;
    if (image) {
      const { image: imageBase64, extension } = extractImageAndExtension(image);
      imageName = `${user.id}-${Date.now()}.${extension}`;
      const { success } = await saveBase64Image(imageBase64, imageName);
      if (!success) throw new Error("Failed to save user image");
    }

    const updatedUser = await prisma.user.update({
      data: {
        image: imageName,
      },
      where: {
        id: user.id,
      },
    });

    return updatedUser;
  } catch (error: any) {
    throw error;
  }
};

export const getSingleUser = async (input: SingleUserParam) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: input.id,
      },
      include: {
        UserMenuRight: true,
      },
    });
    return user;
  } catch (error: any) {
    throw error;
  }
};

export const authenticateUsers = async (input: UserLogin) => {
  try {
    const user = await ifUserExistsByUsername(input.username);

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(
      input.password,
      user.hashedPassword
    );

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const rights = await prisma.userMenuRight.findMany({
      include: {
        menu: true,
      },
      where: {
        userId: user.id,
      },
    });

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "5h" }
    );

    return {
      user_info: { ...user, bearer_token: token },
      menu:
        rights.length > 0
          ? rights.map((right) => {
              return {
                menu_id: right.menu.id,
                menu_name: right.menu.name,
                icon: right.menu.icon,
                sorting: right.menu.sorting,
                url: right.menu.url,
                parent_id: right.menu.parentId,
                can_view: right.canView,
                can_create: right.canCreate,
                can_edit: right.canEdit,
                can_delete: right.canDelete,
              };
            })
          : [],
    };
  } catch (error: any) {
    throw error;
  }
};

export const ifUserExistsByUsername = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
};

export const ifUserExistsByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
