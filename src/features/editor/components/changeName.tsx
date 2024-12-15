"use client";

import { useGetProject } from "@/features/projects/api/useGetProject";
import { useUpdateProject } from "@/features/projects/api/useUpdateProject";
import { Pencil } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const ChangeName = ({ id }: { id: string }) => {
  const { data } = useGetProject(id);
  const projectName = data?.name;
  const updateProjectMutation = useUpdateProject(id);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(projectName || "Untitled project");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      try {
        if (value !== projectName) {
          updateProjectMutation.mutate(
            {
              name: value,
            },
            {
              onSuccess: () => {
                setIsEditing(false);
              },
            }
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        updateProjectMutation.mutate(
          {
            name: value,
          },
          {
            onSuccess: () => {
              setIsEditing(false);
            },
          }
        );
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="flex gap-x-2 items-center" ref={containerRef}>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={updateTitleHandler}
          disabled={updateProjectMutation.isPending}
          className="p-1 rounded-sm"
        />
      ) : (
        <p className="text-lg underline font-medium line-clamp-1">{value}</p>
      )}{" "}
      <Pencil
        className="ml-2 size-4 cursor-pointer"
        onClick={() => setIsEditing(true)}
      />
    </div>
  );
};

export default ChangeName;
