import express from 'express'
import cors from 'cors'
import { db_connect } from './config/db_connect.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'


// app config
const app = express()
const port = 5000

// middleware
app.use(express.json())
app.use(cors())

// db connection
db_connect();

// api endpoints
app.use('/api/food', foodRouter)
app.use('/images', express.static('./uploads')) //mounting uploads folder to '/images' endpoint for easy access.
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
    res.send("API working")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})