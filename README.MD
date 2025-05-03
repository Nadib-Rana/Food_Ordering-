Here’s a **single comprehensive `README.md`** that combines both your **frontend and backend** to showcase your **University Food Ordering MERN Website** on GitHub. It is ideal for public repositories, portfolios, and job applications.

---

```markdown
# 🍽️ University Food Ordering Website (MERN Stack)

A full-stack food ordering web application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) with a responsive Bootstrap frontend. This app allows university guests and students to browse food by categories (Morning, Lunch, 24/7), add to cart, place orders, simulate mobile payments, and view order history with tracking.

![App Screenshot](https://via.placeholder.com/900x400?text=Showcase+Screenshot) <!-- Replace with real image -->

---

## 🌟 Features

### 👤 User Functionality
- Secure login for guests (GU) and students (ST)
- Filter food items by category and search by name
- Add items to cart with stock checks
- Place orders and simulate payment
- View order history and track delivery status
- Export order receipt to PDF with QR code

### 🛠 Admin (future)
- Manage food items (Add/Remove/Edit)
- View all orders
- Update delivery status

---

## 🔧 Tech Stack

| Frontend                | Backend                | Database    |
|------------------------|------------------------|-------------|
| React.js + Bootstrap 5 | Node.js + Express.js   | MongoDB     |

Other Libraries:
- `react-router-dom`
- `bcryptjs`, `jsonwebtoken`
- `html2canvas`, `jspdf`, `qrcode.react`
- `mongoose`
- `nodemon`, `dotenv`, `cors`

---

## 📁 Project Structure

```

university-food-ordering/
├── frontend/              # React App
│   ├── components/
│   ├── pages/
│   └── App.js, index.js
│
├── backend/               # Node.js + Express API
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── index.js

````

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/university-food-ordering.git
cd university-food-ordering
````

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/unifood
JWT_SECRET=your_jwt_secret
```

Start backend server:

```bash
npm run dev
```

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in `/frontend`:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Start frontend server:

```bash
npm start
```

---

## 📷 Screenshots

> Add actual screenshots or screen recordings here for better presentation.

---

## 📦 Example `.env` Files

**Backend `.env`**

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/unifood
JWT_SECRET=your_jwt_secret
```

**Frontend `.env`**

```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📑 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Your Name**
📧 [your.email@example.com](mailto:your.email@example.com)
🔗 [your-portfolio.com](https://your-portfolio.com)
🔗 [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)

---

## ⭐ Star this repo if you like it!

```

---

Would you like me to generate real preview images or GIFs from your UI for this README?
```

