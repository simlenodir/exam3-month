import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { ErrorHandler } from "../exceptions/errorHandler.js"
dotenv.config()
const {verify, JsonWebTokenError} = jwt

export default (req, res, next) => {
    const { access_token } = req.headers

    if (!access_token) {
        return next(new ErrorHandler('Provide access token', 401))
    }

    verify(access_token, process.env.SECRET_KEY, (err, decode) => {
        if (err instanceof JsonWebTokenError) {
            return next( new ErrorHandler('Invalid token'))
        }
        const {id} = decode
        const {role} =decode
        
        req.role = role
        req.id = id
    })
    next() 
}
