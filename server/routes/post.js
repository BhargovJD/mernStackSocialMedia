const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

const requireLogin = require('../middleware/requireLogin')

const Post = mongoose.model("Post")


// create post
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

module.exports = router