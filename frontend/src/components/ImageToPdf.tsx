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
                "http://localhost:3000/data",
                formData,
                {
                    responseType: "blob",
                }
            );

            console.log(response.data.size);
            console.log(await response.data.text?.());

            const blob = new Blob([response.data], {
                type: "application/pdf",
            });

            const url = URL.createObjectURL(blob);

            window.open(url, "_blank");

            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 10000);
        } catch (err) {
            console.error(err);
            setError("Failed to convert image to PDF");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
            <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl">
                <h1 className="text-3xl font-bold text-center mb-2">
                    Image to PDF Converter
                </h1>

                <p className="text-center text-slate-400 mb-8">
                    Upload a PNG or JPG image and download it instantly as PDF
                </p>

                <label className="border-2 border-dashed border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition">
                    <input
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        className="hidden"
                        onChange={handleChange}
                    />

                    {!file ? (
                        <>
                            <div className="text-5xl mb-3">🖼️</div>
                            <p className="font-medium">Click to select image</p>
                            <p className="text-sm text-slate-400 mt-1">
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
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-2xl py-4 font-semibold text-lg transition"
                >
                    {loading ? "Converting..." : "Convert & Download PDF"}
                </button>
            </div>
        </div>
    );
};

export default ImageToPdf;