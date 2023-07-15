import { ErrorHandler } from "../../exceptions/errorHandler.js"
import { branchesForSelect, complexOfSelect, FoundCompany, goodBank, selectedComplex, selectedRoom } from "./model.js"

export default {
    FOUND_COMPANY: async(req, res, next) => {
        const {compId} = req.params
        const foundComp = await FoundCompany(compId).catch(err => next(new ErrorHandler(err.message, 500)))
        const foundComplex = await selectedComplex(compId)
        res.status(200).json({
            data: foundComp,
            status: 200,
            complex: foundComplex
        })
    },
    FOUND_COMPLEX: async(req, res, next) => {
        const {branchId} = req.params
        
        const complexFoundSelect = await complexOfSelect(branchId)

        res.status(200).json({
            data: complexFoundSelect,
            status: 200
        })
    },
    SELECT_ALL_BRANCH: async(req, res, next) => {
        const selectedAllBranches = await branchesForSelect().catch(err => next( new ErrorHandler(err.message, 500)))

        if (selectedAllBranches) {
            res.status(200).json({
                data: selectedAllBranches,
                status: 200
            })
        }
    },
    FOUND_ROOM: async(req, res, next) => {
        const { roomId } = req.params

        const [data] = await selectedRoom(roomId).catch(err => next (new ErrorHandler(err.message, 500)))

          return  res.json(data)
    },
    USERS_CALCULATE: async(req, res, next) => {
        const {year, square, sum} =req.query
        const homePrice = square * sum 
       
        const choiceBank = await goodBank(homePrice, year).catch(err => next (new ErrorHandler(err.message, 500)))
        const firstPayment = choiceBank.find(e => e)
        
        if (!firstPayment) {
            next(new ErrorHandler('Sorry bank not found', 400))
        }
        
        const initialSum = (homePrice *  firstPayment?.initial_percent)/100
        const periodOfTimeMonth = ((homePrice-initialSum) / (year * 12 )).toFixed(2)
        console.log(initialSum, periodOfTimeMonth, homePrice);

       return  res.json({
            data: choiceBank,
            price: homePrice,
            month: periodOfTimeMonth,
            enroll: initialSum,
            status: 200
        })
    }
}