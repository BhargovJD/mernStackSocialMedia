const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const {MONGO_URI} =  require('./keys')

require('./models/User')

app.use(express.json())
app.use(require('./routes/auth'))


mongoose.connect(MONGO_URI)

mongoose.connection.on("connected",()=>{
    console.log("Connected to mongo db")
})

mongoose.connection.on("error",(err)=>{
    console.log("Not connected to mongo db",err)
})


app.listen(port,()=>{
    console.log(`Server is running on : ${port}`)
})


