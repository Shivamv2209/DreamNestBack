import express from "express";
import {register,login} from "../conroutes/usercon.js"
import multer from "multer";

const router = express.Router();
//config from multer
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/uploads") //Store uploaded files in "uploads folder"
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname) //use the original name of the file
    }
})

const upload = multer({storage:storage})



router.post("/register", upload.single('profileimage') ,register);
router.post("/login",login);

export default router;