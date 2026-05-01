import type { RefObject } from "react";
import { Button } from "@/components/ui/button";
import styles from "../../app/styles/sig.module.css";
import { SIGNATURE_HEIGHT, SIGNATURE_WIDTH } from "./signature.config";
import type { TemplateItem } from "./signature.types";

interface SignaturePreviewProps {
  signatureRef: RefObject<HTMLDivElement | null>;
  nameRef: RefObject<HTMLParagraphElement | null>;
  sectorRef: RefObject<HTMLParagraphElement | null>;
  contactRef: RefObject<HTMLParagraphElement | null>;
  emailRef: RefObject<HTMLParagraphElement | null>;
  localRef: RefObject<HTMLParagraphElement | null>;
  imageRef: RefObject<HTMLImageElement | null>;

  selectedTemplate: TemplateItem;
  name?: string;
  selectedSector?: string;
  label: string;
  contato?: string;
  displayEmail: string;
  local?: string;
  resolvedUserImage: string;
  canDownload: boolean;

  onImageError: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onDownload: () => void;
}

export const SignaturePreview = ({
  signatureRef,
  nameRef,
  sectorRef,
  contactRef,
  emailRef,
  localRef,
  imageRef,
  selectedTemplate,
  name,
  selectedSector,
  label,
  contato,
  displayEmail,
  local,
  resolvedUserImage,
  canDownload,
  onImageError,
  onDownload,
}: SignaturePreviewProps) => {
  return (
    <div className="flex flex-col items-center">
      <div
        ref={signatureRef}
        className={styles.signatureImages}
        style={{
          width: `${SIGNATURE_WIDTH}px`,
          height: `${SIGNATURE_HEIGHT}px`,
        }}
      >
        <img
          src={selectedTemplate.image}
          alt="Template"
          className={styles.image}
        />

        <p
          ref={nameRef}
          className="absolute left-0 top-0 font-bold uppercase leading-none text-[#16203d]"
        >
          {name || "Nome"}
        </p>

        <p
          ref={sectorRef}
          className="absolute left-0 top-0 font-normal leading-none text-[#16203d]"
        >
          {selectedSector || "setor"}
        </p>

        <p
          ref={contactRef}
          className="absolute left-0 top-0 font-light leading-none text-[#16203d]"
        >
          {label} {contato}
        </p>

        <p
          ref={emailRef}
          className="absolute left-0 top-0 font-light leading-none text-[#16203d]"
        >
          {displayEmail || "email"}
        </p>

        <p
          ref={localRef}
          className="absolute left-0 top-0 font-light leading-none text-[#16203d]"
        >
          {local || "Local"}
        </p>

        <img
          ref={imageRef}
          className="absolute left-0 top-0 rounded-full object-cover"
          src={resolvedUserImage}
          alt="Assinatura"
          onError={onImageError}
        />
      </div>

      {canDownload && (
        <Button className={styles.downloadButton} onClick={onDownload}>
          📥 Baixar Assinatura
        </Button>
      )}
    </div>
  );
};
