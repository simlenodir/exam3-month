import { Router } from "express";
import verifyToken from "../../middleWares/verifyToken.js";
import companies from "./companies.js";

const companiesRouter = Router()

export default companiesRouter
.get('/companies', companies.GET_COMPANIES)
.post('/create-company', companies.CREATE_COMPANIES)
.put('/update-company/:compId', companies.UPDATE_COMPANY)
.delete('/delete-company/:compId', companies.DELETE_COMPANY)