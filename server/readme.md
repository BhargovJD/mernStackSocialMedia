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
const {MONGO_URI} = require('./keys')

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
const {MONGO_URI} = require('./keys')

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
const {MONGO_URI} = require('./keys')

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
const {MONGO_URI} = require('./keys')

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

<!-- # 7 Hashing Password -->

npm install bcryptjs

routes/auth.js:

const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const User = mongoose.model("User")

const bcrypt = require('bcryptjs')

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
            bcrypt.hash(password,12)
            .then(hashedPassword=>{

                const user = new User({
                    email,
                    name,
                    password:hashedPassword
                })

                user.save()
                .then(user=>{
                    res.json({message:"Saved successfully"})
                })
                .catch(err=>{
                    console.log(err)
                })

            })


        }
    })

})

module.exports = router
........................................................................................

<!-- # 8 Sign in -->

routes/auth.js

router.post('/signin',(req,res)=>{
const{email,password} = req.body
if(!email || !password){
return res.status(422).json({error:"Please add email and password"})
}

    else{
        User.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser){
        return res.status(422).json({error:"Invalid email or password"})
            }
            else{
                bcrypt.compare(password, savedUser.password)
                .then(doMatch=>{
                    if(doMatch){
                        res.json({message:"Successfully signed in"})
                    }
                    else{
                        return res.status(422).json({error:"Invalid email or password"})
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        })
    }

})

<!-- # 9 JWT(Json Web Token) -->

npm install jsonwebtoken

keys.js:

module.exports={
MONGO_URI:'mongodb+srv://admin:qwertymong0@cluster0.zd5tf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
JWT : "randomstring"
}
.................................
routes/auth.js

const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const User = mongoose.model("User")

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT} = require('../keys')

router.get('/',(req,res)=>{
res.send("hello")
})

// Login

router.post('/signin',(req,res)=>{
const{email,password} = req.body
if(!email || !password){
return res.status(422).json({error:"Please add email and password"})
}

    else{
        User.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser){
        return res.status(422).json({error:"Invalid email or password"})
            }
            else{
                bcrypt.compare(password, savedUser.password)
                .then(doMatch=>{
                    if(doMatch){
                        // res.json({message:"Successfully signed in"})
                        const token=jwt.sign({_id:savedUser._id},JWT)
                        res.json({token})
                    }
                    else{
                        return res.status(422).json({error:"Invalid email or password"})
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        })
    }

})

module.exports = router
............................................

<!-- # 10 Middleware -->

middleware/requireLogin.js

const jwt = require('jsonwebtoken')
const {JWT} = require('../keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (req,res,next)=>{
const {authorization} = req.headers
//authorization === Bearer ewefwegwrherhe
if(!authorization){
return res.status(401).json({error:"you must be logged in"})
}
const token = authorization.replace("Bearer ","")
jwt.verify(token,JWT,(err,payload)=>{
if(err){
return res.status(401).json({error:"you must be logged in"})
}

        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })


    })

}
......................................................
routes/auth.js

const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const User = mongoose.model("User")

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT} = require('../keys')

const requireLogin = require('../middleware/requireLogin')

router.get('/',(req,res)=>{
res.send("hello")
})

// Sign up
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
            bcrypt.hash(password,12)
            .then(hashedPassword=>{

                const user = new User({
                    email,
                    name,
                    password:hashedPassword
                })

                user.save()
                .then(user=>{
                    res.json({message:"Saved successfully"})
                })
                .catch(err=>{
                    console.log(err)
                })

            })


        }
    })

})

// Login

router.post('/signin',(req,res)=>{
const{email,password} = req.body
if(!email || !password){
return res.status(422).json({error:"Please add email and password"})
}

    else{
        User.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser){
        return res.status(422).json({error:"Invalid email or password"})
            }
            else{
                bcrypt.compare(password, savedUser.password)
                .then(doMatch=>{
                    if(doMatch){
                        // res.json({message:"Successfully signed in"})
                        const token=jwt.sign({_id:savedUser._id},JWT)
                        res.json({token})
                    }
                    else{
                        return res.status(422).json({error:"Invalid email or password"})
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        })
    }

})

router.get('/protected', requireLogin,(req,res)=>{
res.send('This is protected page')
})

module.exports = router
....................................................
<!-- # 11 Post Schema and route -->
models/Post.js:

const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    body:{
        type:String,
        required:true
    },

    photo:{
        type:String,
        default:"no photo"
    },

    postedBy:{
        type:ObjectId,
        ref:"User"
    },
})

mongoose.model("Post", postSchema)
...............................................
routes/post.js:

const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

const requireLogin = require('../middleware/requireLogin')

const Post = mongoose.model("Post")


router.post('/createpost', requireLogin,(req,res)=>{
    const{title,body} = req.body
    if(!title || !body ){
       return res.status(422).json({error:"Please add all the fields"})
    }


    else{

    // console.log(req.user)
    // res.send("ok")
    req.user.password = undefined
    const post = new Post({
        title:title,
        body:body,
        postedBy:req.user
    })

    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })

    }


})

module.exports = router
.................................................................
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


require('./models/User')
require('./models/Post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))


app.listen(port,()=>{
    console.log(`Server is running on : ${port}`)
})

...........................................................................
<!-- # 12 view all posts -->
routes/post.js:

// view all posts
router.get('/allpost',(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .then(results=>{
        res.json({allposts:results})
    })
    .catch(err=>{
        console.log(err)
    })
})
....................................................................................
<!-- # 13 Posts by login user -->
routes/post.js:

// view posts by login users

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(results=>{
        res.json({myposts:results})
    })
    .catch(err=>{
        console.log(err)
    })
})
........................................................................
<!-- # 14 Client side -->

create-react-app client

<!-- # 28 -->
adding likedBy column in Post.js model
Like Unlike route in post.js

