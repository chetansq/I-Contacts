import { Request, Response } from "express";
import { IGroup } from "../models/IGroup";
import GroupTable from "../databases/GroupSchema";
import mongoose from "mongoose";

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

// @usage : to get all groups
// @method : GET
// @params : no-params

export const getGroup = async (request: Request, response: Response) => {
  let { GroupId } = request.params;

  const mongoGroupId = new mongoose.Types.ObjectId(GroupId);

  let theGroup: IGroup | null | undefined = await GroupTable.findById(
    mongoGroupId
  );
  if (!theGroup) {
    return response.status(200).json({
      data: null,
      msg: "No Group is Found",
    });
  }
  return response.status(200).json(theGroup);
};

// @usage : create groups
// @method : POST
// @params : name
// @url    :

export const createGroups = async (request: Request, response: Response) => {
  let { name } = request.body; // destructure

  // console.log("create groups ",name);

  let theGroup: IGroup | null | undefined = await new GroupTable({
    name: name, // assignment
  }).save();

  if (theGroup) {
    return response.status(200).json({
      data: theGroup,
      msg: "Group is Created",
    });
  }

  // try {
  //   let groups: IGroup[] | undefined = await GroupTable.find();
  //   if (groups) {
  //     return response.status(200).json(groups);
  //   }
  // } catch (error: any) {
  //   return response.status(500).json({ msg: "Data  not found" });
  // }
};
