import express from "express";
import * as emailCntrl from "../controller/emailContoller";
import * as csvCntrl from "../controller/csvController";
import * as filterLocationCntrl from "../controller/filterCntrl";
import * as testCntl from '../controller/testCntrl/testanything'
import * as fileCntrl from '../controller/testCntrl/fileCnrl'

let router = express.Router();

router.route("/emailsend").post(emailCntrl.emailSend);
router.route("/testAny").post(testCntl.sample);
router.route("/fileCntrl").post(fileCntrl.sample);



router
  .route("/csvImport")
  .post(csvCntrl.csvtojsonFileUpload, csvCntrl.saveCsvUpload);
router.route("/filterLocation").post(filterLocationCntrl.filterLocation);

router
  .route("/fileUpload")
  .post(fileCntrl.multerFileupload);
export default router;
