const mongoose = require("mongoose") ; 

const UserSchema= new mongoose.Schema({
    Name : {
        type : String , 
        required : true  , 
    } , 
    Age : {
        type  : Number , 
        required :  true ,  
        min :  0 
    } , 
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    } , 
    MovieList :{
      type : Array , 
      default : [] 
    }
}, 
{ timestamps: true }) ; 

const User = mongoose.model("User", UserSchema);
module.exports = User ; 