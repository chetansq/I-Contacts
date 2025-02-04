import { Request, Response, Router } from "express"

const contactRouter: Router = Router();

contactRouter.get("/", (request: Request, response: Response) => {
    response.status(200).json({ msg: "welcome home" })
})

contactRouter.post("/insertContact", (request: Request, response: Response) => {
    response.status(200).json({
        msg: "Insert Contact Data.."
    })
})

export default contactRouter