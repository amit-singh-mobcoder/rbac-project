import express from 'express'
import errorHandler from './middlewares/error-handler.middleware'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())


app.use(errorHandler)
export { app }