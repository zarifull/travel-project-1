import express from 'express';
import storage from '../utils/storage.js'; 

const router = express.Router();

router.post('/', storage.array('images', 10), async (req, res) => {
  try {
    const { title, description, price, duration, location, isFeatured } = req.body;

    const numPrice = Number(price);
    const numDuration = Number(duration);
    const boolIsFeatured = isFeatured === 'true';

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Сүрөттөр жүктөлгөн жок' });
    }
    
    if (!title?.trim() || !description?.trim() || !price || !duration || !location?.trim()) {
      return res.status(400).json({ error: 'Маалыматтар толук эмес' });
    }
    
    if (isNaN(numPrice)) {
      return res.status(400).json({ error: 'Баасы туура эмес форматта' });
    }

    const imageUrls = req.files.map(file => file.path);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Uploaded tour data', { title, imageUrls });
    }
    
    res.status(201).json({
      message: 'Тур ийгиликтүү кошулду!',
      tour: {
        title,
        description,
        price: numPrice,
        duration: numDuration,
        location,
        isFeatured: boolIsFeatured,
        imageUrls,
      }
    });
  } catch (err) {
    console.error('Ката:', err);
    res.status(500).json({ error: 'Ички сервер катасы' });
  }
});

export default router;
