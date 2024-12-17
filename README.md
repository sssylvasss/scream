# **Scream Room 🚀**

This is a **mono-repo** containing both the **frontend** and **backend** of the project. The project serves as a platform for users to post messages (screams), while ensuring authentication, moderation, and a clean user experience.

---

## 🚀 **Live Demo**
- **Frontend**: [https://screamroom.netlify.app](#)
- **Backend**: [https://screamroom.onrender.com/](#)

---

## 📋 **Project Overview**
This project explores full-stack web development concepts and includes:
- A **React** frontend for users to interact with.
- A **Node.js/Express** backend for authentication, data handling, and moderation.
- A **MongoDB Atlas** database to persist user accounts and screams.

### User Features:
- Sign up and sign in to access the app.
- Post messages (screams) with **content moderation**.
- View screams posted by others.
- Automatic logout functionality.
- Responsive and user-friendly UI.

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

### **Tools**
- **Render** (Backend deployment)
- **Netlify** (Frontend deployment)
- MongoDB Compass (local database exploration)

---

## 📂 **Project Structure**

```plaintext
final-project/
│
├── backend/        # Backend code
│   ├── server.js   # Main backend entry point
│   ├── models/     # Mongoose models (User, Scream)
│   ├── routes/     # API endpoint routes
│   ├── config/     # Configuration files
│   │   └── bannedWords.js # List of inappropriate words
│   ├── .env        # Environment variables
│
├── frontend/       # Frontend code
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # React pages
│   │   ├── context/      # Context API for auth
│   │   ├── style/        # Styled-components
│   │   └── utils/        # Helper functions
│   ├── public/           # Static assets
│   ├── index.html        # HTML entry point
│   └── vite.config.js    # Vite configuration
│
└── package.json    # Root-level scripts
```

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

---

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

Let me know if you want any further edits! 🚀