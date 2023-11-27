const dittoJson = require('./pokemon/ditto.json')
const express = require('express')
const app = express()
app.disable('x-powered-by')
const PORT = process.env.PORT ?? 1234

app.use((req, res, next) => {
  //    Todo esto es lo mismo que app.use(express.json())
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  let body = ''
  req.on('data', (chunk) => {
    body += chunk.toString()
  })
  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    req.body = data
    next()
  })
})

app.get('/', (req, res) => {
  res.status(200).send('<h1>Mi pagina</h1>')
})

app.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJson)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})
// Ultima a la que va a llegar. Va en orden. Si no encuentra ninguna sale esta.
app.use((req, res) => {
  res.status(404).send('<h1>404 Not found</h1>')
})

app.listen(PORT, () => {
  console.log(`Express Server running on port http://localhost:${PORT}`)
})
