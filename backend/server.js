import express from 'express'
import path from 'path'
import ConnectDb from './config/db.js'
import ApiRoute from './routes/ApiRoute.js'
import dotenv from 'dotenv'

ConnectDb()
dotenv.config()
const app = express()

app.use(express.json())

app.use('/api/user', ApiRoute)
const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }

app.get('/', (req, res) => {
    res.send('API IS RUNNING...')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))