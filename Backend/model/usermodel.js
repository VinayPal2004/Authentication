import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
  type:String,
  enum:["user","provider","admin"],
  default:"user"
},
Phone: {
  type: Number
},
address: {
  type: String
},
avatar: {
  type: String,
  default: ""
},
theme: {
  type: String,
  default: "dark"
}
},{timestamps:true})
const User = mongoose.model('User',UserSchema);
export default User;