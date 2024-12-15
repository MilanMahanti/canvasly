import Image from "next/image";
import Link from "next/link";
import React from "react";

const logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition h-[60px] px-4">
        <div className="h-full w-24 relative">
          <Image src="/logo.svg" fill alt="canvasly" />
        </div>
      </div>
    </Link>
  );
};

export default logo;
