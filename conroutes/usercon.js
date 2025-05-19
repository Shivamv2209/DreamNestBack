import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import user_model from "../models/user.js";
import mongoose from "mongoose";

    dotenv.config();

export const register = async (req,res)=>{
    try{
       const {firstname,lastname,email,password} = req.body;
       const profileimage = req.file
       if(!profileimage){
        return res.status(400).json({message:"No file uploaded"});
       }
       const profileimagePath = profileimage.path;

       const existingUser = await user_model.findOne({email});
       if(existingUser){
        return res.status(400).json({message:"User already exists"});
       } 
      
       bcrypt.genSalt(Number(process.env.SALT), (err,salt)=>{
        if(err){
            return res.status(500).json({message:err.message});
        }
        bcrypt.hash(password,salt,async(err,hash)=>{
            if(err){
                return res.status(500).json({message:err.message});
            }
            const newUser = await user_model.create({
                firstname,
                lastname,
                email,
                password:hash,
                profileimage:profileimagePath
            })
            let token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:"1d"});
            res.cookie("token",token);
            res.status(201).json({message:"User created successfully",user:newUser});
        })
       })

    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

export const login = async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await user_model.findOne({email})
        if(!user){
            return res.status(401).json({message:"User does not exist"})
        }

        bcrypt.compare(password,user.password,(err,isMatch)=>{
            if(!isMatch){
                return res.status(401).json({message:"Invalid credentials"})
            }
            const token = jwt.sign({email:user.email,
                id:user._id
            },process.env.JWT_SECRET)
            res.cookie("token",token)
            res.status(201).json({message:"User logged in successfully",user:user,token:token})

        })

    }catch(err){
        return res.status(400).json({message:"User login failded"},err.message)
    }
}

