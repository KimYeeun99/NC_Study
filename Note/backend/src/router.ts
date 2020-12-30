import express, { Request, Response, NextFunction } from "express";
import {User} from "../models/User"
const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  User.find(function(err, users){
    if(err) return res.status(500).send({error: 'database failure'});
    res.send(users);
  })
});

export {router}