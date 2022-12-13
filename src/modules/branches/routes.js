import { Router } from "express";
import verifyToken from "../../middleWares/verifyToken.js";
import branch_comp from "./branch_comp.js";

const branchRouter = Router()

export default branchRouter
.get('/all-branches', verifyToken, branch_comp.GET_BRANCHES)
.post('/create-branch', verifyToken, branch_comp.CREATE_BRANCH)
.put('/update-branch/:branchId', verifyToken,branch_comp.UPDATE_BRANCH )
.delete('/delete-branch/:id', verifyToken, branch_comp.DELETE_BRANCH)

