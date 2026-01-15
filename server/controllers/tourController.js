import Tour from "../models/tour.model.js";

export const createTour = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      duration,
      maxGuests,
      location,
      category,
      includes,
      startDates,
      hotel,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Сүрөттөр жүктөлгөн жок" });
    }

    const imageUrls = req.files.map((file) => file.path);

    let parsedTitle = {};
    let parsedDescription = {};
    let parsedLocation = {};

    try {
      parsedTitle = title ? JSON.parse(title) : {};
      parsedDescription = description ? JSON.parse(description) : {};
      parsedLocation = location ? JSON.parse(location) : {};
    } catch (err) {
      return res.status(400).json({ error: "Multilingual fields are not valid JSON" });
    }

    const parsedIncludes = includes ? JSON.parse(includes) : [];
    const parsedStartDates = startDates ? JSON.parse(startDates) : [];

    if (!parsedTitle.en || !parsedTitle.ru || !parsedTitle.kg) {
      return res.status(400).json({ error: "Please fill all title fields" });
    }
    if (!parsedDescription.en || !parsedDescription.ru || !parsedDescription.kg) {
      return res.status(400).json({ error: "Please fill all description fields" });
    }
    if (!parsedLocation.en || !parsedLocation.ru || !parsedLocation.kg) {
      return res.status(400).json({ error: "Please fill all location fields" });
    }
    if (parsedIncludes.length === 0) {
      return res.status(400).json({ error: "Кеминде бир 'includes' кошуңуз" });
    }
    parsedIncludes.forEach((item) => {
      if (!item.en || !item.ru || !item.kg) {
        return res
          .status(400)
          .json({ error: "Ар бир includes үчүн бардык тилдер толтурулушу керек" });
      }
    });

    const newTour = new Tour({
      title: parsedTitle,
      description: parsedDescription,
      location: parsedLocation,
      price: Number(price),
      duration: Number(duration),
      maxGuests: Number(maxGuests),
      category,
      includes: parsedIncludes,
      startDates: parsedStartDates,
      hotel,
      imageUrls,
    });

    await newTour.save();

    res.status(201).json({
      message: "Тур ийгиликтүү кошулду!",
      tour: newTour,
    });
  } catch (error) {
    console.error("❌ Ката:", error);
    res
      .status(500)
      .json({ error: "Ички сервер катасы", details: error.message });
  }
};

export const getAllTours = async (req, res) => {
  try {
    const {
      keyword = "",
      destination = "",
      guests,
      date,
      page = 1,
      limit: rawLimit,
    } = req.query;

    const limit = parseInt(rawLimit) || 100;
    const skip = (parseInt(page) - 1) * limit;

    let andConditions = [];

    if (keyword) {
      andConditions.push({
        $or: [
          { "title.en": { $regex: keyword, $options: "i" } },
          { "title.ru": { $regex: keyword, $options: "i" } },
          { "title.kg": { $regex: keyword, $options: "i" } },
          { "location.en": { $regex: keyword, $options: "i" } },
          { "location.ru": { $regex: keyword, $options: "i" } },
          { "location.kg": { $regex: keyword, $options: "i" } },
          { category: { $regex: keyword, $options: "i" } }
        ]
      });
    }

    if (destination) {
      andConditions.push({
        $or: [
          { "location.en": { $regex: destination, $options: "i" } },
          { "location.ru": { $regex: destination, $options: "i" } },
          { "location.kg": { $regex: destination, $options: "i" } }
        ]
      });
    }

    if (guests) {
      andConditions.push({ maxGuests: { $gte: parseInt(guests) } });
    }

    if (date) {
      const searchDate = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      andConditions.push({
        startDates: { 
          $elemMatch: { $gte: searchDate, $lte: endOfDay } 
        }
      });
    }

    const searchFilter = andConditions.length > 0 ? { $and: andConditions } : {};

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
    res.status(500).json({ success: false, message: "Server error" });
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
    const { id } = req.params;

    const parseField = (field) => {
      try {
        return typeof field === 'string' ? JSON.parse(field) : field;
      } catch (e) { return field; }
    };

    const updateData = {
      title: parseField(req.body.title),
      description: parseField(req.body.description),
      location: parseField(req.body.location),
      includes: parseField(req.body.includes),
      startDates: parseField(req.body.startDates),
      price: Number(req.body.price),
      duration: Number(req.body.duration),
      maxGuests: Number(req.body.maxGuests),
      category: req.body.category,
      hotel: req.body.hotel
    };

    let imageUrls = [];
    if (req.body.existingImageUrls) {
      imageUrls = Array.isArray(req.body.existingImageUrls) 
        ? req.body.existingImageUrls 
        : [req.body.existingImageUrls];
    }
    
    if (req.files && req.files.length > 0) {
      const newPaths = req.files.map(f => f.path);
      imageUrls = [...imageUrls, ...newPaths];
    }
    updateData.imageUrls = imageUrls.filter(url => url && url.trim() !== "");

    const updatedTour = await Tour.findByIdAndUpdate(
      id, 
      { $set: updateData }, 
      { new: true, runValidators: true }
    );

    if (!updatedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    console.log("✅ DATABASE UPDATED SUCCESSFULLY:", updatedTour._id);
    res.status(200).json(updatedTour);

  } catch (err) {
    console.error("❌ UPDATE ERROR:", err.message);
    res.status(500).json({ message: "Update failed", error: err.message });
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

    if (!rating || typeof rating !== "number") {
      return res.status(400).json({ message: "Rating must be a number" });
    }

    const tour = await Tour.findById(id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    tour.ratings = tour.ratings || [];
    tour.ratings.push(rating);
    await tour.save();

    res.status(200).json({ message: "Rating added", ratings: tour.ratings });
  } catch (error) {
    console.error("❌ Rating error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
