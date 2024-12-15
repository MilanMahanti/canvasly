import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Editor } from "@/features/types";
import { Minimize, ZoomIn, ZoomOut } from "lucide-react";

interface FooterProps {
  editor: Editor | undefined;
}

const Footer = ({ editor }: FooterProps) => {
  return (
    <footer className="flex items-center h-[52px] border-t bg-white w-full flex-row-reverse overflow-x-auto gap-x-1 z-[49] px-4 p-2">
      <Hint label="Reset" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.autoZoom()}
          size="icon"
          variant="ghost"
          className="h-full"
        >
          <Minimize className="size-4" />
        </Button>
      </Hint>
      <Hint label="Zoom in" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.zoomIn()}
          size="icon"
          variant="ghost"
          className="h-full"
        >
          <ZoomIn className="size-4" />
        </Button>
      </Hint>
      <Hint label="Zoom out" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.zoomOut()}
          size="icon"
          variant="ghost"
          className="h-full"
        >
          <ZoomOut className="size-4" />
        </Button>
      </Hint>
    </footer>
  );
};

export default Footer;
