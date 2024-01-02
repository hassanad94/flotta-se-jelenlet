import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <Image
        className="object-contain max-h-[60vh]"
        src="/qr.png"
        alt="QR Kód a bejelentkezéshez"
        width={500}
        height={500}
      />
    </div>
  );
};

export default Page;
