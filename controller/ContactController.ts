import { Request, Response } from "express";
import ContactTable from "../databases/ContactSchema";
import { IContact } from "../models/IContact";
import mongoose from "mongoose";

// get all contact

export const getAllContacts = async (request: Request, response: Response) => {
    try {
        let contact: IContact[] | undefined = await ContactTable.find();
        if (contact) {

            return response.status(200).json(contact);
        }
    } catch (error: any) {
        response.status(500).json({
            msg: "Data not Found"
        })
    }
}

// get Contact id

export const getContact = async (request: Request, response: Response) => {
    let { contactId } = request.params;

    const mongoContactId = new mongoose.Types.ObjectId(contactId);

    let theContact: IContact[] | undefined | null = await ContactTable.findById(
        mongoContactId
    );


    if (!theContact) {
        return response.status(500).json({
            data: null,
            error: "No Contact Found"
        });
    }

    return response.status(200).json(theContact);
}


// create contact (post)

export const createContact = async (request: Request, response: Response) => {
    let { user, name, imageUrl, mobile, email, company, title, groupId } = request.body;

    let theContact: IContact | null | undefined = await new ContactTable({
        user: user,
        name: name,
        imageUrl: imageUrl,
        mobile: mobile,
        email: email,
        company: company,
        title: title,
        groupId: groupId

    }).save();

    if (theContact) {
        return response.status(200).json({
            data: theContact,
            msg: "Contact is Created"
        })
    }
}

// update


export const updateContact = async (request: Request, response: Response) => {
    let { contactId } = request.params;

    let { user, name, imageUrl, mobile, email, company, title, groupId } = request.body;

    let theContact: IContact | null | undefined = await ContactTable.findByIdAndUpdate(contactId, {
        user,
        name,
        imageUrl,
        mobile,
        email,
        company,
        title,
        groupId

    }, {
        new: true
    });

    if (!theContact) {
        return response.status(500).json({
            data: null,
            msg: "Contact is Not Found"
        })
    }

    return response.status(200).json(theContact);
}


// delete

export const deleteContact = async (request: Request, response: Response) => {
    let { contactId } = request.params;

    let theContact: IContact | null | undefined = await ContactTable.findByIdAndDelete(contactId,);

    if (!theContact) {
        return response.status(500).json({
            data: null,
            msg: "Contact is Not Found"
        })
    }

    return response.status(200).json(theContact);
}

