import Booking from '../models/booking.model.js';

export const createBooking = async (req, res) => {
  try {
    const { name, email, phone, address, date, time, message } = req.body;

    const newBooking = new Booking({
      user: req.user._id, // Assuming you have authentication
      name,
      email,
      phone,
      address,
      date,
      time,
      message
    });

    await newBooking.save();

    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
};




export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('tour');
    res.status(200).json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('tour user');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json({ booking });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch booking' });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ updated });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Booking canceled' });
  } catch (err) {
    res.status(500).json({ message: 'Cancel failed' });
  }
};
