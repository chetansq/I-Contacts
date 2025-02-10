import { Router, Request, Response } from "express";
import * as groupController from "../controller/groupController";
import { body } from "express-validator";

const groupRouter: Router = Router();


// @usage  : get all groups
// @method : get
// @params : no-params
// @url    :http://127.0.0.1:9987/groups


groupRouter.get("/", async (request: Request, response: Response) => {
  await groupController.getAllGroups(request, response);
});


// @usage  : create groups
// @method : POST
// @params : name
// @url    :http://127.0.0.1:9987/groups


groupRouter.post(
  "/", // url pattern
   
  [body('name').not().isEmpty().withMessage("Name is Required")], // express validator / validation

  async (request: Request, response: Response) => {

console.log("post");

    await groupController.createGroups(request, response);
  }
);

export default groupRouter;
