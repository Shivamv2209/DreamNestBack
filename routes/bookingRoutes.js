import express from "express";
import {createBooking} from "../conroutes/bookingcon.js"

const router = express.Router();

router.post("/createBooking",createBooking)

export default router;