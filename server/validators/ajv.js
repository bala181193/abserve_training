import Ajv from 'ajv';
const ajvErrors = require("ajv-errors");

export const ajvCompiler=(schemaObj,data)=>{
try{
    const ajv=new Ajv({allErrors: true, jsonPointers: true })
    ajvErrors(ajv);
    ajv.addKeyword('confirmPassword', {
        validate: function (schema, data, parentSchema, dataPath, parentData, propertyName) {
          const valid = parentData.password === parentData.confirmPassword;
          if (!valid) {
            ajv.errors = [{
              keyword: 'confirmPassword',
              message: 'Password and confirm password do not match',
              params: { keyword: 'confirmPassword' }
            }];
          }
          return valid;
        },
        errors: true
      });     
      // Validate data
      const validate = ajv.compile(schemaObj);
      const valida=validate(data)
      console.log(validate);
      return validate
}catch(err){
console.log("errerrerrerr",err)
}
}