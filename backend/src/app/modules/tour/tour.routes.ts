import { Router } from "express";
import { TourController } from "./tour.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateZodRequest";

export const tourRouter = Router();

/* ------------------ TOUR TYPE ROUTES -------------------- */
tourRouter.get("/tour-types", TourController.getAllTourTypes);

tourRouter.post(
    "/create-tour-type",
    checkAuth(Role.Admin, Role.Super_Admin),
    // validateRequest(createTourTypeZodSchema),
    TourController.createTourType
);

tourRouter.patch(
    "/tour-types/:id",
    checkAuth(Role.Admin, Role.Super_Admin),
    // validateRequest(createTourTypeZodSchema),
    TourController.updateTourType
);

tourRouter.delete("/tour-types/:id",
    checkAuth(Role.Admin, Role.Super_Admin), TourController.deleteTourType);