import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toPng } from "html-to-image";

interface AvatarModeldProps {
  croppedImage: string | null;
  name?: string;
  sobrenome?: string;
  selectedSector?: string;
}

const SIGNATURE_WIDTH = 1920;
const SIGNATURE_HEIGHT = 1080;
const DEFAULT_USER_IMAGE = "/user.png";
const TEMPLATE_IMAGE = "/template5.png";

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
      if (img.complete && img.naturalWidth > 0) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve, reject) => {
        const handleLoad = () => {
          cleanup();
          resolve();
        };

        const handleError = () => {
          cleanup();
          reject(
            new Error(`Falha ao carregar imagem: ${img.currentSrc || img.src}`),
          );
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

export const AvatarModel: React.FC<AvatarModeldProps> = ({
  croppedImage,
  name,
  sobrenome,
  selectedSector,
}) => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const [resolvedUserImage, setResolvedUserImage] =
    useState<string>(DEFAULT_USER_IMAGE);
  const [isResolvingImage, setIsResolvingImage] = useState(false);

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

  const canDownload = useMemo(() => {
    return Boolean(name && sobrenome && !isResolvingImage);
  }, [name, sobrenome, isResolvingImage]);

  const handleImageError = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      if (event.currentTarget.src.includes(DEFAULT_USER_IMAGE)) return;
      event.currentTarget.src = DEFAULT_USER_IMAGE;
    },
    [],
  );

  const handleDownload = useCallback(async () => {
    const element = avatarRef.current;
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
    <div className="flex flex-col items-center gap-4">
      {/* 🔽 AREA QUE VAI VIRAR IMAGEM */}
      <div
        ref={avatarRef}
        className="relative flex h-[300px] w-full items-center justify-center rounded-2xl  p-6 shadow-sm"
      >
        <img
          src="/model-avatar.png"
          alt="Usuário"
          className="h-full w-auto object-contain"
        />

        <div className="relative right-[219px] top-[100px] h-[192px] w-[192px] -translate-x-1/2 -translate-y-1/2">
          <img
            src={croppedImage || "/user.png"}
            alt="Usuário"
            className="h-full w-full rounded-full border-2 border-[#fefefe] object-cover"
          />

          {/* 🔝 NOME */}
          <svg
            className="pointer-events-none absolute -inset-7 overflow-visible"
            viewBox="0 0 240 240"
          >
            <defs>
              <path
                id="topPath"
                d="M 20,120 A 100,100 0 0,1 220,120"
                fill="transparent"
              />
            </defs>

            <text fill="#fff" fontSize="14" textAnchor="middle">
              <textPath href="#topPath" startOffset="50%">
                {name} {sobrenome}
              </textPath>
            </text>
          </svg>

          {/* 🔽 SETOR */}
          <svg
            className="pointer-events-none absolute -inset-9 overflow-visible"
            viewBox="0 0 240 240"
          >
            <defs>
              <path
                id="bottomPath"
                d="M 20,120 A 100,100 0 1,0 220,120"
                fill="transparent"
              />
            </defs>

            <text fill="#fff" fontSize="12" textAnchor="middle">
              <textPath href="#bottomPath" startOffset="50%">
                {selectedSector}
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      {/* 🔽 BOTÃO DOWNLOAD */}
      <button
        onClick={handleDownload}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Baixar imagem
      </button>
    </div>
  );
};
