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

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Сүрөттөр жүктөлгөн жок' });
    }

    const imageUrls = req.files.map(file => file.path); 

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
    const {
      keyword = '',
      destination = '',
      guests,
      date,
      page = 1,
      limit: rawLimit,
    } = req.query;

    const limit = parseInt(rawLimit) || 100;
    const skip = (parseInt(page) - 1) * limit;

    const searchFilter = {};

    if (keyword) {
      searchFilter.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { location: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { includes: { $regex: keyword, $options: 'i' } },
        { highlights: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword, $options: 'i' } },
      ];
    }

    if (destination) {
      searchFilter.location = { $regex: destination, $options: 'i' };
    }

    if (guests) {
      searchFilter.maxGroupSize = { $gte: parseInt(guests) };
    }

    // Optional: handle filtering by tour date
    if (date) {
      searchFilter.date = date; // or more advanced date range filtering
    }

    const total = await Tour.countDocuments(searchFilter);

    const tours = await Tour.find(searchFilter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: tours,
    });

  } catch (err) {
    console.error("❌ Error in getAllTours:", err.message);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
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

export const rateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    console.log('REQ.PARAMS:', req.params);
    console.log('REQ.BODY:', req.body);

    if (!rating || typeof rating !== 'number') {
      return res.status(400).json({ message: 'Rating must be a number' });
    }

    const tour = await Tour.findById(id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    console.log('FOUND TOUR:', tour);

    // Ensure tour.ratings is an array
    tour.ratings = tour.ratings || [];

    tour.ratings.push(rating);
    await tour.save();

    res.status(200).json({ message: 'Rating added', ratings: tour.ratings });
  } catch (error) {
    console.error('❌ Rating error:', error);  // This will show you the actual 500 error
    res.status(500).json({ message: 'Server error' });
  }
  console.log("req.params:", req.params);
console.log("req.body:", req.body);

};






