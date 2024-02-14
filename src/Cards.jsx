import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const Cards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://isi-pesan-backend.vercel.app/pesan"
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk mengonversi waktu menjadi format "04-05-2024 Kamis 12:22"
  const formatWaktu = (timestamp) => {
    const formattedDate = format(new Date(timestamp), "dd-MM-yyyy");
    return formattedDate;
  };

  return (
    <div className="flex flex-wrap justify-center mt-12 gap-3">
      {data.map((item) => (
        <div
          key={item.id}
          className="shadow-md w-full sm:max-w-[310px] bg-white p-3 mb-4 rounded-xl "
        >
          <div className="flex items-center">
            <p className="font-bold">{item.penulis}</p>
            <p className="text-gray-500 ml-2">{formatWaktu(item.waktu)}</p>
          </div>
          <div className="mt-3 flex items-center justify-center bg-slate-300 rounded-md">
            <img className="rounded-md" src={item.thumbnil} alt={item.judul} />
          </div>
          <div className="mt-3">
            <h3>{item.isiCerita}</h3>
          </div>
          <div className="flex items-center mt-3 border-t">
            <button className="mt-3">
              <img className="h-5" src="love-svgrepo-com.svg" alt="" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
