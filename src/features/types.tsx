import { fabric } from "fabric";
import { ITextboxOptions } from "fabric/fabric-impl";
import * as material from "material-colors";

export const JSON_KEYS = [
  "name",
  "gradientAngle",
  "selectable",
  "hasControls",
  "linkData",
  "editable",
  "extensionType",
  "extension",
];

export const fonts = [
  "Arial",
  "Arial Black",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
  "Palatino",
  "Bookman",
  "Comic Sans MS",
  "Impact",
  "Lucida Sans Unicode",
  "Geneva",
  "Lucida Console",
];

export const filters = [
  "none",
  "polaroid",
  "sepia",
  "kodachrome",
  "contrast",
  "brightness",
  "grayscale",
  "brownie",
  "vintage",
  "technicolor",
  "pixelate",
  "invert",
  "blur",
  "sharpen",
  "emboss",
  "removecolor",
  "blackwhite",
  "vibrance",
  "blendcolor",
  "huerotate",
  "resize",
  "saturation",
  "gamma",
];

export const selectionDependentTools = [
  "fill",
  "font",
  "filter",
  "opacity",
  "remove-bg",
  "stroke-color",
  "stroke-width",
];

export const colors = [
  material.red["500"],
  material.pink["500"],
  material.purple["500"],
  material.deepPurple["500"],
  material.indigo["500"],
  material.blue["500"],
  material.lightBlue["500"],
  material.cyan["500"],
  material.teal["500"],
  material.green["500"],
  material.lightGreen["500"],
  material.lime["500"],
  material.yellow["500"],
  material.amber["500"],
  material.orange["500"],
  material.deepOrange["500"],
  material.brown["500"],
  material.blueGrey["500"],
  "transparent",
];

export type ActiveTool =
  | "select"
  | "shapes"
  | "text"
  | "images"
  | "draw"
  | "fill"
  | "stroke-color"
  | "stroke-width"
  | "font"
  | "opacity"
  | "filter"
  | "settings"
  | "ai"
  | "remove-bg"
  | "templates";

export const FILL_COLOR = "rgba(0,0,0,1)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = [];
export const FONT_SIZE = 32;
export const FONT_FAMILY = "Arial";
export const FONT_WEIGHT = 400;

export const CIRCLE_OPTIONS = {
  radius: 200,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  strokeWidth: STROKE_WIDTH,
  strokeColor: STROKE_COLOR,
};

export const RECTANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  strokeWidth: STROKE_WIDTH,
  strokeColor: STROKE_COLOR,
  width: 400,
  height: 400,
  angle: 0,
};
export const DIAMOND_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  strokeWidth: STROKE_WIDTH,
  strokeColor: STROKE_COLOR,
  width: 600,
  height: 600,
  angle: 0,
};
export const TRIANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  strokeWidth: STROKE_WIDTH,
  strokeColor: STROKE_COLOR,
  width: 400,
  height: 400,
  angle: 0,
};
export const TEXT_OPTIONS = {
  type: "textbox",
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  fontSize: FONT_SIZE,
  fontFamily: FONT_FAMILY,
};

export type BuildEditorProps = {
  save: (skip?: boolean) => void;
  copy: () => void;
  paste: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  canvas: fabric.Canvas;
  fillColor: string;
  autoZoom: () => void;
  setFillColor: (value: string) => void;
  strokeColor: string;
  setStrokeColor: (value: string) => void;
  strokeWidth: number;
  setStrokeWidth: (value: number) => void;
  selectedObjects: fabric.Object[] | [];
  strokeDashArray: number[];
  setStrokeDashArray: (value: number[]) => void;
  fontFamily: string;
  setFontFamily: (value: string) => void;
};

export type EditorHookProps = {
  defaultData: string;
  defaultWidth: number;
  defaultHeight: number;
  clearSelectionCallback?: () => void;
  saveCallback?: (values: {
    json: string;
    width: number;
    height: number;
  }) => void;
};

export interface Editor {
  getWorkspace: () => fabric.Object | undefined;
  autoZoom: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  enableDrawingMode: () => void;
  disableDrawingMode: () => void;
  onCopy: () => void;
  onPaste: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  savePng: () => void;
  saveJpg: () => void;
  saveSvg: () => void;
  saveJson: () => void;
  loadJson: (json: string) => void;
  addImage: (value: string) => void;
  delete: () => void;
  addText: (value: string, options?: ITextboxOptions) => void;
  changeImageFilter: (value: string) => void;
  changeFillColor: (value: string) => void;
  changeStrokeWidth: (value: number) => void;
  changeStrokeColor: (value: string) => void;
  changeStrokeDashArray: (value: number[]) => void;
  changeFontFamily: (value: string) => void;
  bringForward: () => void;
  sendBackward: () => void;
  changeOpacity: (value: number) => void;
  changeFontWeight: (value: number) => void;
  changeFontStyle: (value: string) => void;
  getActiveOpacity: () => number;
  getActiveFontStyle: () => string;
  changeSize: (value: { width: number; height: number }) => void;
  changeBackground: (value: string) => void;
  addCircle: () => void;
  addRectangle: () => void;
  addSoftRectangle: () => void;
  addTriangle: () => void;
  addRotatedTriangle: () => void;
  addDiamond: () => void;
  changeFontLinethrough: (value: boolean) => void;
  getActiveFontLinethrough: () => boolean;
  changeFontUnderline: (value: boolean) => void;
  getActiveFontUnderline: () => boolean;
  changeTextAlign: (value: string) => void;
  getActiveTextAlign: () => string;
  getActiveFontFamily: () => string;
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];
  getActiveFontWeight: () => number;
  changeFontSize: (value: number) => void;
  getActiveFontSize: () => number;
  canvas: fabric.Canvas;
  selectedObjects: fabric.Object[];
}
