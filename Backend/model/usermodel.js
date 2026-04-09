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
      full: { type: String },   // e.g. "123 Street, Rohini"
      city: { type: String },   // e.g. "New Delhi"
      state: { type: String },  // e.g. "Delhi"
      pincode: { type: String },
      country: { type: String }   // e.g. "India"
    },
 location: {
      city: { type: String },   // e.g. "New Delhi"
      state: { type: String },  // e.g. "Delhi"
      pincode: { type: String },
    },
avatar: {
  type: String,
  default: ""
},
theme: {
  type: String,
  default: "dark"
},
service:{
  type:String,
  default:""
},
fee: {
  type: Number,
  default: 0
},
experience: {
  type: String,
  default: ""
}
},{timestamps:true})
const User = mongoose.model('User',UserSchema);
export default User;