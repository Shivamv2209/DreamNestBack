import listing_model from "../models/Listing.js";
import user_model from "../models/user.js";


export const listing = async (req, res) => {
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedCount,
      bathroomCount,
      bedroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightdesc,
      price,
    } = req.body;

    const listingPhotos = req.files;
    if (!listingPhotos) {
      return res.status(400).send("No files uploaded");
    }

    const listingPhotoPath = listingPhotos.map((file) => file.path);

    const newListing = await listing_model.create({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedCount,
      bathroomCount,
      bedroomCount,
      amenities,
      listingPhotoPath:listingPhotoPath,
      title,
      description,
      highlight,
      highlightdesc,
      price,
    });

    res.status(201).json(newListing);


  }catch (err) {
    console.log(err)
    res.status(409).json({message:"Failed to create listing", error:err.message})
  }
};

//Get listings

export const getListing = async (req,res)=>{
   
    const qCategory = req.query.category

    try{

     let listing 
     if(qCategory){
        listing = await listing_model.find({category:qCategory}).populate("creator")
     } else{
        listing = await listing_model.find().populate("creator")

     }

     res.status(201).json(listing)

    }catch(err){
        console.log(err)
        res.status(403).json({message:"Could not get the listing",error:err.message})
    }
}


export const listingdetails = async (req,res)=>{
  try{

    const {listingid} = req.params;
   
    const listing = await listing_model.findById(listingid).populate("creator");
    
    res.status(200).json(listing);

  }catch(err){
    res.status(400).json({message:"Failded to get the listing detais",error:err.message})
  }
}

//get by search

export const getbysearch = async (req,res) =>{
  const {search} = req.params;
  try{
    let listing = []
    if(search === "all"){
      listing = await listing_model.find().populate("creator")
    }else{
      listing = await listing_model.find({
        $or : [
          {category : {$regex: search, $options: "i"}},
          {title : {$regex: search, $options: "i"}}
        ]
      }).populate("creator")
     
    }

    res.status(200).json(listing)
    
  }catch(err){
    res.status(400).json({message:"failed to search "})
  }
}