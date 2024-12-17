
# Final Project 🚀

This is a **mono-repo** containing both the **frontend** and **backend** of the project. The project serves as a platform for users to post messages (screams), while ensuring authentication, moderation, and a clean user experience.

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
- Vite (for development/build)
- Styled-components
- React Router DOM

### **Backend**
- Node.js with Express
- MongoDB Atlas (with Mongoose ORM)
- Bcrypt.js for password hashing
- JWT/Access tokens for authentication
- CORS middleware

### **Tools**
- Render (Backend deployment)
- Netlify (Frontend deployment)
- MongoDB Compass (local database exploration)

---

## 📂 **Project Structure**
The project follows a mono-repo setup:

```plaintext
final-project/
│
├── backend/        # Backend code
│   ├── server.js   # Main backend entry point
│   ├── models/     # MongoDB models for User and Scream
│   ├── routes/     # Routes for API endpoints
│   └── .env        # Environment variables
│
├── frontend/       # Frontend code
│   ├── src/        # React components, pages, and styles
│   ├── public/     # Static assets
│   ├── index.html  # HTML entry point
│   └── vite.config.js # Vite configuration
│
└── package.json    # Root scripts to manage both frontend and backend
```

---

## 🚀 **Live Demo**
- Frontend: [Your Live Frontend Link Here](#)
- Backend: [Your Render Backend Link Here](#)

---

## ⚙️ **Getting Started**

### 1. **Clone the Repository**
```bash
git clone https://github.com/your-username/your-repo-name.git
cd final-project
```

### 2. **Install Dependencies**
Run the following command in the root directory to install dependencies for both the `frontend` and `backend`:
```bash
npm install
```

### 3. **Environment Setup**
Create a `.env` file in the `backend/` directory and add the following:
```bash
MONGO_URL=<Your MongoDB Atlas URL>
PORT=8080
```

---

## 🚀 **Development Mode**

### Start Both Frontend and Backend
The following command starts both the **frontend** and **backend**:
```bash
npm run dev
```
- **Frontend**: Available at `http://localhost:3000`.
- **Backend**: Available at `http://localhost:8080`.

---

## 🚢 **Production Mode**

To build and run the project in production:
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Start the backend and serve the frontend:
   ```bash
   npm start
   ```

---

## 🧪 **Features**
- User authentication with secure password hashing.
- Posting messages with offensive content moderation.
- Real-time validation for user input.
- Responsive UI design.
- Persistent data storage in MongoDB Atlas.

---

## 🚧 **Future Improvements**
If more time was available, I would:
- Add real-time messaging using WebSockets.
- Implement user profiles and likes/comments.
- Improve content moderation using advanced techniques.
- Add testing (Jest/React Testing Library for frontend, Mocha for backend).

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
