import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import styles from "../styles/sig.module.css";
import { Button } from "@/components/ui/button";

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

const SIGNATURE_WIDTH = 641;
const SIGNATURE_HEIGHT = 184;
const DEFAULT_USER_IMAGE = "/user.png";
const TEMPLATE_IMAGE = "/template5.png";

const formatLabel = (value?: string) => {
  if (!value) return "";
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

export const SignatureCompleted: React.FC<SignatureCompletedProps> = ({
  sobrenome,
  selectedSector,
  contato,
  email,
  local,
  name,
  croppedImage,
  selectRadioButton,
  resultUserName,
}) => {
  const signatureRef = useRef<HTMLDivElement>(null);
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

  const label = useMemo(
    () => formatLabel(selectRadioButton),
    [selectRadioButton],
  );

  const displayEmail = useMemo(() => {
    return email?.trim() ? email : resultUserName;
  }, [email, resultUserName]);

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
    <div className={styles.signatureImagesContainer}>
      <div
        ref={signatureRef}
        className={styles.signatureImages}
        style={{
          width: `${SIGNATURE_WIDTH}px`,
          height: `${SIGNATURE_HEIGHT}px`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={TEMPLATE_IMAGE}
          alt="Template"
          className={styles.image}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "cover",
          }}
        />
        <p
          className="font-light"
          style={{
            rotate: "-90deg",
            position: "absolute",
            bottom: "105px", // 👈 você ajusta aqui
            left: "2px", // 👈 ou left, top etc
            fontFamily: "Alexandria",
            fontSize: "9px",
            color: "#fefefe", // ou branco dependendo do fundo
            zIndex: 10,
          }}
        >
          www.unicargo.com.br
        </p>
        <img
          src="/logo.png"
          className="w-[159px] h-[110px] absolute top-[107px] left-[3px]"
        />

        <p className={styles.nameSignature}>{name || "Nome"}</p>
        <p className={styles.sobrenomeSignature}>{sobrenome || "Sobrenome"}</p>
        <p className={styles.setorSignature}>{selectedSector || ""}</p>

        <p className={styles.contatoSignature}>
          Tel: 2413-1700 {label} {contato}
        </p>

        <p className={styles.emailSignature}>{displayEmail}</p>
        <p className={styles.localSignature}>{local || "Local"}</p>

        <img
          className={styles.imageSignature}
          src={resolvedUserImage}
          alt="Assinatura"
          onError={handleImageError}
          style={{
            border: "15px solid #fefefe",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>

      {canDownload && (
        <Button className={styles.downloadButton} onClick={handleDownload}>
          📥 Baixar Assinatura
        </Button>
      )}
    </div>
  );
};
