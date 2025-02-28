import { Request, Response, Router } from "express";
import { body } from "express-validator";

const UserRouter: Router = Router();


// UserRouter.get("/home", (request: Request, response: Response) => {
//     response.status(200).json({
//         msg: "Welcome to home"
//     })
// })

// UserRouter.post("/insertUser", (request: Request, response: Response) => {
//     response.status(200).json({
//         msg: "DataInserted.."
//     })
// })

UserRouter.get("/:userId", async (request: Request, response: Response) => {
    await UserController.getuser(request, response)
})

import * as UserController from "../controller/UserController"



// @usage  : get all users
// @method : get
// @params : no-params
// @url    :http://127.0.0.1:9797/users

UserRouter.get("/", async (request: Request, response: Response) => {
    await UserController.getAllUsers(request, response)
})

// @usage : register User
// @method : POST
// @params : username, email, password 
// @url : http://127.0.0.1:9989/users/register

UserRouter.post("/register",
    [
        body('username').not().isEmpty().withMessage("Name is Required"), // this is all validation (express-validation)
        body('email').isEmail().withMessage("Email is Required"),
        body('password').not().isStrongPassword().withMessage("Password is Required"),
        // body('imageUrl').not().isEmpty().withMessage("Image is Required"),
        // body('isAdmin').not().isEmpty().withMessage("IsAdmin is Required")
    ],

    async (request: Request, response: Response) => {
        console.log("post");
        await UserController.registerUser(request, response);
    }
);

// @usage : register User
// @method : POST
// @params : username, email, password,imageUrl,isAdmin 
// @url : http://127.0.0.1:9989/users/

UserRouter.put("/:userId", async (request: Request, response: Response) => {
    await UserController.updateUser(request, response)
})

// delete

UserRouter.delete("/:userId", async (request: Request, response: Response) => {
    await UserController.deleteUser(request, response)
})

export default UserRouter