import multer from "multer";
import csvtojson from "csvtojson";
import path from "path";
import { CsvModel } from "../models";
var SibApiV3Sdk = require("sib-api-v3-sdk");

var SibApiV3Sdk = require("sib-api-v3-sdk");

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/csvUpload/"); // Uploads folder
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
}).single("csvFile");
export const csvtojsonFileUpload = (req, res, next) => {
  try {
    upload(req, res, (err) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        if (req.file == undefined) {
          res.status(400).json({ error: "No file selected!" });
        } else {
          next();
        }
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const saveCsvUpload = async (req, res) => {
  try {
    let jsonArray = await csvtojson().fromFile(req.file.path);
    console.log(jsonArray);
    if (jsonArray && jsonArray.length > 0) {
      jsonArray = jsonArray.map((data, i) => {
        return {
          make: data.make,
          model: data.model ? data.model.toString().split(",") : [],
        };
      });
    } else {
      res.status(400).json({ message: "CSV File have no records" });
    }
    const insertData = new CsvModel({
      datas: jsonArray,
    });
    await insertData.save();
    res.status(200).json({ message: "CSV File save successfully" });
  } catch (err) {
    console.log(err);
  }
};

// checkfuntion();

const sendEmail = async () => {
  try {
    var defaultClient = SibApiV3Sdk.ApiClient.instance;
    var apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey =
      "";
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sender = {
      email: "derrouiche.lies@gmail.com",
      name: "derrouiche",
    };
    const receivers = [
      {
        email: "ayyankalaiabs31@gmail.com",
      },
    ];
    const sendEmail = await apiInstance.sendTransacEmail({
      sender,
      to: receivers,
      subject: "test rmail",
      textContetnt: "test emal",
      htmlContent: "<h1>hello balamurugan</h1>",
    });
    console.log("sendEmail", sendEmail);
  } catch (err) {
    console.log(err);
  }
};

// sendEmail();
