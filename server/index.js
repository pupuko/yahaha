const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const socket = require('socket.io')
const path = require('path')
const { websocket } = require("./controllers/wsController")

const app = express()
require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/message', require('./routes/messageRoute'))

app.use('/yahaha', express.static(path.join(__dirname, 'yahaha')))


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(`Mongo connection success at ${process.env.MONGO_URL}`)
}).catch(err => {
  console.log(err.message)
})


app.get('/hello', (req, res) => {
  res.send('hello')
})

app.post('/hello', (req, res) => {
  res.send({
    params: req.query,
    body: req.body
  })
})


const server = app.listen(process.env.SERVER_PORT, () => {
  console.log(`Node server runs at ${process.env.SERVER_PORT}`)
})

const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true
  }
})

global.onlineUsers = new Map()

io.on("connection", websocket)

