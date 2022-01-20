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
                        const {_id,name,email} = savedUser
                        res.json({token,user:{_id,name,email}})
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