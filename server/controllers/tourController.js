import Tour from "../models/tour.model.js";

export const createTour = async (req, res) => {
  try {

    const {
      title,
      description,
      price,
      duration,
      location,
      category,
      includes,
      startDates,
      isPopular,
    } = req.body;

    // Validate
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Сүрөттөр жүктөлгөн жок' });
    }

    // If using Cloudinary, req.files[i].path has the Cloudinary URL
    const imageUrls = req.files.map(file => file.path); // path is from Cloudinary

    const newTour = new Tour({
      title,
      description,
      price: Number(price),
      duration: Number(duration),
      location,
      category,
      includes: JSON.parse(includes),  // expect JSON string from frontend
      startDates: JSON.parse(startDates), // same here
      isPopular: isPopular === 'true',
      imageUrls, // save array of Cloudinary URLs
    });

    await newTour.save();

    res.status(201).json({
      message: 'Тур ийгиликтүү кошулду!',
      tour: newTour,
    });

  } catch (error) {
    console.error('Ката:', error);
    res.status(500).json({ error: 'Ички сервер катасы', details: error.message });
  }
};

export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.status(200).json(tour);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedTour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    res.status(200).json(updatedTour);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};


export const deleteTour = async (req, res) => {
  try {
    const deleted = await Tour.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Tour not found" });
    res.status(200).json({ message: "Tour deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
