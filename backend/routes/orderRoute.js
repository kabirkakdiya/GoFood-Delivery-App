import express from 'express'
import authMiddleware from '../middlewares/auth.js'
import { listOrders, placeOrder, updateStatus, userOrders } from '../controllers/orderController.js'

const orderRouter = express.Router();

//api endpoints
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus)
export default orderRouter;