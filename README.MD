# 🎓 University Food Ordering Platform

A full-featured food ordering system built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js), tailored for university campuses. It provides students and guests the ability to browse food items by category, place orders, simulate mobile payments, and track their order history in real-time.

---

## ✨ Features

- 🔐 **Secure Login & Registration** for Students and Guests
- 🍽️ **Food Categories**: Morning, Lunch, 24/7
- 🔎 **Search Functionality** for food items
- 🛒 **Cart System** with live stock tracking
- 💰 **Simulated Mobile Payments**
- 🧾 **PDF & QR Receipt Generation**
- 🚚 **Delivery Status** (Processing / Delivered)
- 📜 **Order History** View

---

## 🛠 Tech Stack

| Layer      | Tech Stack                             |
|------------|-----------------------------------------|
| Frontend   | React.js, Bootstrap 5, React Router DOM |
| Backend    | Node.js, Express.js                     |
| Database   | MongoDB (Mongoose ODM)                  |
| Auth       | JWT, bcryptjs                           |
| Utilities  | jsPDF, html2canvas, qrcode.react        |

---

## 🗂️ Project Structure

```

university-food-ordering/
├── backend/            # Express.js API
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── index.js
│
├── frontend/           # React.js application
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── index.js
│
└── README.md

```

---

## ⚙️ Environment Setup

### 📁 Backend `.env` Example

```

PORT=5000
MONGO\_URI=mongodb://localhost:27017/unifood
JWT\_SECRET=your\_jwt\_secret\_key

```

### 📁 Frontend `.env` Example

```

REACT\_APP\_API\_URL=[http://localhost:5000/api](http://localhost:5000/api)

````

---

## 🚀 Getting Started

### 🔧 Prerequisites
- Node.js (v18+)
- MongoDB installed locally (or use MongoDB Atlas)

### 🔁 Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
````

### 🌐 Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

---

## 📸 Sample Screenshots



> Replace these with your actual app screenshots

| Homepage                                               | Cart                                               | Orders                                                      |
| ------------------------------------------------------ | -------------------------------------------------- | ----------------------------------------------------------- |
|  | ![](https://via.placeholder.com/300x200?text=Cart) |      | 

---


---

## 🙋 Author

**Nadib Rana**
🔗 [Portfolio](https://nadib-rana.github.io/My-Portfolio-/)
🔗 [LinkedIn](https://www.linkedin.com/mynetwork/grow/)
📧 [codecrafersnadib@gmail.com](mailto:codecrafersnadib@gmail.com)

---

> ⭐ If you found this project useful, please give it a star on GitHub!

```

---

```
