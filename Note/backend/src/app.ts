import express, { Request, Response, NextFunction } from "express";
import bodyParser from 'body-parser'
import {router} from "./router"
import mongoose from "mongoose"
import {login} from "./login"

const app = express();
const db = mongoose.connection;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/notepad');

db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

app.use("/login", login);

app.listen(3000, () => {
  console.log("start");
});