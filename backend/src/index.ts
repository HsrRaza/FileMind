import express from 'express';
import cors from 'cors';
import multer from 'multer';
import PDFDocument from "pdfkit";
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to match your frontend's URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));




app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});