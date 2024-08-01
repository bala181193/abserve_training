import express from "express";
import bodyParser from "body-parser";
import testRoute from "./router/testRute";
import userRoute from './router/userRoute'
import path from "path";
const session = require('express-session');
import { mongooseConnectDB } from "./config/dbConnnection";
import passport from './config/passport';

require("dotenv").config();
const app = express();
mongooseConnectDB();
app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set up session middleware
app.use(session({
  secret: 'secret', // Replace with a secure secret key
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

app.use("/test", testRoute);
app.use("/user", userRoute);


app.listen("5001", () => {
  console.log("app is running 5001");
});

//"nodemonConfig": {
    //     "ignore": [
    //       "./src/config/*",
    //       "./src/public/*"
    //     ]
    //   }