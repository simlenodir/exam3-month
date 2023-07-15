import { Router } from "express";
import verifyToken from "../../middleWares/verifyToken.js";
import branch_comp from "./branch_comp.js";

const branchRouter = Router()

export default branchRouter
.get('/all-branches', branch_comp.GET_BRANCHES)
.post('/create-branch', branch_comp.CREATE_BRANCH)
.put('/update-branch/:branchId',branch_comp.UPDATE_BRANCH )
.delete('/delete-branch/:id', branch_comp.DELETE_BRANCH)

