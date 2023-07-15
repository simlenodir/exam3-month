import { Router } from "express";
import verifyToken from "../../middleWares/verifyToken.js";
import homeInfo from "./homeInfo.js";

const homesRouter = Router()

export default homesRouter
.get('/home-info', homeInfo.GET_HOME)
.get('/home-complex', homeInfo.GET_HOME_COMPLEX)
.post('/create-home', homeInfo.CREATE_NEW_HOME)
.put('/update-home/:homeId', homeInfo.UPDATE_HOME_DETAILS)
.delete('/delete-home/:homeId', homeInfo.DELETE_HOME_DETAIL)