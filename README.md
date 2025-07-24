# 🏥 BMI Tracker Web Application

A modern, full-stack BMI (Body Mass Index) calculator and health tracking application built with Next.js, featuring user authentication, data persistence, and health consultations.

## 🌟 Features

### 📊 BMI Calculation
- **Accurate BMI calculation** with height and weight input
- **BMI category classification** (Underweight, Normal, Overweight, Obese)
- **Gender-specific calculations** for more accurate results
- **Real-time results** with instant feedback

### 👤 User Management
- **User registration and authentication** with NextAuth.js
- **Secure password hashing** with bcryptjs
- **Session management** for persistent login

### 📈 Health Tracking
- **BMI history tracking** - View your progress over time
- **Export functionality** for personal records

### 💬 Health Consultation
- **Consultation request system** for professional advice
- **Message management** between users and health professionals
- **Status tracking** for consultation requests
- **Secure communication platform**

### 🎨 Modern UI/UX
- **Responsive design** that works on all devices
- **Dark/Light mode support** for better user experience
- **Smooth animations** with Framer Motion
- **Accessible design** following WCAG guidelines
- **Clean, modern interface** built with Tailwind CSS and Radix UI

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.4.2** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- 
### Backend
- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js** - Authentication solution
- **Prisma** - Database ORM and query builder
- **PostgreSQL** - Relational database
- **bcryptjs** - Password hashing
- **Jose** - JWT token handling

### Database & Deployment
- **Neon Database** - Serverless PostgreSQL (Singapore region)
- **Vercel** - Deployment and hosting platform
- **Prisma Client** - Type-safe database client

### Prerequisites
- Node.js 18.17.0 or higher
- npm or yarn package manager
- PostgreSQL database (local or cloud)

## 📱 Usage

### For Users
1. **Register** a new account or **login** with existing credentials
2. **Calculate BMI** by entering your height and weight
3. **View your BMI history** in the dashboard
4. **Track your progress** with interactive charts
5. **Request consultations** with health professionals

### For Health Professionals
1. **Access consultation requests** from users
2. **Provide professional advice** and recommendations
3. **Monitor user progress** and health trends
4. **Manage consultation status** and follow-ups

## 🗄️ Database Schema

### User Model
- User authentication and profile information
- Relationship with BMI records and consultations

### BMI Record Model
- BMI calculation history with timestamps
- Gender-specific data for accurate tracking
- Linked to user accounts for personalized tracking

### Consultation Model
- Health consultation requests and responses
- Status tracking and message management
- Professional communication platform

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

