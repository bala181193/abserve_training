
import fs from 'fs'
import multer from 'multer';
import path from 'path';
const { Transform } = require('stream');


export const sample =()=>{
    // Create a transform stream to convert text to uppercase
const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});
    const readStream = fs.createReadStream('example.txt');

    // Create a writable stream to the output file
    const writeStream = fs.createWriteStream('output.txt');
    readStream.pipe(writeStream);
    writeStream.on('finish', () => {
        console.log('Data has been copied to output.txt');
    });
}

// sample();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload'); // Set the destination folder
    },
    filename: function (req, file, cb) {
        console.log(req.query);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Set the file name
    }
  });
  const upload = multer({ storage: storage }).single('image');

 export const multerFileupload =async(req,res,next)=>{
  try{
    upload(req,res,(err)=>{
        console.log(req.file)

        console.log(err);
    })
    }catch(err){
      console.log(err);
    }
  }