import { createImage } from "./createImage";

interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: PixelCrop,
  rotation: number = 0
): Promise<string | null> => {
  const image = await createImage(imageSrc); // Aqui a tipagem de createImage garante que image seja um HTMLImageElement
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );
  ctx.restore();

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(URL.createObjectURL(blob));
      } else {
        resolve(null);
      }
    }, "image/png");
  });
};

export default getCroppedImg;
