/// <reference lib="webworker" />
import { convertImage, DitherMethod } from "../converter";
import type { MinecraftBlock } from "../blocks";

// Runs the image→blocks conversion off the main thread to keep the UI responsive
// and to keep this heavy logic out of the first-load bundle (loaded on demand).
interface ConvertRequest {
  imageData: ImageData;
  outputWidth: number;
  palette: MinecraftBlock[];
  staircase: boolean;
  dither: DitherMethod;
}

self.onmessage = (e: MessageEvent<ConvertRequest>) => {
  const { imageData, outputWidth, palette, staircase, dither } = e.data;
  const result = convertImage(imageData, outputWidth, palette, { staircase, dither });
  (self as unknown as Worker).postMessage(result);
};
