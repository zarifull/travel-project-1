import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Турдун аты сөзсүз керек"],
      trim: true,
      minlength: [3, "Аталыш өтө кыска"],
      maxlength: [100, "Аталыш өтө узун"]
    },
    description: {
      type: String,
      required: [false, "Сүрөттөмө керек"],
      trim: true
    },
    price: {
      type: Number,
      required: [true, "Баасы керек"],
      min: [0, "Баа терс болбош керек"]
    },
    duration: {
      type: Number,
      required: [true, "Узактыгы көрсөтүлүшү керек"],
    },
    location: {
      type: String,
      required: [true, "Жайгашкан жери көрсөтүлүшү керек"]
    },
    category :{
      type : String,
      required: [true, "Категория  көрсөтүлүшү керек "],
      enum: ['Adventure', 'Relax', 'Cultural', 'City', 'Nature', 'Other']
    },
    isPopular:{
      type: Boolean,
      default: false
    },
    includes:{
      type: [String],
      required: [true,"Кеминде бир “includes” кошуңуз"],
      default:[]
    },
    startDates:{
      type:[Date],
      required: [true,"Кеминде бир башталыш датасы керек"],
      default:[]
    },          
    imageUrls: {
      type: [String],
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true // createdAt жана updatedAt автоматтык түрдө кошулат
  }
);

const Tour = mongoose.model("Tour", tourSchema);
export default Tour;
