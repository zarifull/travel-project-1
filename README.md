# 🌍 **Travel Project 1**

![React](https://img.shields.io/badge/React-17.0.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.0-green)
![Express](https://img.shields.io/badge/Express-4.18-orange)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-brightgreen)

This project is a **full-stack travel booking web application** built with **React**, **Node.js**, **Express**, and **MongoDB**.
Users can browse tours, register/login, view details, and book trips — all fully integrated with the backend.

---

## 🚀 **Features**

* **User Authentication:** Register, login, logout, and protected routes.
* **Booking System:** Users can select dates, number of people, and book tours.
* **Tour Search:** Search tours by destination, dates, category, or popularity.
* **Tours List:** Dynamic filter & sort system.
* **Tour Details Page:**

  * Multiple images
  * Description
  * Highlights
  * Itinerary
  * Price, rating
* **Admin Panel:** Manage users, tours, bookings, and resources.
* **User Dashboard:** View, edit, or cancel bookings.
* **Notifications & Alerts:** Multilingual supported (i18n).
* **Fully Responsive:** Mobile → desktop layout via `media.css`.
* **SEO-friendly pages** and optimized performance.

---

## 🗂 **Project Structure**

```
root((Project Structure))
  backend
    controllers
      js_files("*.js")
    middleware
    models
    routes
    utils
      storage("storage.js")
      cloudinary("cloudinary.js")
      mailer("mailer.js")
      sendOtp("sendOtp.js")
      validateEmailDomain("validateEmailDomain.js")
    env(".env")
    seed("seed.js")
    server("server.js")
    package("package.json")

  frontend
    public
      index("index.html")
    src
      api("axiosInstance.js")
      assets("images, icons")
      components("React UI components")
      context("AuthContext")
      pages("Auth, Resources, Tours, etc.")
      styles("CSS files")
      app("App.js")
      mainRoute("mainRoute.jsx")
      index("index.js")
    env(".env")
    package("package.json")

  readme("README.md")
  gitignore(".gitignore")
```

---

## 📱 **Responsive Breakpoints**

| Device        | Breakpoint      |
| ------------- | --------------- |
| Mobile        | **320–480px**   |
| Small tablets | **480–768px**   |
| Tablets       | **768–1024px**  |
| Laptop        | **1200–1440px** |
| Large screens | **1440px+**     |

All responsive styling is managed in **`media.css`**.

---

## ⚡ **How to Run the Project**

```bash
# Clone repository
git clone https://github.com/yourusername/travel-project-1.git

# --- FRONTEND ---
cd frontend
npm install
npm start

# --- BACKEND ---
cd ../backend
npm install
npm run dev

# Open your browser
http://localhost:3000
```

---

## ✨ **New Features Added**

* Tour booking system
* Search by destination & date
* Login & register validation
* Tour details page with itinerary & highlights
* Admin dashboard
* User dashboard
* Reviews & ratings
* Image sliders
* Multilingual alerts (i18n)
* Performance improvements
* SEO enhancements
* Analytics & stats for admin

---

## 🛠 **Technologies Used**

### **Frontend**

* React.js
* Plain CSS
* Cloudinary (image storage)
* React Router
* Axios

### **Backend**

* Node.js
* Express
* MongoDB
* Nodemailer
* Cloudinary SDK

---

## 📸 **Screenshots**
<img width="1440" height="900" alt="Screenshot 2025-12-12 at 13 41 16" src="https://github.com/user-attachments/assets/2c0395f7-f241-45a9-9e12-8e29685d46be" />


