import express from "express";
import { addFood, getFoodInfo, listFood, removeFood, updateFood } from "../controllers/foodControllers.js";
import multer from "multer";

const foodRouter = express.Router();


// Image storage
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, callback) => {
        return callback(null, `${Date.now()}${file.originalname}`)
    }
})

// Using above configured storage to create a middleware
const upload = multer({ storage: storage })

// Using this middleware on the '/api/food/add' route.
foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)
foodRouter.post("/update", updateFood)
foodRouter.post("/getfood", getFoodInfo);
export default foodRouter;