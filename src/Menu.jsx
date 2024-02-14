import React, { useState } from "react";

const BottomMenu = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg  p-4 transition-transform duration-1000 transform ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex justify-end">
        <button onClick={onClose}>
          <img
            className="h-8"
            src="close-ellipse-svgrepo-com.svg"
            alt="Close"
          />
        </button>
      </div>
      {/* Isi menu atau komponen lainnya */}
      <div className="p-2">
        <p>Butuh Bantuan ?</p>
      </div>
    </div>
  );
};

export default BottomMenu;
