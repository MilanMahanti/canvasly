import React, { useEffect, useMemo, useState } from "react";

import { ActiveTool, Editor, FILL_COLOR } from "@/features/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

import ToolSidebarHeader from "./toolSidebarHeader";
import ToolSidebarClose from "./toolSidebarClose";
import ShapeTool from "./shapeTool";
import { ColorPicker } from "./colorPicker";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SettingsSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}
const SettingsSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: SettingsSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const workspace = editor?.getWorkspace();

  const initialWidth = useMemo(() => `${workspace?.width || 0}`, [workspace]);
  const initialHeight = useMemo(() => `${workspace?.height || 0}`, [workspace]);
  const initialBackground = useMemo(
    () => workspace?.fill || "#ffffff",
    [workspace]
  );

  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [background, setBackground] = useState(initialBackground);

  useEffect(() => {
    setWidth(initialWidth);
    setHeight(initialHeight);
    setBackground(initialBackground);
  }, [initialBackground, initialHeight, initialWidth]);

  const changeBackground = (value: string) => {
    setBackground(value);
    editor?.changeBackground(value);
  };

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editor?.changeSize({ width: parseInt(width), height: parseInt(height) });
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r w-[360px] z-[40] h-full flex flex-col",
        activeTool === "settings" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Settings"
        description="Change your canvas settings"
      />
      <ScrollArea>
        <form className="p-4 space-y-4" onSubmit={handelSubmit}>
          <div className="space-y-2">
            <Label>Height</Label>

            <Input
              placeholder="Height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Width</Label>

            <Input
              placeholder="Width"
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>

          <Button className="w-full">Resize Canvas</Button>
        </form>
        <div className="p-4">
          <ColorPicker
            value={background as string}
            onChange={changeBackground}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default SettingsSidebar;
