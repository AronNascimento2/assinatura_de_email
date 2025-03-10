import { useCallback, useState } from "react";
import styles from "../styles/modal.module.css";
import Cropper, { Area } from "react-easy-crop";
import getCroppedImg from "../utils/getCroppedImg";

interface ModalCropProps {
  setIsModalOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  setCroppedImage: (image: string | null) => void;
  croppedImage: string | null;
}

export const ModalCrop: React.FC<ModalCropProps> = ({
  setIsModalOpen,
  isModalOpen,
  selectedImage,
  setSelectedImage,
  setCroppedImage,
  croppedImage,
}) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedImage(null);
  };

  const onCropComplete = useCallback(
    async (_croppedArea: Area, croppedAreaPixels: Area) => {
      if (!selectedImage) return;
      const croppedImg = await getCroppedImg(
        selectedImage,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImg);
    },
    [selectedImage, rotation, setCroppedImage]
  );

  return (
    <>
      {isModalOpen && selectedImage && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>
            <h3>Editar Imagem</h3>
            <div className={styles.controls}>
              <label>Zoom</label>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
              />

              <label>Rotação</label>
              <input
                type="range"
                min="-180"
                max="180"
                step="1"
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
              />
            </div>
            <div className={styles.wrapperImages}>
              <div className={styles.cropContainer}>
                <Cropper
                  image={selectedImage}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                />
              </div>

              <div className={styles.previewContainer}>
                <div className={styles.previewWrapper}>
                  {croppedImage ? (
                    <img
                      src={croppedImage}
                      alt="Preview"
                      className={styles.previewImage}
                    />
                  ) : (
                    <p>Selecione uma área</p>
                  )}
                </div>
              </div>
            </div>

            <button
              className={styles.buttonAplicar}
              onClick={() => setIsModalOpen(false)}
            >
              Aplicar Recorte
            </button>
          </div>
        </div>
      )}
    </>
  );
};
