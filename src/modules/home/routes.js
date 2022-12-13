import { Router } from "express";
import verifyToken from "../../middleWares/verifyToken.js";
import homeInfo from "./homeInfo.js";

const homesRouter = Router()

export default homesRouter
.get('/home-info', verifyToken, homeInfo.GET_HOME)
.get('/home-complex', verifyToken, homeInfo.GET_HOME_COMPLEX)
.post('/create-home', verifyToken, homeInfo.CREATE_NEW_HOME)
.put('/update-home/:homeId', verifyToken, homeInfo.UPDATE_HOME_DETAILS)
.delete('/delete-home/:homeId', verifyToken, homeInfo.DELETE_HOME_DETAIL)