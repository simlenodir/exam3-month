import { ErrorHandler } from "../../exceptions/errorHandler.js"
import { allCompnies, createComp, deleteCompany, updateFoundCompany } from "./model.js"

export default {
    GET_COMPANIES: async(req, res, next) => {
        const companies = await allCompnies()
        
        if (companies) {
            res.status(200).json({
                status: 200,
                data: companies
            })
        }
    },
    CREATE_COMPANIES: async(req, res, next) => {
        const { name, url } = req.body

        const newCompany = await createComp(name, url)

        if (newCompany) {
            res.status(201).json({
                status:201 ,
                message:'company has been created successfuly'
            })
        }
    },
    UPDATE_COMPANY: async(req, res, next) => {
        const {compId} = req.params
        const { name, url } = req.body
        
        console.log(compId, url, name);

        const updatedUser = await updateFoundCompany(name, url, compId).catch(err => next( new ErrorHandler(err.message, 503)))
       
        if (updatedUser) {
            res.status(200).json('company has updated')
        }
    },
    DELETE_COMPANY: async(req, res, next) => {
        const { compId } = req.params
       
        const deletedCompany = await deleteCompany(compId).catch(err => next(new ErrorHandler(err.message, 503)))

        if (deletedCompany) {
            res.status(200).json('delted successfuly')
        }
    } 
}