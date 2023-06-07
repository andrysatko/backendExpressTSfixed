import dotenv from "dotenv"
dotenv.config()

export  const ConfigDB = {
    Port: Number(process.env.DB_PORT) ,
    Host: process.env.DB_HOST,
    User: process.env.DB_USER as string,
    Database: process.env.DB_DATABASE as string,
    Password: process.env.DB_PASSWORD as string ,
}