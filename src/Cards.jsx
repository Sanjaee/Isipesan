import React, { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div className="flex flex-col items-center ">
      {data.map((item) => (
        <div
          key={item.id}
          className="shadow-2xl w-4/5 bg-white p-3 mt-9 rounded-xl"
        >
          <div className="flex items-center">
            <p className="font-bold">{item.penulis}</p>
            <p className="text-gray-500 ml-2 text-sm">15-06-2022</p>
          </div>
          <div className="mt-3 flex items-center justify-center bg-slate-300 rounded-md">
            <img className="rounded-md " src={item.thumbnil} alt={item.judul} />
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
