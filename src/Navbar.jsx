import React, { useState } from "react";
import BottomMenu from "./Menu";
// Import komponen BottomMenu

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full flex justify-between h-14 bg-slate-400 items-center px-5 fixed top-0 shadow-lg">
      <div className="items-center">
        <img
          className="h-9"
          src="social-media-branding-advertising-promotion-svgrepo-com.svg"
          alt=""
        />
      </div>
      <div className="items-center w-full px-8 sm:px-64 max-w-[1200px]">
        <input
          className="p-1 border rounded-md w-full px-3 py-2"
          type="search"
          name=""
          id=""
          placeholder="Cari Cerita..."
        />
      </div>
      <div>
        <button onClick={handleMenuToggle}>
          <img
            className="h-9 pt-1"
            src="hamburger-menu-svgrepo-com.svg"
            alt=""
          />
        </button>
      </div>

      {/* Menampilkan BottomMenu jika isMenuOpen bernilai true */}
      {isMenuOpen && (
        <BottomMenu isOpen={isMenuOpen} onClose={handleMenuToggle} />
      )}
    </div>
  );
};
