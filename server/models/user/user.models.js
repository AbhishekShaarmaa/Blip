import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email:{
      type:String,
      required:true,
      unique:true,
    },
   
    confirmedEmail:{
      type:Boolean , 
      default:false,
      required:true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    updatePasswordToken:{
      type:String,
      
      minlength:6
    },
    updatePasswordExpires: Date,
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    
    // createdAt, updatedAt => Member since <createdAt>
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
