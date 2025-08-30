import Booking from '../models/booking.model.js';

export const createBooking = async (req, res) => {
  try {
    const { tourId, name, email, phone, address, date, guests, message } = req.body;

    if (!tourId || !req.user._id) {
      return res.status(400).json({ message: "Missing tour or user ID" });
    }

    const newBooking = new Booking({
      tourId,
      userId: req.user._id,
      name,
      email,
      phone,
      address,
      guests: Number(guests), // ensure number
      date,
      message,
      status: "pending",
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking created", booking: newBooking });
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
  console.log("req.user in booking:", req.user);

};


export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate("tourId","title imageUrls price"); // also adjust this to populate correctly
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};


export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("tourId")
      .populate("userId");
    if (!booking) return res.status(404).json({ message: "Not found" });

    if (String(booking.userId) !== String(req.user._id) && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch booking" });
  }
};

// 4️⃣ Update booking (User: only if pending; Admin: always)
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (!req.user.isAdmin) {
      if (String(booking.userId) !== String(req.user._id)) {
        return res.status(403).json({ message: "Not authorized" });
      }
      if (booking.status !== "pending") {
        return res.status(400).json({ message: "Booking cannot be updated after confirmation" });
      }
    }
    

    Object.assign(booking, req.body);
    const updated = await booking.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// controllers/booking.controller.js
export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Only allow the user who owns it
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed to delete this booking" });
    }

    await booking.deleteOne();
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error("User delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
};





