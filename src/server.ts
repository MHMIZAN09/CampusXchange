import app from './app';
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error: any) {
    console.error('Error starting server:', error.message);
    process.exit(1);
  }
}


startServer();
