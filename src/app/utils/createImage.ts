export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous"; // Evita problemas de CORS em algumas imagens
    image.src = url;

    image.onload = () => resolve(image); // Resolve a promise com o HTMLImageElement
    image.onerror = (error) => reject(error); // Rejeita a promise em caso de erro
  });
