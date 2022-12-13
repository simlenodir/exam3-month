import { ErrorHandler } from "../../exceptions/errorHandler.js"
import { allHomes, createHome, deleteFoundHome, foundSelectHome, homeComplex, updateSelectedHome } from "./model.js"

export default {
    GET_HOME: async(req, res, next) => {
        const result = await allHomes().catch(err => next(new ErrorHandler(err.message, err.status)))
        if (result) {
            res.status(200).json({
                data: result,
                status: 200
            })
        }
    },
    CREATE_NEW_HOME: async(req, res, next) => {

        const { complex_id, room, square, sum_square } = req.body
        const homeDetail = await createHome(complex_id, room, square, sum_square).catch( err => next (new ErrorHandler(err.message, 500)))

        if (homeDetail) {
            res.status(201).json({
                status: 201,
                message: "new home created"
            })
        }
    },
    UPDATE_HOME_DETAILS: async(req, res, next) => {
        const { homeId } = req.params
        const { complex_id, room, square, sum_square } = req.body
       
        const foundHome = await foundSelectHome(homeId).catch(err => next(new ErrorHandler(err.message, 500)))
        const data = foundHome[0]
        const updateHomeDetails = await updateSelectedHome(complex_id?complex_id: data.complex_id, room?room:data.room, square?square:data.square, sum_square?sum_square:data.sum_square, homeId).catch(err => next(new ErrorHandler(err.message, 500)))

        if (updateHomeDetails) {
            res.status(200).json({
                status: 200,
                message: "updated succesfully"
            })
        }
    },
    DELETE_HOME_DETAIL: async(req, res, next) => {
        const {homeId} = req.params
        console.log(homeId);
        const deletedHome = await deleteFoundHome(homeId).catch(err => next(new ErrorHandler(err.message, 500)))

        if (deletedHome) {
            res.status(200).json({
                status: 200,
                message: 'deleted succesfully'
            })
        }
    },
    GET_HOME_COMPLEX: async(req, res, next) => {

        const data = await homeComplex().catch(err => next(new ErrorHandler(err.message,500)))


        res.status(200).json(data)
    }
}    