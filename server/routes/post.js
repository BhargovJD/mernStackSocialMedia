const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

const requireLogin = require('../middleware/requireLogin')

const Post = mongoose.model("Post")


// create post
router.post('/createpost', requireLogin,(req,res)=>{
    const{title,body,url} = req.body
    if(!title || !body || !url ){
       return res.status(422).json({error:"Please add all the fields"})
    }


    else{

    // console.log(req.user)
    // res.send("ok")
    req.user.password = undefined
    const post = new Post({
        title:title,
        body:body,
        photo:url,
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
router.get('/allpost',requireLogin,(req,res)=>{
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

// Like post
router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likedBy:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

// Unlike post

router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likedBy:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

// comments
router.put('/comment',requireLogin,(req,res)=>{

    const comment = {
        text:req.body.text,
        by:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{commentedBy:comment}
    },{
        new:true
    })
    .populate("commentedBy.by","_id name")
    // .populate("by","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

// delete
router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})

module.exports = router