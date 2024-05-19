import express from 'express'
import { conectDB } from '../database'
import { router } from './routers'
import { setCors } from './middlewares'

const app = express()
const port = process.env.PORT || 3000

app.use(setCors)
app.use(express.json())
app.use(router)

conectDB()
app.listen(port, () =>  console.log(`Servidor rodando em http://localhost:${port}`))

