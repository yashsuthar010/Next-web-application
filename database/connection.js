import mongoose from "mongoose";

export const conn = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("database connected"))
    .catch((error) => console.log(error));
};
