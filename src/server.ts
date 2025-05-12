import express, { Application } from 'express';
import dotenv from 'dotenv';
import logger from './config/logger';
import prisma from './config/db';
import appSetup from './app';

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 7000;

appSetup(app);

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Promise Rejection:', reason);
    process.exit(1);
});

app.listen(PORT, async () => {
    try {
        await prisma.$connect();
        logger.info(`Database connected and server running on port http://localhost:${PORT}`);
    } catch (error) {
        logger.error('Database connection error', error);
        process.exit(1);
    }
});
