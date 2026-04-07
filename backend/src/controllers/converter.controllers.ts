
import PDFDocument from "pdfkit";
import { upload } from "../utils/multer.js";
import type { Request, Response } from "express";


export const convertToPDF = [upload.single("image"), (req: Request, res: Response) => {
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
}];