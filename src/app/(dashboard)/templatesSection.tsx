"use client";

import {
  ResponseType,
  useGetTemplate,
} from "@/features/projects/api/useGetTemplate";
import { Loader, TriangleAlert } from "lucide-react";
import React from "react";
import TemplateCard from "./templateCard";
import { useRouter } from "next/navigation";
import { useCreateProject } from "@/features/projects/api/useCreateProject";
import { usePaywall } from "@/features/subscriptions/hooks/usePaywall";

const TemplatesSection = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetTemplate({
    page: "1",
    limit: "4",
  });

  const createProjectMutation = useCreateProject();
  const payWall = usePaywall();

  const handelTemplateClick = (template: ResponseType["data"][0]) => {
    if (template.isPremium && payWall.shouldBlock) {
      payWall.triggerPaywall();
      return;
    }

    createProjectMutation.mutate(
      {
        name: `${template.name} project`,
        json: template.json,
        width: template.width,
        height: template.height,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Start from a template</h3>
        <div className="flex items-center justify-center h-32">
          <Loader className="size-6 text-muted-foreground animate-spin" />
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Start from a template</h3>
        <div className="flex flex-col items-center justify-center h-32 gap-y-4">
          <TriangleAlert className="size-6 text-muted-foreground" />

          <p>Failed to load templates</p>
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return null;
  }

  return (
    <div>
      <h3 className="font-semibold text-lg">Start from a template</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 mt-4 gap-4">
        {data.map((template) => {
          return (
            <TemplateCard
              key={template.id}
              imageSrc={template.thumbnailUrl || ""}
              title={template.name}
              width={template.width}
              height={template.height}
              onClick={() => handelTemplateClick(template)}
              description={`${template.width} x ${template.height} px`}
              isPremium={template.isPremium}
              disabled={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TemplatesSection;
