import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} }
}, { minimize: false }) // allows to create empty objects in documents. Otherwise, by default, mongoose removes empty objects.

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;