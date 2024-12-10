import express from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "./config/logger";
import morgan from "morgan";
import routes from "./routes";

export default (app: express.Application): void => {
  app.use(express.json());
  app.use(cors());
  app.use(helmet());

  app.use(morgan(function (tokens, req, res) {
    logger.info(`[METHOD]: ${tokens.method(req, res)} [PATH]: ${tokens.url(req, res)} [STATUS]: ${tokens.status(req, res)} [CONTENT_LENGTH]: ${tokens.res(req, res, "content-length")} [RESPONSE_TIME]: ${tokens["response-time"](req, res)} ms [BODY]: ${JSON.stringify(req.body)}`);
      return [
        '[METHOD]:',
        tokens.method(req, res),
        '[PATH]:',
        tokens.url(req, res),
        '[STATUS]:',
        tokens.status(req, res),
        '[CONTENT_LENGTH]:',
        tokens.res(req, res, "content-length"),
        '[RESPONSE_TIME]:',
        tokens["response-time"](req, res),
        "ms",
      ].join(" ");
  }));

  app.use("/api/v1", routes);

  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      logger.error(
        `Error occurred on request ${req.method} ${req.url}: ${err.message}`
      );
      res.status(500).json({ message: err.message });
    }
  );
};