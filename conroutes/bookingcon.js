import booking_model from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const { customerId, hostId, listingid, startdate, enddate, totalPrice } =
      req.body;
    const newbooking = await booking_model.create({
      customerId,
      hostId,
      listingid,
      startdate,
      enddate,
      totalPrice,
    });

    res.status(200).json(newbooking)
  } catch (err) {
    res.status(400).json({ message: "Booking failed", error: err.message });
  }
};
