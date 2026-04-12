
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()


const app = express();
const PORT = process.env.PORT

app.use(cors({
  origin: process.env.FRONTEND_URL || "https://filemind-e3n6.onrender.com "|| "http://localhost:5173" ,
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}))

import imagePdf from "./routes/convert.routes.js"
app.use("/api", imagePdf)



// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});