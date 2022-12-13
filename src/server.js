import express from "express"
import routes from "./modules/routes.js"
import dotenv from "dotenv"
import cors from "cors"
import errorHandler from "./middleWares/errorHandler.js"
dotenv.config()

const PORT = process.env.PORT || 9090

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errorHandler)

app.all('/*', (_, res) => res.sendStatus(404))
app.listen(PORT, () => {
    console.log( PORT )});

