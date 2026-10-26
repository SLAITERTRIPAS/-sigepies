/**
 * Serviço de Processamento de Imagens do SIGEP
 * Inclui otimização para Firestore, remoção de fundo e manipulação de logótipos e assinaturas.
 */

export interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  maxSizeBytes?: number;
}

export interface SignatureProcessingOptions {
  threshold?: number;
  boostInk?: boolean;
  inkColor?: "original" | "black" | "blue";
}

/**
 * Converte um ficheiro File em string Base64
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Otimiza uma imagem para armazenamento no Firestore
 */
export async function optimizeImageForFirestore(
  imageSource: string | File,
  options: ImageOptimizationOptions = {}
): Promise<string> {
  const base64 = typeof imageSource === "string" ? imageSource : await fileToBase64(imageSource);
  
  const {
    maxWidth = 400,
    maxHeight = 400,
    quality = 0.7,
    maxSizeBytes = 150 * 1024
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context error"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      let currentQuality = quality;
      let result = canvas.toDataURL("image/webp", currentQuality);

      while (result.length > maxSizeBytes * 1.33 && currentQuality > 0.1) {
        currentQuality -= 0.1;
        result = canvas.toDataURL("image/webp", currentQuality);
      }

      resolve(result);
    };
    img.onerror = (err) => reject(err);
    img.src = base64;
  });
}

/**
 * Remove o fundo branco de uma imagem
 */
export async function removeImageBackground(imageSource: string | File): Promise<string> {
  const base64 = typeof imageSource === "string" ? imageSource : await fileToBase64(imageSource);
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context error"));
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const threshold = 240;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (r > threshold && g > threshold && b > threshold) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = (err) => reject(err);
    img.src = base64;
  });
}

/**
 * Remove o fundo de uma assinatura e permite ajustes de contraste e cor
 */
export async function removeSignatureBackground(
  imageSource: string | File,
  options: SignatureProcessingOptions = {}
): Promise<string> {
  const base64 = typeof imageSource === "string" ? imageSource : await fileToBase64(imageSource);
  const {
    threshold = 195,
    boostInk = true,
    inkColor = "original"
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context error"));
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Luminosidade para detectar o fundo (branco/claro)
        const brightness = (r + g + b) / 3;
        
        if (brightness > threshold) {
          data[i + 3] = 0; // Transparente
        } else {
          // Processamento da tinta se não for fundo
          if (boostInk) {
            if (inkColor === "black") {
              data[i] = Math.max(0, r - 50);
              data[i + 1] = Math.max(0, g - 50);
              data[i + 2] = Math.max(0, b - 50);
            } else if (inkColor === "blue") {
              data[i] = Math.max(0, r - 100);
              data[i + 1] = Math.max(0, g - 50);
              data[i + 2] = Math.min(255, b + 50);
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = (err) => reject(err);
    img.src = base64;
  });
}

export const imageService = {
  optimizeImageForFirestore,
  removeImageBackground,
  removeSignatureBackground,
  fileToBase64
};

export default imageService;
