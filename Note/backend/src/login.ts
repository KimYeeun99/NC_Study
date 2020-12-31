import express, { Request, Response, NextFunction } from "express";
import mongoose from 'mongoose'
import {User} from "../models/User"
import argon2 from 'argon2'

const login = express()

login.get("/", (req: Request, res: Response, next: NextFunction) => {
  User.find(function(err, users){
    res.send(users)
  })
});


login.post("/", async (req: Request, res: Response) => {
  try {
    User.findOne({"id":req.body.id}, async(err,user)=>{
      if(err) return res.json({success: false, err})
      if(user==null){
        res.json({
          success: false
        })
      }
      if(await argon2.verify(user.password, req.body.password)==true) {
        console.log("Success Login")
        res.json({
          success: true
        })
      } else {
        // password did not match
        console.log("Fail Login")
      }
    })
  } catch (err) {
    // internal failure
    console.log("Fail Log")
  }
});

login.post('/register', async (req: Request, res: Response) => {
  try{
    const hash = await argon2.hash(req.body.password);
    const user = new User({
      id: req.body.id,
      password: hash
    });

    User.findOne({"id":req.body.id},(err,user)=>{
      if(err) return res.json({success: false, err})
      if(user!=null){
        return res.status(200).json({
          success: false
        })
      }
      user.save((error, userInfo) => {
        if(error) return res.json({success: false, error})
        return res.status(200).json({
          success: true
        })
      })
    })
  }catch(err){}
  
})

export {login}

//"start": "node dist/src/app.js",