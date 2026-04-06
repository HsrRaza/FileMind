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


const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, and GIF files are allowed"));
    }
  },
});




app.post("/data", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No image uploaded",
    });
  }

  const originalName = req.file.originalname.replace(/\.[^/.]+$/, "");
  const pdfName = `${originalName}.pdf`;

  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${pdfName}"`
  );

  doc.pipe(res);

  doc.image(req.file.buffer, {
    fit: [500, 650],
    align: "center",
    valign: "center",
  });

  doc.end();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});