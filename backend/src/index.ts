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


const upload = multer({ dest: 'uploads/' });

app.post('/data', upload.single('image'), (req, res) => {

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {


    if (!fs.existsSync('src/output')) {
      fs.mkdirSync('src/output' );
    }

    const doc = new PDFDocument();

    const stream = fs.createWriteStream(`src/output/${Date.now()}.pdf`);
    doc.pipe(stream);


    doc.image(req.file.path, {
      fit: [500, 400],
      align: 'center',
      valign: 'center'
    });
    doc.end();

    stream.on("finish", () => {
      return res.status(200).json({
        message: "PDF created successfully",
        file: stream.path
      })

    })

    stream.on("error", (err) => {
      return res.status(500).json({
        success: false,
        message: "Error creating PDF",
        error: err.message
      })
    })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating PDF",
    });


  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});