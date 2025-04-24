import mongoose from "mongoose";

export const db_connect = async () => {
    await mongoose.connect("mongodb://localhost:27017/food_delivery_db").then(() => console.log("Database connected."));
}