import mongoose from 'mongoose';

// use async due to returning promise
const connectDB = async () => {
  // try catch
  try {
    // await because .connect returns a promise. As a parameter, .connect takes the connection string defined in .env file
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // options required with the current version of Mongoose to avoid warning in the console
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      compress: true,
    });

    // if successful, output message in console with the connection host.
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    // if unsuccessful, output error message
    console.error(`Error: ${error.message}`.red.underline.bold);
    // exit with failure - (1)
    process.exit(1);
  }
};

export default connectDB;
