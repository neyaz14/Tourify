import { Router } from "express";
import { TourController } from "./tour.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateZodRequest";
import { createTourTypeZodSchema, createTourZodSchema, updateTourZodSchema } from "./tour.zodSchema";

export const tourRouter = Router();

/* ------------------ TOUR TYPE ROUTES -------------------- */
tourRouter.get("/tour-types", TourController.getAllTourTypes);

tourRouter.post(
    "/create-tour-type",
    checkAuth(Role.Admin, Role.Super_Admin),
    validateRequest(createTourTypeZodSchema),
    TourController.createTourType
);

tourRouter.patch(
    "/tour-types/:id",
    checkAuth(Role.Admin, Role.Super_Admin),
    validateRequest(createTourTypeZodSchema),
    TourController.updateTourType
);

tourRouter.delete("/tour-types/:id",
    checkAuth(Role.Admin, Role.Super_Admin),
    TourController.deleteTourType);


    /* --------------------- TOUR ROUTES ---------------------- */
tourRouter.get("/", TourController.getAllTours);

tourRouter.post(
    "/create",
    checkAuth(Role.Admin, Role.Super_Admin),
    validateRequest(createTourZodSchema),
    TourController.createTour
);

tourRouter.patch(
    "/:id",
    checkAuth(Role.Admin, Role.Super_Admin),
    validateRequest(updateTourZodSchema),
    TourController.updateTour
);

tourRouter.delete("/:id", 
    checkAuth(Role.Admin, Role.Super_Admin),
    TourController.deleteTour);