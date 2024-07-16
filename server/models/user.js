import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name:{
      type: String,
    },
    email:{
      type: String,
    },
    password:{
      type: String,
    },
    confirmPassword:{
      type: String,
    },
    profileImage: {
      type: String,
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
  },
  // { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
export default userModel;
