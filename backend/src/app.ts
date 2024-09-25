import express from 'express'
import errorHandler from './middlewares/error-handler.middleware'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.use(errorHandler)
export { app }