import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { router } from './router';
import { login } from './login';
import { post } from './post';
import path from 'path';
import createError from 'http-errors';
import session from 'express-session';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

declare module 'express-session' {
  interface SessionData {
    userId: String;
    password: String;
    isLogedIn: boolean;
  }
}

app.use(
  session({
    secret: 'asadlfkj!@#!@#dfgasdg',
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/api/login', login);
app.use('/api/post', post);

app.listen(3000, () => {
  console.log('start');
});

module.exports = app;
