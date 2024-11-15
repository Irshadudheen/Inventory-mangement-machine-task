import express, { json } from 'express'
import 'express-async-errors'

import {
    singinRouter,
    singupRouter,
    singoutRouter,
    currentUserRouter,
    createItemRouter,
    allItemRouter,
    editItemRouter,
    getEachItemRouter,
    createCustomerRouter,
    AllCustomerRouter,
    placeorderRouter
} from './routes/index'
import { errorhandler } from './middlewares/error-handler'
import cookieSession from 'cookie-session'
import cors from 'cors'
import { NotFoundError } from './errors/not-found-error'
const app = express()


app.use(json())

app.use(cookieSession({
    signed: false
    , secure: false
}))
app.use(cors({ origin: 'http://localhost:5173', 
    credentials: true}))
app.use(currentUserRouter)
app.use(singinRouter)
app.use(singoutRouter)
app.use(singupRouter)
app.use(createItemRouter)
app.use(allItemRouter)
app.use(editItemRouter)
app.use(getEachItemRouter)
app.use(createCustomerRouter)
app.use(AllCustomerRouter)
app.use(placeorderRouter)
app.all('*', async () => {
    throw new NotFoundError();
})
app.use(errorhandler as express.ErrorRequestHandler)
export { app }