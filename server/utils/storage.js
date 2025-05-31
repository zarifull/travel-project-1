import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js'

const storage = new CloudinaryStorage({
    cloudinary,
    params :{
        folder : 'tours',
        allowed_formats : ['jpg', 'jpeg', 'png','webp'],
        transformation : [{width: 800, height: 600, crop: 'limit'}],
    },
});

const upload = multer({storage});


export default upload;