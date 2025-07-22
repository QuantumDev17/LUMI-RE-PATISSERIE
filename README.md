Lumiere Patisserie

Overview

This project is a full-stack web application for managing a bakery's products and orders. It includes:

Frontend: Built with React and Vite.

Backend: Powered by Node.js, Express, and MongoDB.

Authentication: Secured with JWT (JSON Web Tokens).

The system allows users to view products, place orders, and for admins to manage products and view all orders.

🔧 Installation & Setup

1. Backend Setup

📁 Navigate to the backend folder:
cd backend

📦 Install dependencies:
npm install

🔐 Create a .env file and add:

PORT=3000
MONGODB_URI=mongodb+srv://quantumdev:devuser123@cluster0.jck1pyv.mongodb.net/LumierePatisserie?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=83fafd0e87c34cf7b8e90951a2a40c3460b9a057d2fd7386c6eae2f876b6b5d1

▶️ Run the backend server:
node src/server.js

You should see:

📅 MongoDB connected successfully  
📅 Server is running on PORT: 3000

2. Frontend Setup

📁 Navigate to the frontend folder:
cd frontend

📦 Install frontend dependencies:
npm install

▶️ Run the development server:
npm run dev

Visit: http://localhost:5173

Make sure your frontend API requests point to: http://localhost:3000

📊 API Testing (Postman)

📝 Authentication

Register – POST /api/auth/register
Login – POST /api/auth/login
Returns a token (store and use it for future requests)
Protected Routes – Send token in headers:
Authorization: Bearer <your_token>

🍞 Product Routes

GET /api/products – List all products
POST /api/products – Create new product (requires admin token)
PUT /api/products/:id – Update a product (admin)
DELETE /api/products/:id – Delete a product (admin)

📦 Order Routes

POST /api/orders – Place an order (requires login)
GET /api/orders – View all orders (admin only)
GET /api/orders/user/:userId – View orders for a specific user

🚪 Logout

There is no logout endpoint. To "logout", simply delete the token from local storage or remove it from the Postman headers.

✅ Dependencies Installed

Backend:
express
mongoose
cors
dotenv
jsonwebtoken
bcryptjs
Frontend:
react
axios
react-router-dom

📌 Notes

Make sure MongoDB Atlas is properly connected.
Use valid JWT tokens for protected endpoints.
Only users with "role": "admin" can access product/order management routes.