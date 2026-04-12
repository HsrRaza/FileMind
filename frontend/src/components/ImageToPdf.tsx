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
        import.meta.env.VITE_API_URL,
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
    <div className="h-[70vh] bg-cream flex items-center justify-center p-6">
      <div className="w-full   max-w-2xl rounded-2xl bg-cream-dark border border-rose p-8 shadow-md">
        <h1 className="text-2xl font-bold text-center mb-2 text-rose-dark">
          Image to PDF Converter
        </h1>

        <p className="text-center text-sm text-rose-dark/70 mb-6">
          Upload a PNG or JPG image and download it instantly as PDF
        </p>

        <label className="border-2 border-dashed border-rose rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-rose-dark hover:bg-cream transition">
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            className="hidden"
            onChange={handleChange}
          />

          {!file ? (
            <>
              <div className="text-3xl mb-3">🖼️</div>
              <p className="font-sm text-gray-700">Click to select image</p>
              <p className="text-sm text-gray-500 mt-1">
                PNG or JPG • Max 5 MB
              </p>
            </>
          ) : (
            <>
              <img
                src={previewUrl}
                alt="preview"
                className="max-h-72 rounded-xl mb-4 shadow-md"
              />
              <p className="font-medium text-gray-800">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </>
          )}
        </label>

        {error && (
          <div className="mt-4 bg-rose/10 border border-rose rounded-xl p-3 text-rose-dark">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!file || loading}
          className="text-white w-full mt-6 bg-rose-dark hover:bg-rose disabled:bg-rose-dark/50 disabled:cursor-not-allowed rounded-2xl py-4 font-semibold text-md transition-all duration-300"
        >
          {loading ? "Converting..." : "Convert & Download PDF"}
        </button>
      </div>
    </div>
  );
};

export default ImageToPdf;