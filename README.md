# 🖼️ Image to PDF Converter

A modern web application that converts PNG and JPG images to PDF files instantly. Built with React, TypeScript, Node.js, and Express.

## ✨ Features

- 📸 Convert PNG and JPG images to PDF
- 🎨 Beautiful UI with custom cream/rose color theme
- 📱 Fully responsive design
- ⚡ Fast conversion with real-time preview
- 🔒 Secure file handling (no permanent storage)
- 🎯 Centered images in PDF output
- 💫 Smooth loading states and error handling

## 🚀 Demo

[Live Demo](https://file-mind-nu.vercel.app/) 

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Build tool
- **Axios** - HTTP requests
- **Tailwind CSS** - Styling
- **React Router DOM** - Navigation

### Backend
- **Node.js** with Express
- **TypeScript**
- **Multer** - File upload handling
- **PDFKit** - PDF generation
- **Sharp** - Image processing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure
fileMind/
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── ImageToPdf.tsx
│ │ │ ├── Navbar.tsx
│ │ │ └── Footer.tsx
│ │ ├── Layout.tsx
│ │ ├── App.tsx
│ │ ├── main.tsx
│ │ └── index.css
│ ├── .env
│ ├── package.json
│ ├── vite.config.ts
│ └── index.html
├── backend/
│ ├── src/
│ │ ├── index.ts
│ │ ├── routes/
│ │ └── controllers/
│ ├── dist/
│ ├── .env
│ ├── package.json
│ ├── tsconfig.json
│ └── nodemon.json
└── README.md


## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Git

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/fileMind.git
cd fileMind

cd backend
npm install
