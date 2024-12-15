"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useGetUserProjects } from "@/features/projects/api/useGetUserProjects";
import {
  AlertTriangle,
  CopyIcon,
  FileIcon,
  Loader,
  MoreHorizontal,
  Search,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDuplicateProject } from "@/features/projects/api/useDuplicateProject";
import { useDeleteProject } from "@/features/projects/api/useDeleteProject";
import { useConfirm } from "@/hooks/useConfirm";

const ProjectsSection = () => {
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Are you sure?",
    message: "You are about to delete this project",
    buttonVariant: "destructive",
  });
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetUserProjects();

  const duplicateMutation = useDuplicateProject();
  const deleteMutation = useDeleteProject();

  const onDelete = async (id: string) => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate({ id });
    }
  };

  const onCopy = (id: string) => {
    duplicateMutation.mutate({ id });
  };

  if (status === "pending") {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Recent Projects</h3>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <Loader className="size-6 text-muted-foreground animate-spin" />
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Recent Projects</h3>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <AlertTriangle className="size-6 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            Failed to load your projects
          </p>
        </div>
      </div>
    );
  }

  if (!data.pages.length || !data.pages[0].data.length) {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Recent Projects</h3>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <Search className="size-6 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">No projects found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Recent Projects</h3>
      <Table>
        <TableBody>
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((project) => (
                <TableRow key={project.id}>
                  <TableCell
                    className="font-medium flex items-center gap-x-2 cursor-pointer"
                    onClick={() => router.push(`/editor/${project.id}`)}
                  >
                    <FileIcon className="size-6" />
                    {project.name}
                  </TableCell>
                  <TableCell
                    className="hidden md:table-cell cursor-pointer"
                    onClick={() => router.push(`/editor/${project.id}`)}
                  >
                    {project.width} x {project.height} px
                  </TableCell>
                  <TableCell
                    className="hidden md:table-cell cursor-pointer"
                    onClick={() => router.push(`/editor/${project.id}`)}
                  >
                    {formatDistanceToNow(project.updatedAt, {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="flex items-center justify-end">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" disabled={false}>
                          <MoreHorizontal className="size-4 " />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-60">
                        <DropdownMenuItem
                          className="h-10 cursor-pointer"
                          disabled={duplicateMutation.isPending}
                          onClick={() => onCopy(project.id)}
                        >
                          <CopyIcon className="mr-2 size-4" />
                          Make a copy
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-10 cursor-pointer text-red-500 hover:text-red-500/80"
                          disabled={deleteMutation.isPending}
                          onClick={() => onDelete(project.id)}
                        >
                          <Trash className="mr-2 size-4 text-red-500" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      {hasNextPage && (
        <div className="w-full flex items-center justify-center pt-4">
          <Button
            variant="ghost"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            Load more
          </Button>
        </div>
      )}
      <ConfirmDialog />
    </div>
  );
};

export default ProjectsSection;
