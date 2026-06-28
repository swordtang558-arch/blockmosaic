import { convertImage, ConversionResult, DitherMethod } from "./converter";
import type { MinecraftBlock } from "./blocks";

export interface ConvertParams {
  imageData: ImageData;
  outputWidth: number;
  palette: MinecraftBlock[];
  staircase: boolean;
  dither: DitherMethod;
}

/**
 * Runs the conversion in a Web Worker when available (keeps the UI responsive),
 * falling back to a synchronous call. The worker module is only fetched when
 * this runs, so the heavy logic stays out of the initial page bundle.
 */
export function runConvert(params: ConvertParams): Promise<ConversionResult> {
  const local = () =>
    convertImage(params.imageData, params.outputWidth, params.palette, {
      staircase: params.staircase,
      dither: params.dither,
    });

  if (typeof Worker !== "undefined") {
    return new Promise((resolve, reject) => {
      const worker = new Worker(new URL("./worker/convert.worker.ts", import.meta.url));
      worker.onmessage = (e: MessageEvent<ConversionResult>) => {
        resolve(e.data);
        worker.terminate();
      };
      worker.onerror = (err) => {
        worker.terminate();
        try {
          resolve(local());
        } catch {
          reject(err);
        }
      };
      worker.postMessage(params);
    });
  }

  return Promise.resolve(local());
}
