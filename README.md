# SkillConnect Kerala - Production Full-Stack Application

Complete production-ready platform connecting verified skilled workers with employers in Kerala's Tier 3 cities.

## 🚀 Project Overview

This is a completely rebuilt production application with:
- **Backend**: Node.js + Express + MongoDB + Socket.io
- **Frontend**: React + Vite + Tailwind CSS + Zustand
- **Database**: MongoDB with Mongoose ODM
- **Real-time**: Socket.io for chat and notifications
- **Authentication**: JWT-based auth with role-based access control
- **File Upload**: Multer (with Cloudinary support)
- **Security**: Helmet, Rate limiting, Mongo sanitization

## 📁 Project Structure

```
proto/
├── backend/                 # Node.js/Express API
│   ├── controllers/        # Route controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── utils/             # Utility functions
│   ├── server.js          # Entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── layouts/       # Layout components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── store/         # State management
│   │   ├── lib/           # Utilities
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md              # This file
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password**: bcryptjs
- **Validation**: express-validator
- **File Upload**: Multer
- **Real-time**: Socket.io
- **Security**: Helmet, express-rate-limit, express-mongo-sanitize
- **Email**: Nodemailer
- **Payment**: Stripe (ready)

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State**: Zustand (lightweight Redux alternative)
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Real-time**: Socket.io Client
- **Maps**: React Leaflet (ready)
- **Charts**: Chart.js + react-chartjs-2 (ready)

## ✨ Features

### 1. Landing Page (`index.html`)
- Hero section with stats
- How it works (3 steps)
- Features showcase
- Comparison table vs competitors
- User testimonials
- Impact metrics (TRL-2 based)
- Call-to-action sections

### 2. Worker Search (`workers.html`)
- Search bar
- Filters: Skill, Rating, Distance, Availability
- Grid/List view toggle
- 24 sample workers with dummy data
- Real-time filtering

### 3. Worker Profile (`worker-profile.html`)
- Profile photo with verified badge
- Contact buttons (Call, WhatsApp)
- About section
- Skills list
- Verified certificates
- Portfolio gallery
- Reviews & ratings
- Quick info sidebar
- Availability status

### 4. Certificate Verification (`verify-certificate.html`)
- Two methods: Upload or Enter ID
- Drag & drop file upload
- AI verification simulation
- Detailed verification report
- Analysis breakdown
- Download report option

### 5. Worker Registration (`register-worker.html`)
- Personal information form
- Professional details
- Location with GPS
- Certificate upload
- Portfolio upload
- Availability settings
- Benefits sidebar
- Process steps

### 6. Employer Registration (`register-employer.html`)
- Contact information
- Job requirements
- Location details
- Special requirements
- Preferred contact method
- How it works sidebar

### 7. About Page (`about.html`)
- Mission statement
- Origin story timeline
- Core values
- Research foundation
- Impact goals
- Team message

### 8. Contact Page (`contact.html`)
- Contact form
- Contact cards (email, phone, WhatsApp)
- Google Maps integration
- FAQ section

### 9. Admin Dashboard (`admin.html`)
- Stats overview
- Pending verifications table
- Recent activities feed
- Worker distribution chart
- Rating statistics
- Fraud alerts
- Quick actions
- District overview

## 📱 Responsive Design

Fully responsive with breakpoints:
- Desktop: 1024px+
- Tablet: 768px - 1024px
- Mobile: < 768px

Mobile-specific features:
- Hamburger menu
- Sticky bottom action bars
- Stacked layouts
- Touch-optimized buttons

## 🚀 How to Run

1. Open `index.html` in any modern web browser
2. No build process or server required
3. All dependencies loaded via CDN

## 🎭 Demo Data

All data is simulated for prototype purposes:
- 24 sample workers with AI-generated avatars
- Dummy certificates
- Sample reviews
- Mock statistics
- Simulated AI verification

## 🔧 Interactive Features

### Working Functionality:
- Navigation menu
- Search and filters
- Form validation
- File upload preview
- View toggle (grid/list)
- Modal-style alerts
- Smooth scrolling
- Responsive layout

### Simulated Functionality:
- Certificate verification (2-second delay)
- Form submissions (success messages)
- GPS location (browser geolocation API)
- Phone/WhatsApp links
- Admin actions

## 📧 Contact Information

- Email: kailas62827@gmail.com
- Phone: +91 6282766374
- Location: Kottayam, Kerala

## 🎯 Purpose

This is a high-fidelity prototype created for:
- Project evaluation
- Final presentation
- User testing
- Stakeholder demonstrations
- TRL-2 validation

## 💡 Future Enhancements

For production version:
- Backend integration
- Real AI certificate validation
- Database for workers & employers
- Payment gateway
- Real-time notifications
- Mobile apps (iOS/Android)
- Advanced analytics
- Multi-language support

## 📄 License

© 2025 SkillConnect Kerala. All rights reserved.

---

Built with ❤️ for Kerala's skilled workers and employers.
