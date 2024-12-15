import React, { useState } from "react";

import { ActiveTool, Editor } from "@/features/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

import ToolSidebarHeader from "./toolSidebarHeader";
import ToolSidebarClose from "./toolSidebarClose";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGenerateImage } from "@/features/ai/api/useGenerateImage";
import { usePaywall } from "@/features/subscriptions/hooks/usePaywall";
import ButtonLoader from "@/components/buttonLoader";
import { toast } from "sonner";

interface AiSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}
const AiSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: AiSidebarProps) => {
  const [value, setValue] = useState("");
  const payWall = usePaywall();
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const mutation = useGenerateImage();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (payWall.shouldBlock) {
      payWall.triggerPaywall();
      return;
    }
    mutation.mutate(
      { prompt: value },
      {
        onSuccess: (response) => {
          if (response && "data" in response) {
            setValue("");
            editor?.addImage(response.data);
          }
        },
      }
    );
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r w-[360px] z-[40] h-full flex flex-col",
        activeTool === "ai" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="AI"
        description="Ask AI ✨ to generate images for you"
      />
      <ScrollArea>
        <form className="p-4 space-y-6" onSubmit={onSubmit}>
          <Textarea
            placeholder="Cat wearing a tuxido"
            cols={30}
            rows={10}
            required
            disabled={mutation.isPending}
            minLength={3}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            type="submit"
            className="w-full bg-[#445ce9] hover:bg-[#445ce9]/80"
            disabled={mutation.isPending}
          >
            <ButtonLoader
              label="Generate Image"
              isLoading={mutation.isPending}
            />
          </Button>
        </form>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default AiSidebar;
