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
};


// 2️⃣ Get my bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("tour");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// 3️⃣ Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("tour user");
    if (!booking) return res.status(404).json({ message: "Not found" });

    // check ownership
    if (String(booking.user) !== String(req.user._id) && !req.user.isAdmin) {
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

    // user can only update their own & if still pending
    if (!req.user.isAdmin) {
      if (String(booking.user) !== String(req.user._id)) {
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

// 5️⃣ Delete booking (same rules as update)
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (!req.user.isAdmin) {
      if (String(booking.user) !== String(req.user._id)) {
        return res.status(403).json({ message: "Not authorized" });
      }
      if (booking.status !== "pending") {
        return res.status(400).json({ message: "Booking cannot be canceled after confirmation" });
      }
    }

    await booking.deleteOne();
    res.status(200).json({ message: "Booking canceled" });
  } catch (err) {
    res.status(500).json({ message: "Cancel failed" });
  }
};

// 6️⃣ Admin: get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("tour user");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 7️⃣ Admin: update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: "Not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = 'confirmed';
    await booking.save();

    res.json({ message: 'Booking confirmed', booking });
  } catch (err) {
    res.status(500).json({ message: 'Error confirming booking' });
  }
};
