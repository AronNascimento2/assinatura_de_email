import type {
  ImageEditor,
  TemplateItem,
  TextEditor,
  TextKey,
} from "./signature.types";

export const SIGNATURE_WIDTH = 400;
export const SIGNATURE_HEIGHT = 200;

export const DEFAULT_USER_IMAGE = "/user.png";
export const TEMPLATE_IMAGE = "/template.png";

export const templates: TemplateItem[] = [
  { id: "template-1", label: "Modelo 1", image: TEMPLATE_IMAGE },
  { id: "template-2", label: "Modelo 2", image: "/template-2.png" },
  { id: "template-3", label: "Modelo 3", image: "/template-3.png" },
];

export const TEMPLATE_PRESETS: Record<
  string,
  {
    texts: Record<TextKey, TextEditor>;
    image: ImageEditor;
  }
> = {
  "template-1": {
    texts: {
      name: { fontSize: 20, x: 176, y: 42 },
      sector: { fontSize: 12, x: 176, y: 68 },
      contact: { fontSize: 11, x: 195, y: 97 },
      email: { fontSize: 11, x: 195, y: 113 },
      local: { fontSize: 11, x: 195, y: 130 },
    },
    image: { size: 110, x: 21, y: 49 },
  },

  "template-2": {
    texts: {
      name: { fontSize: 20, x: 205, y: 42 },
      sector: { fontSize: 12, x: 205, y: 62 },
      contact: { fontSize: 11, x: 219, y: 83 },
      email: { fontSize: 11, x: 219, y: 104 },
      local: { fontSize: 11, x: 219, y: 149 },
    },
    image: { size: 112, x: 50, y: 43 },
  },

  "template-3": {
    texts: {
      name: { fontSize: 20, x: 215, y: 42 },
      sector: { fontSize: 12, x: 215, y: 65 },
      contact: { fontSize: 11, x: 259, y: 135 },
      email: { fontSize: 11, x: 259, y: 147 },
      local: { fontSize: 11, x: 259, y: 160 },
    },
    image: { size: 112, x: 10, y: 42 },
  },

  custom: {
    texts: {
      name: { fontSize: 20, x: 0, y: 0 },
      sector: { fontSize: 12, x: 0, y: 20 },
      contact: { fontSize: 11, x: 0, y: 40 },
      email: { fontSize: 11, x: 0, y: 60 },
      local: { fontSize: 11, x: 0, y: 80 },
    },
    image: { size: 50, x: 0, y: 0 },
  },
};

export const sliderClassName =
  "[&_[data-slot=slider-track]]:bg-gray-200 [&_[data-slot=slider-range]]:bg-blue-600 [&_[data-slot=slider-thumb]]:border-blue-600 [&_[data-slot=slider-thumb]]:bg-white";
