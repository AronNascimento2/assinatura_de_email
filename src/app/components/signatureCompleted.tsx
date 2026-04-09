import { useRef } from "react";
import html2canvas from "html2canvas";
import styles from "../styles/signatureCompleted.module.css";

interface SignatureCompletedProps {
  sobrenome?: string;
  selectedSector?: string;
  branchLineOrCellPhone?: string;
  email?: string;
  local?: string;
  name?: string;
  croppedImage: string | null;
  resultUserName: string;
  selectRadioButton: string;
}

export const SignatureCompleted: React.FC<SignatureCompletedProps> = ({
  selectRadioButton,
  sobrenome,
  selectedSector,
  branchLineOrCellPhone,
  resultUserName,
  local,
  name,
  croppedImage,
  email,
}) => {
  const signatureRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!signatureRef.current) return;

    const scaleFactor = 4;
    const originalCanvas = await html2canvas(signatureRef.current, {
      backgroundColor: null,
      scale: scaleFactor,
      useCORS: true,
    });

    const targetWidth = 593;
    const targetHeight = 180;

    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = targetWidth;
    resizedCanvas.height = targetHeight;

    const ctx = resizedCanvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(originalCanvas, 0, 0, targetWidth, targetHeight);

    const image = resizedCanvas.toDataURL("image/png", 1.0);

    const link = document.createElement("a");
    link.href = image;
    link.download = `assinatura_${name}.png`;
    link.click();
  };
  const formatLabel = (value?: string) => {
    if (!value) return "";

    if (value === "celular") return "Cel:";

    return value[0].toUpperCase() + value.slice(1) + ":";
  };

  const label = formatLabel(selectRadioButton);
  return (
    <div className={styles.signatureImagesContainer}>
      <div className={styles.signatureImages} ref={signatureRef}>
        <img src="/template.jpg" alt="Template" className={styles.image} />
        <p className={styles.nameSignature}>{name || "Nome"}</p>
        <p className={styles.sobrenomeSignature}>{sobrenome || "Sobrenome"}</p>
        <p className={styles.setorSignature}>{selectedSector || ""}</p>
        <p className={styles.contatoSignature}>
          Tel: 2413-1700 {label} {branchLineOrCellPhone}
        </p>
        <p className={styles.emailSignature}>
          {email?.trim() ? email : resultUserName}
        </p>{" "}
        <p className={styles.localSignature}>{local || "Local"}</p>
        <img
          className={styles.imageSignature}
          src={croppedImage || "/user.png"}
          alt="Assinatura"
        />
      </div>
      {name && sobrenome && croppedImage && (
        <button className={styles.downloadButton} onClick={handleDownload}>
          📥 Baixar Assinatura
        </button>
      )}
    </div>
  );
};
