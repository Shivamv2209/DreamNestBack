import express from "express";
import multer from "multer";
const router = express.Router();
import {listing,getListing,listingdetails,getbysearch} from "../conroutes/listcon.js"

//configure multer 

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/uploads/");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload = multer({storage})


router.post("/create",upload.array("listingPhotoPath"),listing);
router.get("/",getListing)
router.get("/:listingid",listingdetails)
router.get("/search/:search",getbysearch)

export default router;