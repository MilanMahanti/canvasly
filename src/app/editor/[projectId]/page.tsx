"use client";

import { Button } from "@/components/ui/button";
import Editor from "@/features/editor/components/editor";
import { useGetProject } from "@/features/projects/api/useGetProject";
import { Loader, TriangleAlert } from "lucide-react";
import Link from "next/link";

import React from "react";

interface ProjectPageProps {
  params: {
    projectId: string;
  };
}

const ProjectPage = ({ params }: ProjectPageProps) => {
  const { data, isLoading, isError } = useGetProject(params.projectId);

  if (isLoading || !data)
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  if (isError)
    return (
      <div className="h-full flex flex-col items-center justify-center gap-y-5">
        <TriangleAlert className="size-6  text-muted-foreground" />
        <p className="text-muted-foreground text-sm">Failed to fetch project</p>
        <Button asChild variant="secondary">
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    );
  return <Editor initialData={data} />;
};

export default ProjectPage;
