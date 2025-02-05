import { Request, Response } from "express";
import { IGroup } from "../models/IGroup";
import mongoose from "mongoose";
import GroupTable from "../databases/GroupSchema";

// @usage : to get all groups
// @method : GET
// @params : no-params

export const getAllGroups = async (request: Request, response: Response) => {
  try {
    let groups: IGroup[] | undefined = await GroupTable.find();
    if (groups) {
      return response.status(200).json(groups);
    }
  } catch (error: any) {
    return response.status(500).json({ msg: "Data  not found" });
  }
};
