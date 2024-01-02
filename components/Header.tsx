import React from "react";
import NavbarAuth from "@/components/Auth/NavbarAuth";

const Header = () => {
  return (
    <header className="bg-white text-zinc-900 py-4 border-b">
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold">Flotta SE Jelenlét</div>
          <div className="space-x-4">
            <NavbarAuth />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
