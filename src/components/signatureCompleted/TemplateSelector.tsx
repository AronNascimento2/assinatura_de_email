import type { TemplateItem } from "./signature.types";

interface TemplateSelectorProps {
  templates: TemplateItem[];
  selectedTemplate: TemplateItem;
  customTemplate: string | null;
  onSelectTemplate: (template: TemplateItem) => void;
  onUploadTemplate: (file: File) => void;
}

export const TemplateSelector = ({
  templates,
  selectedTemplate,
  customTemplate,
  onSelectTemplate,
  onUploadTemplate,
}: TemplateSelectorProps) => {
  return (
    <>
      <div className="w-full max-w-[700px] rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <p className="mb-3 text-sm font-bold text-gray-900">
          Enviar template personalizado
        </p>

        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-blue-400">
          <span className="text-sm font-semibold text-gray-700">
            Clique para enviar uma imagem
          </span>

          <span className="text-xs text-gray-500">PNG, JPG ou JPEG</span>

          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onUploadTemplate(file);
            }}
          />
        </label>

        {customTemplate && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold text-gray-600">
              Template enviado
            </p>

            <button
              type="button"
              onClick={() =>
                onSelectTemplate({
                  id: "custom",
                  label: "Personalizado",
                  image: customTemplate,
                })
              }
              className={`overflow-hidden rounded-lg border p-2 transition ${
                selectedTemplate.id === "custom"
                  ? "border-blue-600 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <img
                src={customTemplate}
                alt="Template personalizado"
                className="h-28 w-full rounded-md object-cover"
              />

              <p className="mt-2 text-xs font-semibold text-gray-700">
                Personalizado
              </p>
            </button>
          </div>
        )}
      </div>

      <div className="w-full max-w-[700px] rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <p className="mb-3 text-sm font-bold text-gray-900">
          Escolha o modelo da assinatura
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {templates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelectTemplate(template)}
              className={`rounded-lg border p-2 ${
                selectedTemplate.id === template.id
                  ? "border-blue-600"
                  : "border-gray-200"
              }`}
            >
              <img
                src={template.image}
                alt={template.label}
                className="h-24 w-full rounded-md object-cover"
              />

              <p className="mt-2 text-xs font-semibold text-gray-700">
                {template.label}
              </p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
