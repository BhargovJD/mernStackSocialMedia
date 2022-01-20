const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const {MONGO_URI} =  require('./keys')
const cors = require('cors')

app.use(cors())




mongoose.connect(MONGO_URI)

mongoose.connection.on("connected",()=>{
    console.log("Connected to mongo db")
})

mongoose.connection.on("error",(err)=>{
    console.log("Not connected to mongo db",err)
})


require('./models/User')
require('./models/Post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))


app.listen(port,()=>{
    console.log(`Server is running on : ${port}`)
})


