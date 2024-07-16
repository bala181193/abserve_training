import express from "express";
import * as userCntrl from "../controller/userCntrl";
import * as userValid from '../validators/user.validation'
let router = express.Router();

router
  .route("/register")
  .post(userCntrl.fileUpload, userValid.register,userCntrl.register);

export default router;
