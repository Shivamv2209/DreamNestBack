import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    hostId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    listingid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"listing"
    },
    startdate:{
        type:String,
        required:true,
    },
    enddate:{
        type:String,
        required:true,
    },
    totalPrice:{
        type:Number,
        required:true,
    }
},{
    timestamps:true
});

export default mongoose.model("booking",BookingSchema)