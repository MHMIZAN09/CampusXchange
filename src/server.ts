import app from './app';
import { config } from './app/config';
import { prisma } from './app/lib/prisma';


const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to the database successfully.');
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });

  } catch (error: any) {
    console.error('Error starting server:', error.message);
    process.exit(1);
  }
}


startServer();
