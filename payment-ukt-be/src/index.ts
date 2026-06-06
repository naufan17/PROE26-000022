import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import prisma from './config/database';

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;
const host: string = process.env.HOST || 'localhost';

app.use(
  express.json(),
  express.urlencoded({ extended: false }),
  cors({ origin: '*' }),
  morgan('combined'),
  helmet()
);


async function startServer() {
  try {
    await prisma.$connect();
    console.log('Database connection established successfully.');

    app.listen(Number(port), host, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log('Database connection failed during startup:', error);
    await prisma.$disconnect(); 
    process.exit(1);
  }
}

const handleGracefulShutdown = async (signal: string) => {
  console.log(`Received ${signal}. Starting graceful shutdown...`);
  try {
    await prisma.$disconnect();
    console.log('Database connection closed cleanly.');
    process.exit(0);
  } catch (error) {
    console.log('Error closing database connection:', error);
    process.exit(1);
  }
};

process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));
process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));

startServer();
// app.listen(port, () => {
//   console.log(`[server] Server is running on http://${host}:${port}`);
// });

export default app;