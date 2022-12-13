import { ErrorHandler } from "../../exceptions/errorHandler.js"
import { allBanks, createNewBank, deleteBank, foundPutBank } from "./model.js"

export default {
    GET_ADMIN: async (req, res, next) => {
        const { id, role } = req

        if (role != 'admin') {
            res.json('You have not access token')
        }

        const banks = await allBanks()

        if (id && role == 'admin') {
            res.json({
                status: 200,
                data: banks
            })
        }
    },
    POST_BANK: async(req, res, next) =>{
        const { id, role } = req

        if (role != 'admin') {
            res.json('You have not access token')
        }

        const { name, max_sum, initial_percent, max_year} = req.body
        
        const newBanks = await createNewBank(name, max_sum, initial_percent, max_year)

        if (id && role == 'admin') {
            res.json({
                status: 200,
                data: newBanks
            })
        }
    },
    UPDATE_BANK: async(req, res, next) => {
        const { id, role } =req  
        const { bankId } = req.params
        const {name, max_sum, initial_percent, max_year} = req.body
        const UpdatedBank = await foundPutBank(name, max_sum, initial_percent, max_year, bankId).catch(err => next(new ErrorHandler(err.message, 503)))

        if (role != 'admin') {
            res.json('You have not access token')
        }
       if ( UpdatedBank) {
            res.status(200).json({
                status: 200,
                message: 'Updated succesfully'
            })
       }
       
    },
    DELETE_BANK: async(req, res, next) => {

        const { id, role } = req
        const { bankId } = req.params

        try {
            if (role != 'admin') {
                res.json('You have not access token')
            }else {
                res.json(await deleteBank(bankId))
            }

        } catch (error) {
            console.log(error)
            next(new ErrorHandler(error.message))
            res.sendStatus(500)
        }

        

        // const deletedBank = await deleteBank(bankId)
        // res.json(await deleteBank(bankId))

        // if (deletedBank) {
        //     res.status(200).json({
        //         deleteBank
        //     })
        // }
        // next(new ErrorHandler('Something is not true', 400))
    }
}