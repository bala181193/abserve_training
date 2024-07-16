const bcrypt = require('bcrypt');
const saltRounds = 10;

export let emailConfig = {
  host: '', // Your SMTP host address
      port: 465, // Your SMTP port
      secure: true, // Set to true if your SMTP server requires TLS
      auth: {
        user: '', // Your email address
        pass: '' // Your email password
      } ,
  
};

export const generatePassword=(password)=>{
  console.log(password)
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt); 
  console.log(salt,hash)
  return hash
}



