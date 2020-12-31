import express, { Request, Response, NextFunction } from "express";
import mongoose from 'mongoose'
import {Post} from "../models/Post"

const post = express()

post.get("/", (req: Request, res: Response, next: NextFunction) => {
  Post.find(function(err, posts){
    res.json(posts)
  })
});

post.post('/create', (req: Request, res: Response) => {
  try{
    const post = new Post({
      user:{
        "id": req.body.user.id,
        "password": req.body.user.password,
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

post.get('/read/books', (req: Request, res: Response) => {
  Post.findOne({id: req.body.id},function(err, posts){
      if(err) return res.status(500).send({error: 'database failure'});
      res.json(posts);
  })
});

export {post}