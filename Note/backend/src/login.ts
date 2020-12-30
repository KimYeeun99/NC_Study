import express, { Request, Response, NextFunction } from "express";
import mongoose from 'mongoose'
import {User} from "../models/User"
import argon2 from 'argon2'

const login = express()

login.get("/", (req: Request, res: Response, next: NextFunction) => {
  User.find(function(err, users){
    res.json(users)
  })
});

login.post('/', (req: Request, res: Response) => {
  let hash
  try{
    const hash = argon2.hash(req.body.password);
  }catch(err){}
  
  console.log(hash)
  const user = new User({
    id: req.body.id,
    password: hash
  });

  user.save((error, userInfo) => {
      if(error) return res.json({success: false, error})
      return res.status(200).json({
          success: true
      })
  })
})

export {login}