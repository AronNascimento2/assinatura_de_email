import { Slider } from "@/components/ui/slider";
import { sliderClassName } from "./signature.config";
import type { TextEditor, TextKey } from "./signature.types";

interface TextControlsProps {
  title: string;
  field: TextKey;
  editor: TextEditor;
  onChange: (field: TextKey, key: keyof TextEditor, value: number) => void;
}

export const TextControls = ({
  title,
  field,
  editor,
  onChange,
}: TextControlsProps) => {
  return (
    <div className="space-y-3 rounded-lg border border-gray-200 p-3">
      <p className="text-sm font-bold">{title}</p>

      <div>
        <p className="mb-2 text-xs font-semibold">
          Tamanho: {editor.fontSize}px
        </p>

        <Slider
          min={8}
          max={40}
          step={0.05}
          defaultValue={[editor.fontSize]}
          onValueChange={(value) => onChange(field, "fontSize", value[0])}
          className={sliderClassName}
        />
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold">Horizontal: {editor.x}px</p>

        <Slider
          min={-100}
          max={500}
          step={1}
          defaultValue={[editor.x]}
          onValueChange={(value) => onChange(field, "x", value[0])}
          className={sliderClassName}
        />
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold">Vertical: {editor.y}</p>

        <Slider
          min={-100}
          max={500}
          step={1}
          defaultValue={[editor.y]}
          onValueChange={(value) => onChange(field, "y", value[0])}
          className={sliderClassName}
        />
      </div>
    </div>
  );
};
