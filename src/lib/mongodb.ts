import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://dhullv73:ga54QKNnTLKRRvTc@cluster0.hvvbwlp.mongodb.net/Tasks?retryWrites=true&w=majority");
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;