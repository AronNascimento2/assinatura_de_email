import { Slider } from "@/components/ui/slider";
import { sliderClassName } from "./signature.config";
import type { ImageEditor } from "./signature.types";

interface ImageControlsProps {
  editor: ImageEditor;
  onChange: (field: keyof ImageEditor, value: number) => void;
}

export const ImageControls = ({ editor, onChange }: ImageControlsProps) => {
  return (
    <div className="space-y-3 rounded-lg border border-gray-200 p-3">
      <p className="text-sm font-bold">Imagem</p>

      <div>
        <p className="mb-2 text-xs font-semibold">Tamanho: {editor.size}px</p>

        <Slider
          min={50}
          max={160}
          step={1}
          defaultValue={[editor.size]}
          onValueChange={(value) => onChange("size", value[0])}
          className={sliderClassName}
        />
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold">Horizontal: {editor.x}px</p>

        <Slider
          min={-100}
          max={100}
          step={1}
          defaultValue={[editor.x]}
          onValueChange={(value) => onChange("x", value[0])}
          className={sliderClassName}
        />
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold">Vertical: {editor.y}px</p>

        <Slider
          min={-100}
          max={100}
          step={1}
          defaultValue={[editor.y]}
          onValueChange={(value) => onChange("y", value[0])}
          className={sliderClassName}
        />
      </div>
    </div>
  );
};
