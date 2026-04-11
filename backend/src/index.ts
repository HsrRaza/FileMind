
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()


const app = express();
const PORT = process.env.PORT

app.use(cors({
  origin: "http://localhost:5173",
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}))

import imagePdf from "./routes/convert.routes.js"
app.use("/api", imagePdf)



// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 Endpoint: http://localhost:${PORT}/api/data`);
});