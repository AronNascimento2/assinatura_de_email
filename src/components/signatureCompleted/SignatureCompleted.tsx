import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";

import { SignaturePreview } from "./SignaturePreview";
import { TemplateSelector } from "./TemplateSelector";
import { SignatureControls } from "./SignatureControls";

import {
  DEFAULT_USER_IMAGE,
  SIGNATURE_HEIGHT,
  SIGNATURE_WIDTH,
  TEMPLATE_PRESETS,
  templates,
} from "./signature.config";
import type {
  ImageEditor,
  TemplateItem,
  TextEditor,
  TextKey,
} from "./signature.types";

interface SignatureCompletedProps {
  sobrenome?: string;
  selectedSector?: string;
  contato?: string;
  email?: string;
  local?: string;
  name?: string;
  croppedImage: string | null;
  selectRadioButton: string;
  resultUserName: string;
}

const formatLabel = (value?: string) => {
  if (!value) return "Cel:";
  if (value === "celular") return "Cel:";
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}:`;
};

const blobToDataURL = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () =>
      reject(new Error("Erro ao converter blob para base64"));

    reader.readAsDataURL(blob);
  });

const normalizeImageSrc = async (src: string | null): Promise<string> => {
  if (!src?.trim()) return DEFAULT_USER_IMAGE;

  if (src.startsWith("data:image/")) return src;

  if (src.startsWith("blob:")) {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      return await blobToDataURL(blob);
    } catch {
      return DEFAULT_USER_IMAGE;
    }
  }

  return src;
};

const waitForImages = async (container: HTMLElement) => {
  const images = Array.from(container.querySelectorAll("img"));

  await Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();

      return new Promise<void>((resolve, reject) => {
        const handleLoad = () => {
          cleanup();
          resolve();
        };

        const handleError = () => {
          cleanup();
          reject(new Error(`Falha ao carregar imagem: ${img.src}`));
        };

        const cleanup = () => {
          img.removeEventListener("load", handleLoad);
          img.removeEventListener("error", handleError);
        };

        img.addEventListener("load", handleLoad);
        img.addEventListener("error", handleError);
      });
    }),
  );
};

export const SignatureCompleted = ({
  selectedSector,
  contato,
  email,
  local,
  name,
  croppedImage,
  selectRadioButton,
  resultUserName,
}: SignatureCompletedProps) => {
  const signatureRef = useRef<HTMLDivElement>(null);

  const nameRef = useRef<HTMLParagraphElement>(null);
  const sectorRef = useRef<HTMLParagraphElement>(null);
  const contactRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLParagraphElement>(null);
  const localRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const textRefs = {
    name: nameRef,
    sector: sectorRef,
    contact: contactRef,
    email: emailRef,
    local: localRef,
  };

  const editorsRef = useRef<Record<TextKey, TextEditor>>(
    TEMPLATE_PRESETS["template-1"].texts,
  );

  const imageEditorRef = useRef<ImageEditor>(
    TEMPLATE_PRESETS["template-1"].image,
  );

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem>(
    templates[0],
  );

  const [customTemplate, setCustomTemplate] = useState<string | null>(null);
  const [resolvedUserImage, setResolvedUserImage] =
    useState<string>(DEFAULT_USER_IMAGE);
  const [isResolvingImage, setIsResolvingImage] = useState(false);
  const [, forceUpdate] = useState(0);
  const applyTextStyle = useCallback(
    (key: TextKey) => {
      const element = textRefs[key].current;
      const editor = editorsRef.current[key];

      if (!element) return;

      element.style.fontSize = `${editor.fontSize}px`;
      element.style.transform = `translate3d(${editor.x}px, ${editor.y}px, 0)`;
    },
    [textRefs],
  );

  const applyImageStyle = useCallback(() => {
    const element = imageRef.current;
    const editor = imageEditorRef.current;

    if (!element) return;

    element.style.width = `${editor.size}px`;
    element.style.height = `${editor.size}px`;
    element.style.transform = `translate3d(${editor.x}px, ${editor.y}px, 0)`;
  }, []);
  const applyTemplatePreset = useCallback(
    (templateId: string) => {
      const preset = TEMPLATE_PRESETS[templateId];
      if (!preset) return;

      editorsRef.current = structuredClone(preset.texts);
      imageEditorRef.current = { ...preset.image };

      Object.keys(editorsRef.current).forEach((key) => {
        applyTextStyle(key as TextKey);
      });

      applyImageStyle();

      // 🔥 FORÇA RE-RENDER
      forceUpdate((prev) => prev + 1);
    },
    [applyImageStyle, applyTextStyle],
  );

  const updateText = (key: TextKey, field: keyof TextEditor, value: number) => {
    editorsRef.current[key][field] = value;
    applyTextStyle(key);
  };

  const updateImage = (field: keyof ImageEditor, value: number) => {
    imageEditorRef.current[field] = value;
    applyImageStyle();
  };

  const handleSelectTemplate = (template: TemplateItem) => {
    setSelectedTemplate(template);
  };

  const handleUploadTemplate = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Envie apenas imagens.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;

      const custom: TemplateItem = {
        id: "custom",
        label: "Personalizado",
        image: result,
      };

      setCustomTemplate(result);
      setSelectedTemplate(custom);
      applyTemplatePreset("custom");
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    applyTemplatePreset(selectedTemplate.id);
  }, [selectedTemplate.id]);
  useEffect(() => {
    let cancelled = false;

    const resolveImage = async () => {
      setIsResolvingImage(true);

      try {
        const normalized = await normalizeImageSrc(croppedImage);

        if (!cancelled) {
          setResolvedUserImage(normalized);
        }
      } catch {
        if (!cancelled) {
          setResolvedUserImage(DEFAULT_USER_IMAGE);
        }
      } finally {
        if (!cancelled) {
          setIsResolvingImage(false);
        }
      }
    };

    resolveImage();

    return () => {
      cancelled = true;
    };
  }, [croppedImage]);

  const label = useMemo(
    () => formatLabel(selectRadioButton),
    [selectRadioButton],
  );

  const displayEmail = useMemo(() => {
    return email?.trim() ? email : resultUserName;
  }, [email, resultUserName]);

  const canDownload = useMemo(() => {
    return Boolean(name && !isResolvingImage);
  }, [name, isResolvingImage]);

  const handleImageError = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      if (event.currentTarget.src.includes(DEFAULT_USER_IMAGE)) return;
      event.currentTarget.src = DEFAULT_USER_IMAGE;
    },
    [],
  );

  const handleDownload = useCallback(async () => {
    const element = signatureRef.current;
    if (!element) return;

    try {
      await waitForImages(element);

      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 1,
        width: SIGNATURE_WIDTH,
        height: SIGNATURE_HEIGHT,
        canvasWidth: SIGNATURE_WIDTH,
        canvasHeight: SIGNATURE_HEIGHT,
        style: {
          width: `${SIGNATURE_WIDTH}px`,
          height: `${SIGNATURE_HEIGHT}px`,
        },
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `assinatura_${name || "usuario"}.png`;
      link.click();
    } catch (error) {
      console.error("Erro ao gerar assinatura:", error);
    }
  }, [name]);

  return (
    <div className="w-full  flex flex-col lg:flex-row gap-6 items-start">
      {/* ESQUERDA (Preview + Templates) */}
      <div className="flex flex-col gap-6 w-full lg:max-w-[500px]">
        <SignaturePreview
          signatureRef={signatureRef}
          nameRef={nameRef}
          sectorRef={sectorRef}
          contactRef={contactRef}
          emailRef={emailRef}
          localRef={localRef}
          imageRef={imageRef}
          selectedTemplate={selectedTemplate}
          name={name}
          selectedSector={selectedSector}
          label={label}
          contato={contato}
          displayEmail={displayEmail}
          local={local}
          resolvedUserImage={resolvedUserImage}
          canDownload={canDownload}
          onImageError={handleImageError}
          onDownload={handleDownload}
        />

        <TemplateSelector
          templates={templates}
          selectedTemplate={selectedTemplate}
          customTemplate={customTemplate}
          onSelectTemplate={handleSelectTemplate}
          onUploadTemplate={handleUploadTemplate}
        />
      </div>

      <div className="w-full lg:max-w-[420px] lg:sticky lg:top-6">
        <SignatureControls
          editors={editorsRef.current}
          imageEditor={imageEditorRef.current}
          onTextChange={updateText}
          onImageChange={updateImage}
        />
      </div>
    </div>
  );
};
