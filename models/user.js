import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
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
    profileimage:{
        type:String,
        default:"" 
    },
    triplist:{
        type:Array,
        default:[] 
    },
     wishlist:{
        type:Array,
        default:[] 
    },
     propertylist:{
        type:Array,
        default:[] 
    },
     reservationlist:{
        type:Array,
        default:[] 
    },
},
{
    timestamps:true
}
);

export default mongoose.model("user",userSchema);