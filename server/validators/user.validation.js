import {ajvCompiler} from './ajv'

export const register=(req,res,next)=>{
    try{
    let data={
      email:req.email,
      password:req.password,
      confirmPassword:req.confirmPassword,
      name:req.name
    };
    const schema = {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string", minLength: 1 },
          password: { type: "string", minLength: 5 },
          confirmPassword: { type: "string", minLength: 1 },
        },
        required: ["email", "password", "confirmPassword"],
        additionalProperties: true,
        errorMessage: {
          required: {
            email: "Email is required",
            password: "Password is required",
            confirmPassword: "Confirm password is required"
          },
          properties: {
            email: "Invalid email format",
            password: "Password is too short",
            confirmPassword: "Confirm password is too short"
          }
        }
      };
      const validateErrors=ajvCompiler(schema,data)
      console.log(validateErrors);
    }catch(err){
        console.log(err)
    }
}