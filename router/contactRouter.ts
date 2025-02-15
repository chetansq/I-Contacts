import { Request, Response, Router } from "express"
import * as ContactController from "../controller/ContactController"

const contactRouter: Router = Router();

// contactRouter.get("/", (request: Request, response: Response) => {
//     response.status(200).json({ msg: "welcome home" })
// })

// contactRouter.post("/insertContact", (request: Request, response: Response) => {
//     response.status(200).json({
//         msg: "Insert Contact Data.."
//     })
// })



// @usage  : get all contacts
// @method : get
// @params : no-params
// @url    :http://127.0.0.1:9989/contacts


contactRouter.get("/", async (request: Request, response: Response) => {
    await ContactController.getAllContacts(request, response);
})

// contact id

contactRouter.get("/:contactId", async (request: Request, response: Response) => {
    await ContactController.getContact(request, response);
})

// post

contactRouter.post("/", async (request: Request, response: Response) => {
    await ContactController.createContact(request, response);
});

// update

contactRouter.put("/:contactId", async (request: Request, response: Response) => {
    await ContactController.updateContact(request, response);
});

// delete 

contactRouter.delete("/:contactId", async (request: Request, response: Response) => {
    await ContactController.deleteContact(request, response);
});



export default contactRouter