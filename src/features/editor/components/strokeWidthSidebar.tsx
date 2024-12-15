import React from "react";

import {
  ActiveTool,
  Editor,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
} from "@/features/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

import ToolSidebarHeader from "./toolSidebarHeader";
import ToolSidebarClose from "./toolSidebarClose";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface StrokeWidthSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}
const StrokeWidthSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: StrokeWidthSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  const widthTypeValue =
    editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;
  const onChangeStrokeWidth = (value: number) => {
    editor?.changeStrokeWidth(value);
  };

  const onChangeStrokeType = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r w-[360px] z-[40] h-full flex flex-col",
        activeTool === "stroke-width" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Stroke options"
        description="Modify the stroke of your elements"
      />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">Stroke Width</Label>
          <Slider
            value={[widthValue]}
            onValueChange={(values) => onChangeStrokeWidth(values[0])}
          />
        </div>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">Stroke type</Label>
          <Button
            variant="secondary"
            size="lg"
            className={cn(
              "w-full h-16 justify-start text-left px-[16px] py-[8px]",
              JSON.stringify(widthTypeValue) === `[]` &&
                "border border-blue-500"
            )}
            onClick={() => onChangeStrokeType([])}
          >
            <div className="w-full border-black rounded-full border-4" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className={cn(
              "w-full h-16 justify-start text-left px-[16px] py-[8px]",
              JSON.stringify(widthTypeValue) === `[5,5]` &&
                "border-2 border-blue-500"
            )}
            onClick={() => onChangeStrokeType([5, 5])}
          >
            <div className="w-full border-black rounded-full border-4 border-dashed" />
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default StrokeWidthSidebar;
