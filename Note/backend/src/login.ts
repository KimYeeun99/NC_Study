import express, { Request, Response, NextFunction } from "express";
import mongoose from 'mongoose'
import {User} from "../models/User"
import argon2 from 'argon2'
import session from "express-session";

const login = express()

login.get("/", (req: Request, res: Response) => {
  if(req.session.isLogined===undefined){
    req.session.isLogined=false
  }
  const userId = req.session.userId
  const isLogined = req.session.isLogined
  res.json({
    userId,
    isLogined
  })
});


login.post("/", async (req: Request, res: Response) => {
  try {
    User.findOne({"id":req.body.id}, async(err,user)=>{
      if(err) return res.json({success: false, err})
      console.log(user)
      if(user===null){
        res.json({
          success: false
        })
      }else{
        if(await argon2.verify(user.password, req.body.password)===true) {
          req.session.userId=req.body.id
          req.session.password=req.body.password
          req.session.isLogined=true
          console.log("Success Login")
          res.json({
            success: true
          })
        } else {
          // password did not match
          console.log("Fail Login")
          res.json({
            success: false
          })
        }
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

    User.findOne({"id":req.body.id},(err,findUser)=>{
      if(err) return res.json({success: false, err})
      if(findUser==null){
        user.save((error, userInfo) => {
          if(error) return res.json({success: false, error})
          return res.status(200).json({
            success: true
          })
        })
      }else{
        return res.status(400).json({
          success: false
        })
      }
    })

    

    
  }catch(err){}
  
})

export {login}

//"start": "node dist/src/app.js",