import booking_model from "../models/Booking.js"
import user_model from "../models/user.js";
import listing_model  from "../models/Listing.js"

export const getTrips = async (req,res)=>{
    try{

        const {userId} = req.params
        const trips = await booking_model.find({customerId:userId}).populate("customerId hostId listingid");
        res.status(200).json(trips)

    }catch(err){
        res.status(400).json({message:"Failed to get the trips",error:err.message})
    }
}

// Add listing to the wishlist

export const addList = async (req,res)=>{
    try{

        const {userId,listingid} = req.params
        const user = await user_model.findById(userId)
        const listing = await  listing_model.findById(listingid).populate("creator")

        const favouriteList = user.wishlist.find((item)=>{
            return item._id.toString()===listingid
        }) 

        if(favouriteList){
            user.wishlist = user.wishlist.filter((item)=> item._id.toString() !== listingid)
            await user.save();
            res.status(200).json({message:"Listing removed from wishlist",wishlist:user.wishlist})
        }else{
            user.wishlist.push(listing)
            await user.save()
            res.status(200).json({message:"Listing added to wishlist",wishlist:user.wishlist})
        }


    }catch(err){
        res.status(400).json({message:"failed to add to the wishlist"})
    }
}

//property list 

export const getProperties = async (req,res)=>{
    try{

        const {userId} = req.params
        const property = await listing_model.find({creator:userId}).populate("creator");
        res.status(200).json(property)

    }catch(err){
        res.status(400).json({message:"Failed to get the property",error:err.message})
    }
}

//reservation list
export const getReservationList = async (req,res)=>{
    try{

        const {userId} = req.params
        const reservation = await booking_model.find({ customerId:userId }).populate("customerId hostId listingid");
        res.status(200).json(reservation)

    }catch(err){
        res.status(400).json({message:"Failed to get the reservation",error:err.message})
    }
}





