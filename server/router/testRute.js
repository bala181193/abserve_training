import express from "express";
import * as emailCntrl from "../controller/emailContoller";
import * as csvCntrl from "../controller/csvController";
import * as filterLocationCntrl from "../controller/filterCntrl";
let router = express.Router();

router.route("/emailsend").post(emailCntrl.emailSend);
router.route("/testAny").post(testCntl.sample);


router
  .route("/csvImport")
  .post(csvCntrl.csvtojsonFileUpload, csvCntrl.saveCsvUpload);
router.route("/filterLocation").post(filterLocationCntrl.filterLocation);

export default router;
