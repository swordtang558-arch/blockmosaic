/// <reference lib="webworker" />
import { convertImage } from "../converter";
import type { PaletteKey } from "../blocks";

// Runs the image→blocks conversion off the main thread to keep the UI responsive
// and to keep this heavy logic out of the first-load bundle (loaded on demand).
interface ConvertRequest {
  imageData: ImageData;
  outputWidth: number;
  paletteKey: PaletteKey;
  survivalOnly: boolean;
  staircase: boolean;
}

self.onmessage = (e: MessageEvent<ConvertRequest>) => {
  const { imageData, outputWidth, paletteKey, survivalOnly, staircase } = e.data;
  const result = convertImage(imageData, outputWidth, paletteKey, { survivalOnly, staircase });
  (self as unknown as Worker).postMessage(result);
};
