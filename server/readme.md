<!-- # 1 Run Server -->

npm init -y
npm install express
...............................
app.js:
const express = require('express')
const app = express()
const port = 5000

app.get('/',(req,res)=>{
res.send("Hello World")
})

app.listen(port,()=>{
console.log(`Server is running on : ${port}`)
})

console:
node app

Open browser:
http://localhost:5000/

npm install nodemon
"start": "nodemon app"
npm start
...............................

<!-- # 2 Middleware -->
<!-- Running on all route -->
app.js:
const express = require('express')
const app = express()
const port = 5000

const customerMiddleware = (req,res,next)=>{
    console.log("Middleware executed")
    next()
}

app.use(customerMiddleware)

app.get('/',(req,res)=>{
    console.log('Home page')
    res.send("Hello World")
})

app.get('/about',(req,res)=>{
    console.log('About page')
    res.send("About World")
})


app.listen(port,()=>{
    console.log(`Server is running on : ${port}`)
})
.....................................
<!-- Running on specific route -->
const express = require('express')
const app = express()
const port = 5000

const customMiddleware = (req,res,next)=>{
    console.log("Middleware executed")
    next()
}


app.get('/',(req,res)=>{
    console.log('Home page')
    res.send("Hello World")
})

app.get('/about',customMiddleware,(req,res)=>{
    console.log('About page')
    res.send("About World")
})


app.listen(port,()=>{
    console.log(`Server is running on : ${port}`)
})
.........................................
<!-- # 3 MongoB Atlas -->
new projects: my_gram
....................................
keys.js: atlas url
.....................................
app.js:
const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const {MONGO_URI} =  require('./keys')

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
..........................................
<!-- # 4 User Schema(Blueprint) -->
<!-- models/User.js -->
models/User.js:
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

})

mongoose.model("User",userSchema)
...........................................
app.js:
require('./models/User')
...............................
<!-- # 5 Getting data -->
<!-- routes/auth.js -->
routes/auth.js:
const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send("hello")
})

module.exports = router
................................................
app.js:
const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const {MONGO_URI} =  require('./keys')

require('./models/User')

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
...............................................................
<!-- Getting input -->
routes/auth.js:

const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send("hello")
})

router.post('/signup',(req,res)=>{
    const{name,email,password} = req.body
    if(!email || !password || !name){
       return res.status(422).json({error:"Please add all the fields"})
    }
    else{
        res.json({message:"Successfully posted"})
    }
})

module.exports = router
........................................................................................
app.js

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
......................................................................
<!-- # 6 Sending data to Atlas - Sign in -->
routes/auth.js:

const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const User = mongoose.model("User")



router.get('/',(req,res)=>{
    res.send("hello")
})

router.post('/signup',(req,res)=>{
    const{name,email,password} = req.body
    if(!email || !password || !name){
       return res.status(422).json({error:"Please add all the fields"})
    }


    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"Email address already exist"})
        }

        else {
            const user = new User({
                email,
                name,
                password
            })

            user.save()
            .then(user=>{
                res.json({message:"Saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })



})

module.exports = router
....................................................................................
app.js

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
..................................................................


