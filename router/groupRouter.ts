import { Router, Request, Response } from "express";
import * as groupController from "../controller/groupController";
import { request } from "http";

const groupRouter: Router = Router();

groupRouter.get("/", async (request: Request, response: Response) => {
  await groupController.getAllGroups(request, response);
});

export default groupRouter;
