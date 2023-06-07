import express  ,{ Application } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import fileUpload from "express-fileupload"
import * as dotenv from 'dotenv'
import path from 'path'
import {sequelize, User} from './databasemodel/dbConnection'
import {authRouter} from "./router/auth.router"
import './procress';
import cookieParser from "cookie-parser"
import {userRouter} from "./router/user.router";
import {errorMiddleware} from "./middleware/error.middleware";
import {brandRouter} from "./router/brand.router";
import {productRouter} from "./router/product.router";
dotenv.config()

const app = express()
app.use(fileUpload())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('static'));

app.use('/api',authRouter,userRouter , brandRouter,productRouter);
app.use('/' , errorMiddleware);
cors({
    credentials: true,
    origin: "http://localhost:3000",
})

app.listen(process.env.PORT, async () => {
    console.log(`server is running on port: ${process.env.PORT} \n http://localhost:5000/` )
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.log(error)
    }
})




