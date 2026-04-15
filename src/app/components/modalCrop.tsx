import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
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
        rotation,
      );

      setCroppedImage(croppedImg);
    },
    [selectedImage, rotation, setCroppedImage],
  );

  return (
    <>
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 px-4">
          <div className="relative w-full max-w-[700px] rounded-xl bg-white p-5 text-center shadow-2xl">
            <span
              onClick={closeModal}
              className="absolute right-4 top-2 cursor-pointer text-3xl leading-none text-gray-700 hover:text-black"
            >
              &times;
            </span>

            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              Editar Imagem
            </h3>

            <div className="mt-2 flex flex-col items-center">
              <label className="mt-1 text-sm font-medium text-gray-700">
                Zoom
              </label>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="mb-3 w-4/5 cursor-pointer"
              />

              <label className="mt-1 text-sm font-medium text-gray-700">
                Rotação
              </label>
              <input
                type="range"
                min="-180"
                max="180"
                step="1"
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="mb-3 w-4/5 cursor-pointer"
              />
            </div>

            <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
              <div className="relative h-[300px] w-[300px] bg-gray-200">
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

              <div className="mt-3">
                <div className="mx-auto flex h-[130px] w-[130px] items-center justify-center overflow-hidden rounded-full bg-gray-100">
                  {croppedImage ? (
                    <img
                      src={croppedImage}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <p className="px-2 text-center text-sm text-gray-500">
                      Selecione uma área
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
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
