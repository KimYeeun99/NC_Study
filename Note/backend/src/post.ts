import express, { Request, Response, NextFunction } from "express";
import mongoose, { NativeError } from 'mongoose'
import {Post} from "../models/Post"

const post = express()

post.get("/", (req: Request, res: Response, next: NextFunction) => {
  Post.find(function(err, posts){
    if(err) return res.status(500).send({error: 'database failure'});
    if(req.session.isLogined===true){
      res.json({
        posts,
        isLogined: true
      })
    }else{
      res.json({
        posts,
        isLogined: false
      })
    }
  })
});

post.post('/create', (req: Request, res: Response) => {
  try{
    const post = new Post({
      user:{
        "id": req.session.userId,
        "password": req.session.password
      },
      title: req.body.title,
      body: req.body.body
    });

    post.save((error, post) => {
      if(error) return res.json({success: false, error})
      return res.status(200).json({
          success: true
      })
  })
  }catch(err){}
  
})

post.get('/read/:_id', (req: Request, res: Response) => {
  Post.findOne({"_id": req.params._id},function(err, posts){
      if(err) return res.status(500).send({error: 'database failure'});
      if(posts.user.id===req.session.userId){
        res.json({
          posts,
          isUser: true
        })
      }else{
        res.json({
          posts,
          isUser: false
        })
      }
  })
});

post.put('/read/:_id', function(req, res){
  Post.findById(req.params._id, function(err, post){
      if(err) return res.status(500).json({ error: 'database failure' });
      if(!post) return res.status(404).json({ error: 'post not found' });

      if(req.body.title) post.title = req.body.title;
      if(req.body.body) post.body = req.body.body;

      post.save(function(err){
          if(err) res.status(500).json({error: 'failed to update'});
          res.json({success: true});
      });

  });
});

post.delete('/read/:_id', function(req, res){
  Post.remove({"_id": req.params._id}, function(err){
    if(err) return res.status(500).json({ error: "database failure" });
    res.json({
      success: true
    })
  })
});
export {post}