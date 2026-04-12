import React, { useMemo, useState } from "react";
import axios from "axios";

const ImageToPdf = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const previewUrl = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");

    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!["image/png", "image/jpeg"].includes(selected.type)) {
      setError("Only PNG and JPG images are allowed");
      return;
    }

    setFile(selected);
  };

  const handleSubmit = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "http://localhost:3000/api/data",
        formData,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      const originalName = file.name.replace(/\.[^/.]+$/, "");
      link.download = `${originalName}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError("Failed to convert image to PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream  flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-3xl bg-cream-dark border border-rose p-8 shadow-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-rose-dark">
          Image to PDF Converter
        </h1>

        <p className="text-center text-slate-400 mb-8 text-rose-dark">
          Upload a PNG or JPG image and download it instantly as PDF
        </p>

        <label className="border-2 border-dashed border-rose rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-rose-dark hover:bg-cream-dark transition">
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            className="hidden"
            onChange={handleChange}
          />

          {!file ? (
            <>
              <div className="text-5xl mb-3">🖼️</div>
              <p className="font-medium text-gray-900">Click to select image</p>
              <p className="text-sm text-grap-600 mt-1">
                PNG or JPG • Max 5 MB
              </p>
            </>
          ) : (
            <>
              <img
                src={previewUrl}
                alt="preview"
                className="max-h-72 rounded-xl mb-4"
              />

              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-slate-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </>
          )}
        </label>

        {error && (
          <div className="mt-4 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl p-3">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!file || loading}
          className="text-white w-full mt-6 bg-rose-dark bg-rose disabled:bg-rose-dark/50 disabled:cursor-not-allowed rounded-2xl py-4 font-semibold text-lg transition"
        >
          {loading ? "Converting..." : "Convert & Download PDF"}
        </button>
      </div>
    </div>
  );
};

export default ImageToPdf;