import { useRef } from "react";
import html2canvas from "html2canvas";

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

  return (
    <>
      <div
        ref={signatureRef}
        className="relative flex w-fit flex-col items-center justify-center bg-transparent"
      >
        <img src="/template.jpg" alt="Template" className="block" />

        <p className="absolute bottom-[70%] left-[46%] translate-x-[1%] text-[40px] font-bold uppercase text-[#16203d] m-0 p-0">
          {name || "Nome"}
        </p>

        <p className="absolute bottom-[55%] left-[46%] translate-x-[1%] text-[40px] font-bold uppercase text-[#16203d] m-0 p-0">
          {sobrenome || "Sobrenome"}
        </p>

        <p className="absolute bottom-[48%] left-[46%] translate-x-[1%] text-[17px] font-semibold text-[#16203d] m-0 p-0">
          {selectedSector || ""}
        </p>

        <p className="absolute bottom-[29%] left-[48.4%] translate-x-[1%] text-[#16203d] m-0 p-0">
          {contato || "Contato"}
        </p>

        <p className="absolute bottom-[18%] left-[48.4%] translate-x-[1%] text-[#16203d] m-0 p-0">
          {email || "Email"}
        </p>

        <p className="absolute bottom-[6%] left-[48.4%] translate-x-[1%] text-[#16203d] m-0 p-0">
          {local || "Local"}
        </p>

        <img
          className="absolute bottom-[15.7%] left-[33.5%] h-[180px] w-[180px] -translate-x-1/2 rounded-full"
          src={croppedImage || "/user.png"}
          alt="Assinatura"
        />
      </div>

      {name && sobrenome && croppedImage && (
        <div className="mt-5 flex justify-center gap-2.5">
          <button
            onClick={handleDownload}
            className="z-[99] my-2 rounded-md bg-blue-600 px-4 py-2 text-white transition hover:cursor-pointer hover:bg-blue-400"
          >
            📥 Baixar Assinatura
          </button>
        </div>
      )}
    </>
  );
};
