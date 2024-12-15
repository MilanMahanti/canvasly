import React from "react";

import { ActiveTool, Editor } from "@/features/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

import ToolSidebarHeader from "./toolSidebarHeader";
import ToolSidebarClose from "./toolSidebarClose";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Image from "next/image";
import { useRemoveBackground } from "@/features/ai/api/useRemoveBackground";
import { usePaywall } from "@/features/subscriptions/hooks/usePaywall";
import ButtonLoader from "@/components/buttonLoader";

interface RemoveBackgroundSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}
const RemoveBackgroundSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: RemoveBackgroundSidebarProps) => {
  const selectedObject = editor?.selectedObjects[0];

  //@ts-ignore
  const image = selectedObject?._originalElement?.currentSrc;

  const payWall = usePaywall();

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const mutation = useRemoveBackground();

  const removeBackground = () => {
    if (!image) return;
    if (payWall.shouldBlock) {
      payWall.triggerPaywall();
      return;
    }
    mutation.mutate(
      { image },
      {
        onSuccess: (data) => {
          if (data && "data" in data) {
            //@ts-ignore
            const newImg = data.data[0][0].url;
            editor?.addImage(newImg);
          }
        },
      }
    );
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r w-[360px] z-[40] h-full flex flex-col",
        activeTool === "remove-bg" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Remove background"
        description="Remove background from image using AI"
      />
      {!image && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-muted-foreground text-xs">
            Feature not available for this object
          </p>
        </div>
      )}
      {image && (
        <ScrollArea>
          <div className="p-4 space-y-4">
            <div
              className={cn(
                "relative aspect-square rounded-md transition bg-muted overflow-hidden",
                mutation.isPending && "opacity-50"
              )}
            >
              <Image
                src={image}
                alt="background remove"
                fill
                className="object-cover"
              />
            </div>
            <Button
              className="w-full bg-[#445ce9] hover:bg-[#445ce9]/80"
              disabled={mutation.isPending}
              onClick={removeBackground}
            >
              <ButtonLoader
                label="Remove Background"
                isLoading={mutation.isPending}
              />
            </Button>
          </div>
        </ScrollArea>
      )}
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default RemoveBackgroundSidebar;
