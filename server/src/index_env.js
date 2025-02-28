// require('dotenv').config(path:'../env);
// import 'dotenv/config'
import dotenv from 'dotenv'

dotenv.config({
    path:'../env'
})

export  const env_file={
    PORT:process.env.PORT,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    MONGO_DB_URI:process.env.MONGO_DB_CONNECTION_STRING,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY:process.env.ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY:process.env.REFRESH_TOKEN_EXPIRY,
    CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET,
    CORS_ORIGIN:process.env.CORS_ORIGIN,
    CLOUDINARY_URL:process.env.CLOUDINARY_URL,
}









// backend/
// │── node_modules/
// │── src/
// │   │── controllers/     # Functions for handling requests
// │   │── models/          # Mongoose Schemas
// │   │── routes/          # Express routes
// │   │── middleware/      # Auth, validation middleware
// │   │── config/          # Database connection
// │   │── index.js         # Entry point
// │── .env                 # Environment variables
// │── package.json         # Dependencies & scripts
// │── README.md