import { Request, Response } from "express";
import { IGroup } from "../models/IGroup";
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

// @usage : create groups
// @method : POST
// @params : name
// @url    :

export const createGroups = async (request: Request, response: Response) => {
  let { name } = request.body;

  // console.log("create groups ",name);

  let theGroup: IGroup | null | undefined = await new GroupTable({
    name: name,
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
