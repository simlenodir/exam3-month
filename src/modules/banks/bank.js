import { ErrorHandler } from "../../exceptions/errorHandler.js"
import { allBanks, createNewBank, deleteBank, foundPutBank } from "./model.js"

export default {
    GET_ADMIN: async (req, res, next) => {
        const { id, role } = req
        const { limit, page } = req.query 
       
        if (role != 'admin') {
          return  res.json('You have not access token')
        }
        const banks = await allBanks().catch(err => next(new ErrorHandler(err.message, 500)))
        const sortBanks = banks.slice((page -1)*limit, limit*page)
          if (banks) {
            return  res.json({
                status: 200,
                data: sortBanks
                
            })
          }
          return res.json({
            message: "Banks is not found",
            status: 400
          })
    },
    GET_PAGES: async(req, res) => {

        const { limit } = req.query 
       
        const banks = await allBanks().catch(err => next(new ErrorHandler(err.message, 500)))

        const counts = Math.ceil(banks.length/limit)

        let pagenatButtons = []
        for (let i = 1; i <= counts; i++) {
           pagenatButtons.push(i)
        }    
        if (counts) {
            return  res.json({
                status: 200,
                data: pagenatButtons
            }) 
        }

    },
    POST_BANK: async(req, res, next) =>{

        const { name, max_sum, initial_percent, max_year} = req.body
        
        const newBanks = await createNewBank(name, max_sum, initial_percent, max_year)

        if (newBanks) {
           return res.json({
                status: 200,
                data: newBanks
            })
        }
    },
    UPDATE_BANK: async(req, res, next) => {

        const { bankId } = req.params
        const {name, max_sum, initial_percent, max_year} = req.body
        const UpdatedBank = await foundPutBank(name, max_sum, initial_percent, max_year, bankId).catch(err => next(new ErrorHandler(err.message, 503)))

       if ( UpdatedBank) {
           return res.status(200).json({
                status: 200,
                message: 'Updated succesfully'
            })
       }
       
    },
    DELETE_BANK: async(req, res, next) => {

        const { bankId } = req.params
        const deletedBank = await deleteBank(bankId).catch(err => next(new ErrorHandler(err.message ,500)))
        
        if (deletedBank) {
            return res.json({
                status: 200,
                message: "Bank deleted successfully"
            })
        }


    }
}