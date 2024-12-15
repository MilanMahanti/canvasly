import { fabric } from "fabric";
import { useEvent } from "react-use";

interface UseHotkeysProps {
  canvas: fabric.Canvas | null;
  undo: () => void;
  redo: () => void;
  save: (skip?: boolean) => void;
  copy: () => void;
  paste: () => void;
}

export const useHotkeys = ({
  canvas,
  copy,
  save,
  undo,
  redo,
  paste,
}: UseHotkeysProps) => {
  useEvent("keydown", (e) => {
    const isCtrlKey = e.ctrlKey || e.metaKey;
    const isBackSpace = e.key === "Backspace";
    const isInput = ["INPUT", "TEXTAREA"].includes(
      (e.target as HTMLElement).tagName
    );

    if (isInput) return;

    if (isBackSpace) {
      canvas?.remove(...canvas.getActiveObjects());
      canvas?.discardActiveObject();
    }

    if (isCtrlKey && e.key === "z") {
      e.preventDefault();
      undo();
    }
    if (isCtrlKey && e.key === "y") {
      e.preventDefault();
      undo();
    }
    if (isCtrlKey && e.key === "c") {
      e.preventDefault();
      copy();
    }
    if (isCtrlKey && e.key === "v") {
      e.preventDefault();
      paste();
    }
    if (isCtrlKey && e.key === "v") {
      e.preventDefault();
      save(true);
    }
    if (isCtrlKey && e.key === "a") {
      e.preventDefault();
      canvas?.discardActiveObject();

      const allSelectableObjects = canvas
        ?.getObjects()
        .filter((object) => object.selectable);

      canvas?.setActiveObject(
        new fabric.ActiveSelection(allSelectableObjects, { canvas })
      );

      canvas?.renderAll();
    }
  });
};
