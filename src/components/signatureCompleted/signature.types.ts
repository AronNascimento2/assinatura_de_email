export type TextKey = "name" | "sector" | "contact" | "email" | "local";

export type TextEditor = {
  fontSize: number;
  x: number;
  y: number;
};

export type ImageEditor = {
  size: number;
  x: number;
  y: number;
};

export type TemplateItem = {
  id: string;
  label: string;
  image: string;
};
