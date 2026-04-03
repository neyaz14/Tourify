Here’s a **production-level README.md for your backend** based on your full documentation 👇
(You can directly copy-paste into your repo)

---

# 🚀 PH Tour Management System Backend

A scalable, secure, and modular **Tour Management System Backend API** built with **Node.js, Express, MongoDB, and Redis**.
This system powers a full-featured tour booking platform with authentication, booking, payments, and admin management.

---

## 📌 Project Overview

The backend provides RESTful APIs to support a complete tour management platform where users can:

* Register and authenticate (Email / Google)
* Browse and filter tours
* Book tours and make payments
* Manage bookings and profiles
* Admins can manage users, tours, guides, and transactions

---

## ⚙️ Tech Stack

### 🖥️ Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Redis (OTP & caching)

### 🔐 Authentication & Security

* JWT (Access + Refresh Token)
* OTP Verification (Email/SMS)
* bcrypt (Password hashing)
* RBAC (Role-Based Access Control)

### 💳 Payment

* SSLCommerz Payment Gateway

### ☁️ Deployment

* Vercel / AWS / DigitalOcean

---

## 🧠 System Architecture

* **Architecture Pattern:** MVC (Model-View-Controller)
* **API Style:** RESTful (`/api/v1`)
* **Scalability:** Horizontally scalable
* **Frontend:** Separate SPA (React / Next.js)

---

## 👥 User Roles

* **Visitor** → Browse tours
* **User** → Book tours, manage profile
* **Admin** → Manage users, tours, bookings, guides

---

## ✨ Core Features

### 🔐 Authentication

* Email/Password login
* Google OAuth login
* OTP verification system
* JWT-based authentication
* Password reset & recovery

### 🧳 Tour Management

* Create / update / delete tours
* Tour types and categorization
* Image upload support
* Search & filtering

### 📅 Booking System

* Create booking with status `pending`
* View booking history
* Admin booking management

### 💳 Payment Integration

* SSLCommerz payment gateway
* Payment verification (IPN)
* Booking status auto-update

### 📊 Admin Dashboard

* Manage users, tours, bookings
* Assign guides
* View analytics (stats APIs)

---

## 📁 Project Structure

```bash
src/
├── app/                # App configuration
├── modules/            # Feature modules (auth, user, tour, booking, payment)
├── models/             # Mongoose schemas
├── controllers/        # Request handlers
├── services/           # Business logic
├── middlewares/        # Auth, error handling
├── utils/              # Helpers
├── routes/             # API routes
```

---

## 🔗 API Endpoints

## 🔐 Auth

```http
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh-token
POST   /api/v1/auth/set-password
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
```

---

## 🔢 OTP

```http
POST   /api/v1/otp/send
POST   /api/v1/otp/verify
```

---

## 👤 User

```http
POST   /api/v1/user/register
GET    /api/v1/user/me
PATCH  /api/v1/user/:id
GET    /api/v1/user        (Admin)
```

---

## 🧳 Tour

```http
POST   /api/v1/tour/create
GET    /api/v1/tour
PATCH  /api/v1/tour/:id
DELETE /api/v1/tour/:id
```

### Tour Type

```http
POST   /api/v1/tour/create-tour-type
GET    /api/v1/tour/tour-types
PATCH  /api/v1/tour/tour-types/:id
GET    /api/v1/tour/tour-types/:id
```

---

## 📅 Booking

```http
POST   /api/v1/booking
GET    /api/v1/booking/my-bookings
GET    /api/v1/booking/:bookingId
GET    /api/v1/booking          (Admin)
PATCH  /api/v1/booking/:bookingId/status
```

---

## 💳 Payment

```http
POST   /api/v1/payment/init-payment/:paymentId
GET    /api/v1/payment/ipn
GET    /api/v1/payment/stats
```

---

## 📊 Stats

```http
GET    /api/v1/stats/booking
GET    /api/v1/stats/payment
GET    /api/v1/stats/user
GET    /api/v1/stats/tour
```

---

## 🧾 Data Models

### 👤 User

* name, email, password
* role (Admin/User)
* phone, address, picture
* isVerified, isActive

### 🧳 Tour

* title, description, images
* location, costFrom
* startDate, endDate
* tourType

### 📅 Booking

* user, tour
* guestCount, phone
* status (Pending, Completed)

### 💳 Payment

* booking, transactionId
* status (Paid, Unpaid)
* amount

---

## 🔗 Entity Relationships

* User → Booking (1:N)
* Tour → Booking (1:N)
* Tour → TourType (N:1)
* Booking → Payment (1:1)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone <your-backend-repo-link>
cd backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create `.env` file:

```env
PORT=5000
DATABASE_URL=your_mongodb_uri
REDIS_URL=your_redis_url
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
SSL_STORE_ID=your_store_id
SSL_STORE_PASSWORD=your_store_password
```

### 4️⃣ Run server

```bash
npm run dev
```

---

## 🔐 Security Features

* Password hashing using bcrypt
* JWT authentication (access + refresh)
* OTP verification using Redis
* Role-based access control (RBAC)
* Secure payment handling (HTTPS)

---

## ⚡ Non-Functional Highlights

* ⚡ Response time < 500ms (95% requests)
* 👥 Supports 1000+ concurrent users
* 📈 Horizontally scalable architecture
* 🔁 Fault-tolerant Redis caching
* ⏱️ 99.5% uptime target

---

## 🔄 Use Case Example

### Booking Flow

1. User registers and verifies OTP
2. User logs in
3. User selects a tour
4. Booking created (`pending`)
5. Redirect to SSLCommerz
6. Payment success → booking confirmed

---

## ✅ Acceptance Criteria

* Users can register, login, and book tours
* Admin can manage tours, users, bookings
* Payments update booking correctly
* All APIs are secured and role-based

## Things to do more 
* Make Stats and Guide api 
* Implement Rate limiting 
* Work on Notification System - email, in app notification
* More feature about Payment system 

