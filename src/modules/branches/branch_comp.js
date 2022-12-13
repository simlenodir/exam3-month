import { ErrorHandler } from "../../exceptions/errorHandler.js"
import { allBranches, createBranch, deleteBranch, selectedBranch, updateBranch } from "./model.js"

export default {
    GET_BRANCHES: async(req, res, next) => {
        const branches = await allBranches().catch(err => next( new ErrorHandler(err.message, 503)))

        if (branches) {
            res.status(200).json({
                data: branches,
                status: 200
            })
        }
    },
    CREATE_BRANCH: async(req, res, next) => {
        console.log(req.body);
     
        // const { companId } = req.params
        const {comp_id ,name, country, city} = req.body

        // const comp_id = companId.toString()

        const newBranch = await createBranch(comp_id, name, country, city).catch(err => next(new ErrorHandler(err.message, 503)))
        if (newBranch) {
            res.status(201).json('New branch created successfuly')
        }
    },
    UPDATE_BRANCH: async(req, res, next) => {
        const {branchId} = req.params
        const { name, country, city} = req.body
        const foundBranch = await selectedBranch(branchId)
        const data = foundBranch[0]
        const updatedFromBranch = await updateBranch(data.comp_id, name?name: data.name, country? country: data.country, city? city: data.city, branchId? branchId:data.branchId).catch( err => next(new ErrorHandler(err.message,500)))
        console.log(data.comp_id,data.id);
 
        if (updatedFromBranch) {
            res.status(200).json('Branch updated successfully')
        }
    },
    DELETE_BRANCH: async(req, res, next) => {
        const {id} = req.params
        const deletedFromBranches = await deleteBranch(id).catch(err => next(new ErrorHandler(err.message, 503)))

        if (deletedFromBranches) {
            res.status(200).json('Branch deleted successfully')
        }
    }
}