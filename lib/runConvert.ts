import { convertImage, ConversionResult } from "./converter";
import type { PaletteKey } from "./blocks";

export interface ConvertParams {
  imageData: ImageData;
  outputWidth: number;
  paletteKey: PaletteKey;
  survivalOnly: boolean;
  staircase: boolean;
}

/**
 * Runs the conversion in a Web Worker when available (keeps the UI responsive),
 * falling back to a synchronous call. The worker module is only fetched when
 * this runs, so the heavy logic stays out of the initial page bundle.
 */
export function runConvert(params: ConvertParams): Promise<ConversionResult> {
  if (typeof Worker !== "undefined") {
    return new Promise((resolve, reject) => {
      const worker = new Worker(new URL("./worker/convert.worker.ts", import.meta.url));
      worker.onmessage = (e: MessageEvent<ConversionResult>) => {
        resolve(e.data);
        worker.terminate();
      };
      worker.onerror = (err) => {
        worker.terminate();
        // Fall back to main-thread conversion on worker failure.
        try {
          resolve(
            convertImage(params.imageData, params.outputWidth, params.paletteKey, {
              survivalOnly: params.survivalOnly,
              staircase: params.staircase,
            })
          );
        } catch {
          reject(err);
        }
      };
      worker.postMessage(params);
    });
  }

  return Promise.resolve(
    convertImage(params.imageData, params.outputWidth, params.paletteKey, {
      survivalOnly: params.survivalOnly,
    })
  );
}
