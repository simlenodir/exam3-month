import { sign } from "../../utils/jwt.js"
import { ErrorHandler } from "../../exceptions/errorHandler.js"
import { existFoundUser, loginUser, writeUser } from "./authModel.js"

export default{
    Register: async(req, res, next) => {
        const {name, password, email} = req.filtered

        const existUser = await existFoundUser(name).catch(error => next(new ErrorHandler(error.message, 500) ))

        if (existUser && existUser.length) {
            return next( new ErrorHandler('Xato' ,400))
        }
        const newUser = await writeUser(name, password, email)

        res.json("ok")
    },
    Login_Post: async(req, res, next) =>{
        const { name, password } = req.body
        
        const loginFoundUser = await loginUser(name, password)
        const user = loginFoundUser[0]
        const id = user.id
        const role = user.role
        
        res.status(200).json({
            message: 'You are logged succesfully',
            access_token: sign({id, role}),
            status: 200
        })
    }
}