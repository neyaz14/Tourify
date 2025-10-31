import { Router } from "express";
import { validateRequest } from "../../middlewares/validateZodRequest";
import { createDivisionZodSchema } from "./division.zodSchema";
import { divisionController } from "./division.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";


export const divisionRouter = Router();

divisionRouter.post("/create",validateRequest(createDivisionZodSchema), divisionController.createDivisioin);  

divisionRouter.get("/allDivision", divisionController.getAllDivision)