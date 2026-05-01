import { ImageControls } from "./ImageControls";
import type { ImageEditor, TextEditor, TextKey } from "./signature.types";
import { TextControls } from "./TextControls";

interface SignatureControlsProps {
  editors: Record<TextKey, TextEditor>;
  imageEditor: ImageEditor;
  onTextChange: (field: TextKey, key: keyof TextEditor, value: number) => void;
  onImageChange: (field: keyof ImageEditor, value: number) => void;
}

export const SignatureControls = ({
  editors,
  imageEditor,
  onTextChange,
  onImageChange,
}: SignatureControlsProps) => {
  return (
    <div className="w-full max-w-[700px] rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-bold text-gray-900">
          Ajustes da assinatura
        </h3>

        <p className="text-xs text-gray-500">
          Ajuste os textos e a imagem acompanhando o preview acima.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextControls
          title="Nome"
          field="name"
          editor={editors.name}
          onChange={onTextChange}
        />

        <TextControls
          title="Setor"
          field="sector"
          editor={editors.sector}
          onChange={onTextChange}
        />

        <TextControls
          title="Contato"
          field="contact"
          editor={editors.contact}
          onChange={onTextChange}
        />

        <TextControls
          title="E-mail"
          field="email"
          editor={editors.email}
          onChange={onTextChange}
        />

        <TextControls
          title="Local"
          field="local"
          editor={editors.local}
          onChange={onTextChange}
        />

        <ImageControls editor={imageEditor} onChange={onImageChange} />
      </div>
    </div>
  );
};
