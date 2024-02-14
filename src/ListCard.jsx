import React, { useState } from "react";
import axios from "axios";
import Cards from "./Cards";

export const ListCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    judul: "",
    thumbnil: "https://www.petanikode.com/img/cover/unity-mac.png",
    penulis: "",
    isiCerita: "",
  });

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, thumbnil: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post("https://isi-pesan-backend.vercel.app/pesan", formData);
      handlePopupToggle(); // Tutup popup setelah berhasil menyimpan
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      judul: "",
      thumbnil: "https://www.petanikode.com/img/cover/unity-mac.png",
      penulis: "",
      isiCerita: "",
    });
    handlePopupToggle(); // Tutup popup saat dibatalkan
  };

  return (
    <div className="bg-slate-100 flex flex-col items-center h-[3500px] mt-14 ">
      <div className=" mt-7 w-full px-20 sm:px-60">
        <button
          className="h-11 border shadow-2xl border-white rounded-md w-full bg-white text-gray-500"
          onClick={handlePopupToggle}
        >
          Buat Cerita...
        </button>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="z-10 bg-white p-6 rounded-lg shadow-md relative">
            <button
              className="absolute top-2 right-2 text-gray-700"
              onClick={handleCancel}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Judul:
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                placeholder="Masukkan Judul"
                name="judul"
                value={formData.judul}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Penulis:
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                placeholder="Masukkan Penulis"
                name="penulis"
                value={formData.penulis}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Isi Cerita:
              </label>
              <textarea
                className="border rounded w-full py-2 px-3"
                placeholder="Masukkan Isi Cerita"
                name="isiCerita"
                value={formData.isiCerita}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Gambar (URL):
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                placeholder="Masukkan URL Gambar"
                name="thumbnil"
                value={formData.thumbnil}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Gambar:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 "
              onClick={handleSave}
            >
              Post
            </button>
          </div>
        </div>
      )}

      <Cards />
    </div>
  );
};
