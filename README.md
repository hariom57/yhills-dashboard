CDC X Yhills - E-commerce Admin Dashboard
Project Overview
A fully functional, Server-Side Rendered (SSR) administrative dashboard for e-commerce product management. Built with Next.js 14, MongoDB, and Cloudinary.

Features
Server-Side Rendering (SSR): Optimized for SEO and performance using Next.js Server Components.
Authentication: Secure login system with Role-Based Access Control (Super Admin vs. Editor).
Product Management: Full CRUD operations (Create, Read, Update, Delete).
Multi-Step Forms: Wizard-style product creation with Zod validation.
Data Visualization: Interactive sales charts using Recharts.
Image Handling: Secure image uploads to Cloudinary.
Admin Onboarding: Hidden settings section visible only to Super Admins.
Tech Stack
Frontend/Backend: Next.js 14 (App Router)
Database: MongoDB (Mongoose)
Data Fetching: SWR (Client) + Server Components
Validation: Zod
Charts: Recharts
Cloud Storage: Cloudinary
Setup Instructions
Clone the repository
git clone <your-repo-url>cd yhills-dashboard
Install Dependencies
bash

npm install
Environment Variables
Create a .env.local file in the root directory:
env

MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/yhills_db?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Run Development Server
bash

npm run dev
Open http://localhost:3000.
Admin Credentials
Super Admin: admin@yhills.com / admin123
Editor: editor@yhills.com / editor123
Demo Video
A 3-minute demonstration of the workflow can be found at: [Link to Video]