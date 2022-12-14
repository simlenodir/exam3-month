import { Router } from "express";
import validationMiddleware from "../../middleWares/validation/validationMiddleware.js";
import verifyToken from "../../middleWares/verifyToken.js";
import { CreateBanks, Register } from "../../validation/validaton.js";
import auth from "../auth/auth.js";
import bank from "./bank.js";

const bankRouter = Router()

export default bankRouter
.post('/register',validationMiddleware(Register), auth.Register)
.post('/login', auth.Login_Post)
.get('/admin?',verifyToken, bank.GET_ADMIN )
.get('/pages?', bank.GET_PAGES )
.post('/create-bank', validationMiddleware(CreateBanks), bank.POST_BANK)
.put('/bank-update/:bankId', bank.UPDATE_BANK)
.delete('/delete-bank/:bankId', bank.DELETE_BANK)