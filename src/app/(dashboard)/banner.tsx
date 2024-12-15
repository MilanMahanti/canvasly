"use client";

import ButtonLoader from "@/components/buttonLoader";
import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/features/projects/api/useCreateProject";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Banner = () => {
  const mutation = useCreateProject();
  const router = useRouter();
  const onClick = () => {
    mutation.mutate(
      {
        name: "Untitled Project",
        json: "",
        width: 900,
        height: 1200,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };

  return (
    <div className="acpect-[5/1] min-h-[248px] flex gap-x-6 p-6 items-center rounded-xl bg-gradient-to-br from-[#01c3cc] via-[#445ce9] to-[#7d2ae7]">
      <div className="rounded-full size-28 hidden md:flex items-center justify-center bg-white/50 ">
        <div className="rounded-full size-20  items-center justify-center bg-white flex">
          <Sparkles className="h-20 text text-[#445ce9] fill-[#445ce9]" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 text-white">
        <h1 className="md:text-3xl text-xl font-semibold">
          Bring your ideas to life with Canvasly
        </h1>
        <p className="md:text-sm text-xs mb-2">
          Turn inspiration into design in no time with the help of AI.
        </p>
        <Button
          variant="secondary"
          className="w-[160px] "
          disabled={mutation.isPending}
          onClick={onClick}
        >
          <ButtonLoader label="Start Creating" isLoading={mutation.isPending} />
          <ArrowRight className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Banner;
