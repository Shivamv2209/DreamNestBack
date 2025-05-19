import express from "express";
import {getTrips,addList,getProperties,getReservationList} from "../conroutes/tripcon.js"

const router = express.Router();

router.get("/:userId/trips",getTrips)
router.patch("/:userId/:listingid",addList)
router.get("/:userId/properties",getProperties)
router.get("/:userId/reserv",getReservationList)

export default router;

