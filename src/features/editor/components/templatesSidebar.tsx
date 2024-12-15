import React from "react";

import { ActiveTool, Editor } from "@/features/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

import ToolSidebarHeader from "./toolSidebarHeader";
import ToolSidebarClose from "./toolSidebarClose";
import { AlertTriangle, Crown, Loader } from "lucide-react";
import Image from "next/image";
import {
  ResponseType,
  useGetTemplate,
} from "@/features/projects/api/useGetTemplate";
import { useConfirm } from "@/hooks/useConfirm";
import { usePaywall } from "@/features/subscriptions/hooks/usePaywall";

interface TemplatesSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}
const TemplatesSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: TemplatesSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };
  const { data, isLoading, isError } = useGetTemplate({
    page: "1",
    limit: "20",
  });
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Are you sure ?",
    message: "You are about to replace the current project with this template.",
  });
  const payWall = usePaywall();
  const handelLoadTemplate = async (template: ResponseType["data"][0]) => {
    if (template.isPremium && payWall.shouldBlock) {
      payWall.triggerPaywall();
      return;
    }
    const ok = await confirm();
    if (ok) {
      editor?.loadJson(template.json);
    }
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r w-[360px] z-[40] h-full flex flex-col",
        activeTool === "templates" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Templates"
        description="Add pre made templates to your canvas"
      />

      {isLoading && (
        <div className="flex items-center justify-center flex-1">
          <Loader className="size-4 text-muted-foreground animate-spin" />
        </div>
      )}
      {isError && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-muted-foreground text-xs">
            Failed to fetch templates
          </p>
        </div>
      )}
      <ScrollArea>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {data &&
              data.map((template) => {
                return (
                  <button
                    key={template.id}
                    style={{
                      aspectRatio: `${template.width}/${template.height}`,
                    }}
                    className="relative group hover:opacity-70 transition bg-muted rounded-sm overflow-hidden border"
                    onClick={() => handelLoadTemplate(template)}
                  >
                    {template.isPremium && (
                      <div className="absolute top-2 right-2 h-10 w-10 flex items-center justify-center bg-black/50 rounded-full z-10">
                        <Crown className="size-5 fill-yellow-500 text-yellow-500" />
                      </div>
                    )}
                    <Image
                      fill
                      src={template.thumbnailUrl || ""}
                      alt={template.name || "template random image"}
                      className="object-cover"
                    />
                    <div className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate text-white p-1 bg-black/50 text-left">
                      {template.name}
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
      <ConfirmDialog />
    </aside>
  );
};

export default TemplatesSidebar;
