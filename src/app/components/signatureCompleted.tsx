import { useRef } from "react";
import html2canvas from "html2canvas";
import styles from "../styles/signatureCompleted.module.css";

interface SignatureCompletedProps {
  sobrenome?: string;
  selectedSector?: string;
  contato?: string;
  email?: string;
  local?: string;
  name?: string;
  croppedImage: string | null;
}

export const SignatureCompleted: React.FC<SignatureCompletedProps> = ({
  sobrenome,
  selectedSector,
  contato,
  email,
  local,
  name,
  croppedImage,
}) => {
  const signatureRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!signatureRef.current) return;

    const originalCanvas = await html2canvas(signatureRef.current, {
      backgroundColor: null,
      scale: window.devicePixelRatio,
      useCORS: true,
      removeContainer: false,
    });

    const targetWidth = 593;
    const targetHeight = 180;

    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = targetWidth;
    resizedCanvas.height = targetHeight;

    const ctx = resizedCanvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(originalCanvas, 0, 0, targetWidth, targetHeight);

    const image = resizedCanvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = `assinatura_${name}.png`;
    link.click();
  };

  return (
    <>
      <div className={styles.signatureImages} ref={signatureRef}>
        <img src="/template.jpg" alt="Template" className={styles.image} />
        <p className={styles.nameSignature}>{name || "Nome"}</p>
        <p className={styles.sobrenomeSignature}>{sobrenome || "Sobrenome"}</p>
        <p className={styles.setorSignature}>{selectedSector || "Setor"}</p>
        <p className={styles.contatoSignature}>{contato || "Contato"}</p>
        <p className={styles.emailSignature}>{email || "Email"}</p>
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
    </>
  );
};
