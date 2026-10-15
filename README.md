# **Scream Room 🚀**

This is a **mono-repo** containing both the **frontend** and **backend** of the project. The project serves as a platform for users to post messages (screams), while ensuring authentication, moderation, and a clean user experience.

---

## 🚀 **Live Demo**
- **Frontend**: [https://screamroom.netlify.app](#)
- **Backend**: [https://screamroom.onrender.com/](#)

---

## 📋 **Project Overview**
This project is built to explore full-stack web development concepts and includes:
- A **React** frontend for users to interact with.
- A **Node.js/Express** backend to handle data storage and authentication.
- A **MongoDB Atlas** database to persist messages.

Users can:
- Sign up and sign in to access the app.
- Post messages (screams) with moderation filters for offensive content.
- View messages posted by others.
- Log out when done.

---

## 🛠️ **Technologies Used**

### **Frontend**
- React
- Vite (build tool)
- Styled-components
- React Router DOM

### **Backend**
- Node.js with Express
- MongoDB Atlas (Mongoose for data handling)
- Bcrypt.js (password hashing)
- JWT/Access tokens (for authentication)
- CORS middleware
- dotenv (for environment variables)
- socket.io (for real-time communication)

### **Tools**
- **Render** (Backend deployment)
- **Netlify** (Frontend deployment)
- MongoDB Compass (local database exploration)

---

## ⚙️ **Getting Started**

### 1. **Clone the Repository**
```bash
git clone https://github.com/your-username/your-repo-name.git
cd final-project
```

### 2. **Install Dependencies**
Run the following command in the root directory:
```bash
npm install
```

## 🚀 **Development Mode**

Run the following command to start both the **frontend** and **backend**:
```bash
npm run dev
```

- **Frontend**: Available at `http://localhost:3000`
- **Backend**: Available at `http://localhost:8080`

---

## 🧹 **Content Moderation**

1. **Backend**: The backend checks submitted text against the list of banned words.
2. **Frontend**: A lightweight check warns users before submitting inappropriate content for a better user experience.

---

## 🚢 **Production Deployment**

### Deploy Frontend
1. **Build the Project**:
   ```bash
   cd frontend
   npm run build
   ```
2. **Deploy to Netlify**:
   - Link the `frontend` folder to Netlify and use the build command:
     ```
     npm run build
     ```
   - Publish the `dist` folder.

### Deploy Backend
1. Push the backend code to **Render**.
2. Ensure environment variables (`MONGO_URL`, `PORT`) are set in Render’s settings.

---

## 🧪 **Features**
- User authentication (signup and login).
- Secure password storage using Bcrypt.js.
- Offensive content moderation.
- Responsive and dynamic UI.
- Persistent data storage with MongoDB Atlas.
- Real-time communication with socket.io.

---

## 📡 Real-time Communication with socket.io
This project uses socket.io for real-time communication. When a user posts a new scream, it is broadcasted to all connected clients in real-time.

## 🛠️ **Scripts**

### Install Dependencies
```bash
npm install
```

### Start Development Mode
```bash
npm run dev
```

### Start Production Mode
```bash
npm start
```

---

### **Enjoy screaming! 🔥**
