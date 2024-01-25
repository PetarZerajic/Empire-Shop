import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    const DB = process.env.MONGO_DB?.replace(
      "<password>",
      process.env.MONGO_DB_PASSWORD!
    );
    await mongoose.connect(DB!);
    console.log("Connection to database established");
  } catch (err) {
    console.log(err);
  }
};
