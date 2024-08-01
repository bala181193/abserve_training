import fs from "fs";
import Ajv from "ajv"
import path from "path";
import multer from 'multer';
import passport from "passport";
import * as formidable from "formidable";
import { User } from "../models";
import {generatePassword} from '../config/lib'
import {Users} from '../controller/filterCntrl'
const jwt = require('jsonwebtoken');

// const uploadDir = path.join(__dirname, 'public/image');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }
export const fileUpload = async (req, res, next) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      try {
        console.log(files)
        validateFiles(files);
        let oldPath =
          files && files.profilePic[0] && files.profilePic[0].filepath;
          console.log(oldPath)

        let fileName =
          "/images/" + Date.now() + "-" + files.profilePic[0].originalFilename;
        let newPath = path.join(__dirname, "../public") + fileName;
        let rawData = fs.readFileSync(oldPath);
        
        fs.writeFile(newPath, rawData, function (err) {
          if (err) console.log(err);
          req.fileName = fileName;
          req.email =fields.email[0];
          req.password =fields.password[0];
          req.name =fields.name[0];
          req.confirmPassword =fields.confirmPassword[0];

          next();
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err.message });
      }
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const validateFiles = (files) => {
  const array_of_allowed_files = ["png", "jpeg", "jpg", "gif"];
  const fileName = files.profilePic[0].originalFilename;
  const lastDotIndex = fileName.lastIndexOf(".");
  // const name = fileName.slice(0, lastDotIndex); // Extracts 'example-image'
  const extension = fileName.slice(lastDotIndex + 1); // Extracts 'jpg'
  if (!array_of_allowed_files.includes(extension)) {
    throw new Error("Invalid Image Type");
  } else if (files.profilePic[0].size > 1000000) {
    throw new Error("Invalid Image Size");
  } else {
    return true;
  }
};

export const register = async (req, res) => {
  try {
    const user = new User({
      profileImage: req.fileName,
      name:req.name,
      email:req.email,
      password:generatePassword (req.password)
      
    });
    await user.save();
    return res.status(500).send("Successfully uploaded");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "error on server" });
  }
};
export const localPassportAuthLogin=passport.authenticate('local', {
  successRedirect: '/authorise',
  failureRedirect: '/localPassportAuthLogin'
})
export const authorise=(req,res,next)=>{
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/localPassportAuthLogin');
}
export const unAuthorise=(req,res)=>{
  console.log(req);
  res.status(401).json({messsage:"unAuthorised user"})
}

export const getUserDetails=async(req,res)=>{
  try{
    const userData=await User.find({})
    res.status(200).json({userData})
  }catch(err){
    res.status(200).json({err:err})
  }
}







