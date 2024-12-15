import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="w-24 h-10 relative shrink-0">
        <Image
          src="/logo.svg"
          fill
          className="shrink-0 hover:opacity-75 transition"
          alt="canvasly"
        />
      </div>
    </Link>
  );
};
