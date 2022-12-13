import { Router } from "express";
import bankRouter from "./banks/routes.js"
import companiesRouter from "./companies/routes.js"
import branchRouter from "./branches/routes.js"
import homesRouter from "./home/routes.js"
import userRouter from "./users/routes.js"
const routes = Router()

export default routes
.use('/home', bankRouter, companiesRouter, branchRouter,homesRouter,userRouter)