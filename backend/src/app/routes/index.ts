import { Router } from "express"
import { userRouter } from "../modules/user/user.route"
import { authRouter } from "../modules/auth/auth.routes"
import { divisionRouter } from "../modules/division/division.route"
import { tourRouter } from "../modules/tour/tour.routes"

const v1Router: Router = Router()

interface IModuleRoute {
    path: string,
    route : Router
}

const moduleRoutes: IModuleRoute[] = [
    {
        path:'/user',
        route: userRouter
    },
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/division',
        route: divisionRouter
    },
    {
        path: '/tour',
        route: tourRouter
    },
]

moduleRoutes.forEach(route=>{
    v1Router.use(route.path, route.route)
})

export default v1Router;