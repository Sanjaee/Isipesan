import React, { useState } from "react";
import axios from "axios";
import Cards from "./Cards";

export const ListCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    judul: "",
    thumbnil: "",
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
      uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      // Ganti 'API_KEY' dengan kunci API ImgBB Anda
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=c4a04248b018788690422b5d9863e9d9",
        formData
      );

      if (response.data && response.data.data) {
        const imageUrl = response.data.data.url;
        setFormData((prevData) => ({ ...prevData, thumbnil: imageUrl }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
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

  return (
    <div className="bg-slate-100 flex flex-col items-center  mt-14 px-5">
      <div className=" mt-10 w-full px-20 sm:px-60 max-w-[1200px]">
        <button
          className="h-11 border shadow-2xl font-bold border-white rounded-md w-full bg-white text-gray-500 hover:bg-gray-500 hover:text-white "
          onClick={handlePopupToggle}
        >
          Buat Cerita...
        </button>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 opacity-50" />
          <div className="z-10 bg-white p-6 rounded-lg shadow-md relative">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
              onClick={handlePopupToggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
                Upload Gambar:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
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
