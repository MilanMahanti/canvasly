import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";
import Image from "next/image";
import React from "react";

interface TemplateCardProps {
  imageSrc: string;
  title: string;
  onClick: () => void;
  disabled?: boolean;
  description: string;
  width: number;
  height: number;
  isPremium: boolean | null;
}

const TemplateCard = ({
  imageSrc,
  title,
  onClick,
  description,
  disabled,
  width,
  height,
  isPremium,
}: TemplateCardProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "space-y-2 group text-left transition flex flex-col ",
        disabled ? "cursor-not-allowed opacity-75" : "cursor-pointer"
      )}
    >
      <div
        style={{
          aspectRatio: `${width} / ${height}`,
        }}
        className="relative rounded-xl  h-full w-full overflow-hidden border"
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition transform group-hover:scale-105"
        />
        {isPremium && (
          <div className="absolute top-2 right-2 h-10 w-10 flex items-center justify-center bg-black/50 rounded-full z-10">
            <Crown className="size-5 fill-yellow-400 text-yellow-400" />
          </div>
        )}
        <div className="opacity-0 group-hover:opacity-100 transition absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl backdrop-filter backdrop-blur-sm">
          <p className="text-white font-medium">Open in editor</p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-75">
          {description}
        </p>
      </div>
    </button>
  );
};

export default TemplateCard;
