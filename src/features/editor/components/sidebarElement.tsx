import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarElementProps {
  icon: LucideIcon;
  label: string;
  isActive?: Boolean;
  onClick: () => void;
}

export const SidebarElement = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: SidebarElementProps) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={cn(
        "w-full h-full aspect-video p-4 py-4 flex flex-col rounded-none",
        isActive && "bg-muted text-primary"
      )}
    >
      <Icon className="size-5 stroke-2 shrink-0" />
      <span className="mt-2 text-xs">{label}</span>
    </Button>
  );
};
