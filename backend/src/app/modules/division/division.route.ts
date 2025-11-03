import { Router } from "express";
import { validateRequest } from "../../middlewares/validateZodRequest";
import { createDivisionZodSchema, updateDivisionZodSchema } from "./division.zodSchema";
import { divisionController } from "./division.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";


export const divisionRouter = Router();

// ! use checkAuth 

divisionRouter.post("/create", checkAuth(Role.Admin, Role.Super_Admin), validateRequest(createDivisionZodSchema), divisionController.createDivisioin);

divisionRouter.get("/allDivision", divisionController.getAllDivision)

divisionRouter.patch("/:id", validateRequest(updateDivisionZodSchema), divisionController.updateDivision)

divisionRouter.delete('/:id', divisionController.deleteDivision)