import mongoose from "mongoose";

export const connectDb = async () => {

  try {

    if (mongoose.connections[0].readyState) {
      return;
    }

    await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: "work_manager",
    });

    console.log("db connected...");

  } catch (error) {

    console.log(error);

  }
};