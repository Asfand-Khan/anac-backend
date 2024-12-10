import { PrismaClient, Prisma } from '@prisma/client';
import logger from './logger';

declare global {
    var prisma: PrismaClient | undefined;
}

// Create an array of log definitions explicitly typed
const logLevels: Prisma.LogDefinition[] = [
    { emit: 'event', level: 'query' },
    { emit: 'stdout', level: 'info' },
    { emit: 'stdout', level: 'warn' },
    { emit: 'stdout', level: 'error' },
];

const prisma = global.prisma || new PrismaClient({
    log: logLevels,
});

// Custom log handler for Prisma events
// @ts-ignore
prisma.$on('query', (e: any) => {
    logger.info(`Prisma Query: ${e.query} - Params: ${e.params}`);
});
// @ts-ignore
prisma.$on('info', (e: any) => {
    logger.info(`Prisma Info: ${e.message}`);
});
// @ts-ignore
prisma.$on('warn', (e: any) => {
    logger.warn(`Prisma Warning: ${e.message}`);
});
// @ts-ignore
prisma.$on('error', (e: any) => {
    logger.error(`Prisma Error: ${e.message}`);
});

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}

export default prisma;
