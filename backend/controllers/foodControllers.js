import foodModel from "../models/foodModel.js";
import fs from 'fs';

// logic to add food item and give proper response.
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try {
        await food.save();
        res.json({ success: true, message: "Food Added successfully" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// update food item
const updateFood = async (req, res) => {
    try {
        await foodModel.findByIdAndUpdate(req.body.id, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category
        });
        res.json({ success: true, message: "Food Updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }

}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { });

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// get food item info
const getFoodInfo = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        res.json({ success: true, data: food });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}
export { addFood, listFood, removeFood, updateFood, getFoodInfo }