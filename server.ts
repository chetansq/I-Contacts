import express, { Application, Request, Response } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import contactRouter from "./router/contactRouter"

dotenv.config({ path: "./.env" })

const port: string | number | undefined = process.env.PORT || 9787;
const hostName: string = "127.0.0.1";

const dbUrl: any = process.env.MONGO_DB_CLOUD_URL;
const dbName: string | undefined = process.env.MONGO_DB_DATABASE;


mongoose.connect(dbUrl, { dbName: dbName }).then(() => console.log("Database Connection is Ready...")
).catch((err) => console.log(err)
)


const app: Application = express();

app.get("/", (request: Request, response: Response) => {
    response.status(200).json({
        msg: "welcome to express server"
    })
})

app.listen(Number(port), hostName, () => {
    console.log(`Expresss server started http://${hostName}:${port}`);

})

app.use("/api/contacts", contactRouter)
