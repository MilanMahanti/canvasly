import React from "react";

import { ActiveTool, Editor, FONT_FAMILY, fonts } from "@/features/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

import ToolSidebarHeader from "./toolSidebarHeader";
import ToolSidebarClose from "./toolSidebarClose";
import { Button } from "@/components/ui/button";

interface FontSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}
const FontSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FontSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };
  const activeFontFamily = editor?.getActiveFontFamily() || FONT_FAMILY;
  return (
    <aside
      className={cn(
        "bg-white relative border-r w-[360px] z-[40] h-full flex flex-col",
        activeTool === "font" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Font"
        description="change font family of your text"
      />
      <ScrollArea>
        <div className="p-4 space-y-1 border-b">
          {fonts.map((font) => (
            <Button
              key={font}
              variant="secondary"
              size="lg"
              className={cn(
                "w-full h-16 justify-start text left",
                activeFontFamily === font && "border-2 border-blue-500"
              )}
              style={{
                fontFamily: font,
                fontSize: "16px",
                padding: "8px 16px",
              }}
              onClick={() => editor?.changeFontFamily(font)}
            >
              {font}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default FontSidebar;
