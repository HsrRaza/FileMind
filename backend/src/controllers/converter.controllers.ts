
import PDFDocument from "pdfkit";
import { upload } from "../utils/multer.js";
import type { Request, Response } from "express";



export const convert =   async (req: Request, res: Response) => {

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded " })
    }


    console.log('Processing file:', req.file.originalname);



    const imageBuffer = req.file.buffer
    const doc = new PDFDocument({ autoFirstPage: false })


    // Collect PDF chunks
    const chunks: any = [];
    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(chunks);

      // Send PDF as download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${req.file?.originalname.replace(/\.[^/.]+$/, '')}.pdf"`);
      res.send(pdfBuffer);
    });

    // Add page with image
    doc.addPage();
    doc.image(imageBuffer, 0, 0, {
      fit: [500, 700],
      align: 'center',
      valign: 'center'
    });
    doc.end();

  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Failed to convert image to PDF' });
  }
}