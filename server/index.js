import express from "express";
import bodyParser from "body-parser";
import testRoute from "./router/testRute";
import userRoute from './router/userRoute'
import path from "path";
import { mongooseConnectDB } from "./config/dbConnnection";
require("dotenv").config();
const app = express();
mongooseConnectDB();
app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/test", testRoute);
app.use("/user", userRoute);


app.listen("2001", () => {
  console.log("app is running 2001");
});
