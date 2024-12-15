import { Loader } from "lucide-react";
import React from "react";

interface ButtonLoaderProps {
  label: string;
  isLoading: boolean;
}

const ButtonLoader = ({ label, isLoading }: ButtonLoaderProps) => {
  return (
    <>
      {isLoading ? <Loader className="size-3 animate-spin" /> : <p>{label}</p>}
    </>
  );
};

export default ButtonLoader;
