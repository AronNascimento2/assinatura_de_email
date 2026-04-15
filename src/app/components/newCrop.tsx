"use client";

import getCroppedImg from "./cropImage";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import type { Area, Point } from "react-easy-crop";

const dogImg =
  "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000";

interface DemoProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Demo: React.FC<DemoProps> = ({ isOpen, onClose }) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const updatePreview = useCallback(
    async (pixels: Area, currentRotation: number) => {
      try {
        const result = await getCroppedImg(dogImg, pixels, currentRotation);
        setCroppedImage(result);
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );

  const onCropComplete = useCallback(
    async (_croppedArea: Area, croppedPixels: Area) => {
      setCroppedAreaPixels(croppedPixels);
      await updatePreview(croppedPixels, rotation);
    },
    [rotation, updatePreview],
  );

  const handleApply = async () => {
    if (!croppedAreaPixels) return;
    const result = await getCroppedImg(dogImg, croppedAreaPixels, rotation);
    setCroppedImage(result);
  };

  const handleClose = () => {
    setCroppedImage(null);
    setCrop({ x: 0, y: 0 });
    setRotation(0);
    setZoom(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4">
      <div className="relative w-full  rounded-2xl bg-white p-5 shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute right-4 top-3 text-2xl font-bold text-slate-500 hover:text-slate-800"
        >
          ×
        </button>

        <h2 className="mb-5 text-center text-xl font-semibold text-slate-800">
          Editar imagem
        </h2>

        <div className="flex flex-col gap-6">
          <div className="relative flex w-full items-center margin-0 justify-center h-[200px] bg-[#333] sm:h-[400px]">
            <Cropper
              image={dogImg}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              showGrid
            />
          </div>

          <div className="p-4 flex flex-col items-stretch sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center">
              <p className="min-w-[65px] text-sm font-medium text-slate-700">
                Zoom
              </p>
              <Slider
                value={[zoom]}
                min={1}
                max={3}
                step={0.1}
                onValueChange={(value) => setZoom(value[0])}
                className="py-[22px] ml-8 sm:mx-4"
              />
            </div>

            <div className="flex flex-1 items-center">
              <p className="min-w-[65px] text-sm font-medium text-slate-700">
                Rotação
              </p>
              <Slider
                value={[rotation]}
                min={0}
                max={360}
                step={1}
                onValueChange={(value) => setRotation(value[0])}
                className="py-[22px] ml-8 sm:mx-4"
              />
            </div>

            <Button
              onClick={handleApply}
              className="mt-4 shrink-0 sm:ml-4 sm:mt-0"
            >
              Aplicar recorte
            </Button>
          </div>

          <div className="flex flex-col items-center">
            <p className="mb-3 text-sm font-medium text-slate-700">Preview</p>

            <div className="flex h-[180px] w-[180px] items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100">
              {croppedImage ? (
                <img
                  src={croppedImage}
                  alt="Preview recortado"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="px-3 text-center text-xs text-slate-500">
                    O preview aparecerá aqui
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
