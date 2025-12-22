import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      en: {
        type: String,
        required: [true, "Tour title in English is required"],
        trim: true,
        minlength: [3, "Title is too short"],
        maxlength: [100, "Title is too long"],
      },
      ru: {
        type: String,
        required: [true, "Название тура обязательно на русском языке"],
        trim: true,
      },
      kg: {
        type: String,
        required: [true, "Турдун аты сөзсүз керек (кыргызча)"],
        trim: true,
      },
    },

    description: {
      en: {
        type: String,
        required: [true, "Description in English is required"],
        trim: true,
      },
      ru: {
        type: String,
        required: [true, "Описание тура обязательно на русском языке"],
        trim: true,
      },
      kg: {
        type: String,
        required: [true, "Сүрөттөмө керек (кыргызча)"],
        trim: true,
      },
    },

    price: {
      type: Number,
      required: [true, "Баасы керек"],
      min: [0, "Баа терс болбош керек"],
    },

    duration: {
      type: Number,
      required: [true, "Узактыгы көрсөтүлүшү керек"],
    },

    maxGuests: {
      type: Number,
      required: [true, "Канча конок кабыл алынат көрсөтүлүшү керек"],
      min: [1, "Кеминде 1 конок болушу керек"],
    },

    location: {
      en: {
        type: String,
        required: [true, "Location in English is required"],
      },
      ru: {
        type: String,
        required: [true, "Местоположение на русском языке обязательно"],
      },
      kg: {
        type: String,
        required: [true, "Жайгашкан жери көрсөтүлүшү керек"],
      },
    },

    category: {
      type: String,
      required: [true, "Категория көрсөтүлүшү керек"],
      enum: ["Adventure", "Relax", "Cultural", "City", "Nature", "Other"],
    },

    hotel: {
      type: String,
      required: [true, "Отельдин аты көрсөтүлүшү керек"],
      trim: true,
    },
    includes: {
      type: [
        {
          en: { type: String, required: true, trim: true },
          ru: { type: String, required: true, trim: true },
          kg: { type: String, required: true, trim: true },
        },
      ],
      default: [],
    },

    startDates: {
      type: [Date],
      required: [true, "Кеминде бир башталыш датасы керек"],
      default: [],
    },

    imageUrls: {
      type: [String],
      required: [true, "Сүрөттөр керек"],
    },

    ratings: {
      type: [Number],
      default: [],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model("Tour", tourSchema);
export default Tour;
