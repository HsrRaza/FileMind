
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()


const app = express();
const PORT = process.env.PORT

const allowedOrigins = ["https://file-mind-mu.vercel.app", "http://localhost:5173"]
app.use(cors({
  origin: allowedOrigins,
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}))

import imagePdf from "./src/routes/convert.routes.js"
app.use("/api", imagePdf)



// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 Endpoint: http://localhost:${PORT}/api/data`);
});