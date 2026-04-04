import express from 'express';
import multer from 'multer';
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


const upload = multer({ dest: 'uploads/' });

app.post('/data',upload.single('file'), (req, res) => {
  // Handle POST request to /data

console.log(req.file);


  
  res.send('Image uploaded successfully!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});