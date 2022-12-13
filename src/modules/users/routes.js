import { Router } from "express";
import usersCalculate from "./usersCalculate.js";

const userRouter = Router()

export default userRouter
.get('/users-company/:compId', usersCalculate.FOUND_COMPANY)
.get('/users-complex/:branchId', usersCalculate.FOUND_COMPLEX)
.get('/users-home/:roomId', usersCalculate.FOUND_ROOM)
.get('/users-branch', usersCalculate.SELECT_ALL_BRANCH)
.get('/users-calc?',usersCalculate.USERS_CALCULATE )