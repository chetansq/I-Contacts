import { Response, Request } from "express";
import UserTable from "../databases/UserSchema";
import { IUser } from "../models/IUser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import gravatar from "gravatar"
import { validationResult } from "express-validator";
import { log } from "console";

// @usage : to get all users
// @method : GET
// @params : no-params

export const getAllUsers = async (request: Request, response: Response) => {
    try {
        let users: IUser[] | undefined = await UserTable.find();

        if (users) {
            return response.status(200).json(users)
        }

    } catch (err: any) {
        return response.status(500).json({
            msg: "Data not Found"
        })
    }
};

// get user id

export const getuser = async (request: Request, response: Response) => {
    let { userId } = request.params;
    const mongoUserId = new mongoose.Types.ObjectId(userId);
    let theuser: IUser | undefined | null = await UserTable.findById(
        mongoUserId
    );
    if (!theuser) {
        return response.status(500).json({
            data: null,
            error: "No Group is found",
        });
    }
    return response.status(200).json(theuser);
};

// @usage : register User
// @method : POST
// @params : username, email, password 
// @url : http://127.0.0.1:9989/users/register

export const registerUser = async (request: Request, response: Response) => {

    const errors = validationResult(request);

    // express validator error handling
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    try {

        let { username, email, password } = request.body;
        // check if the user exists
        const userobj = await UserTable.findOne({ email: email });

        log(request.body);
        if (userobj) {
            return response.status(400).json(
                {
                    error: "The user is already exists"
                }
            );
        }

        // password encryption

        const slat = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, slat);

        // gravatar url

        const imageUrl = gravatar.url(email, {
            size: "200",
            rating: "pg",
            default: "mm"
        });

        //insert to db

        const newUser: IUser = {  // overide IUser interface
            username: username,
            email: email,
            password: hashPassword,
            imageUrl: imageUrl,
            isAdmin: false
        };

        let theuser: IUser | null | undefined = await new UserTable(newUser).save();

        if (theuser) {
            return response.status(200).json({
                data: theuser,
                msg: "User is created"
            })
        }

    } catch (e: any) {  // error no object 
        response.status(500).json({
            // status:APP_STATUS.FAILED
            // data:null,
            error: e.message
        });
    };
};

//update

export const updateUser = async (request: Request, response: Response) => {
    let { userId } = request.params;
    let { username, email, password, imageUrl, isAdmin } = request.body;
    // const mongoUserId = new mongoose.Types.ObjectId(userId);
    let theuser: IUser | undefined | null = await UserTable.findByIdAndUpdate(
        userId,
        {
            username,
            email,
            password,
            imageUrl,
            isAdmin
        },
        {
            new: true
        }
    );
    if (!theuser) {
        return response.status(500).json({
            data: null,
            error: "No User is found",
        });
    }
    return response.status(200).json(theuser);
};

//delete


export const deleteUser = async (request: Request, response: Response) => {
    let { userId } = request.params;
    // const mongoUserId = new mongoose.Types.ObjectId(userId);
    let theuser: IUser | undefined | null = await UserTable.findByIdAndDelete(
        userId,

    );
    if (!theuser) {
        return response.status(500).json({
            data: null,
            error: "No Group is found",
        });
    }
    return response.status(200).json(theuser);
};



// create user

// export const registerUser = async (request: Request, response: Response) => {
//     let { username, email, password, imageUrl, isAdmin } = request.body;

//     let theuser: IUser | null | undefined = await new UserTable({
//         username: username,
//         email: email,
//         password: password,
//         imageUrl: imageUrl,
//         isAdmin: isAdmin
//     }).save();

//     if (theuser) {
//         return response.status(200).json({
//             data: theuser,
//             msg: "User is created"
//         })
//     }
// }