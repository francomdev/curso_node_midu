import express from 'express'
import cors from 'cors'
import { moviesRouter } from './routes/movies.js'
const app = express()
const port = process.env.PORT ?? 3000
app.disable('x-powered-by')
app.use(express.json())
app.use(cors())

app.use('/movies', moviesRouter)

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
