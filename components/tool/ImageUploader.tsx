"use client";

import { useRef, useState } from "react";

interface Props {
  onImageLoaded: (imageData: ImageData, preview: string) => void;
}

export default function ImageUploader({ onImageLoaded }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function processFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      onImageLoaded(ctx.getImageData(0, 0, canvas.width, canvas.height), url);
    };
    img.src = url;
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const f = e.dataTransfer.files[0];
        if (f) processFile(f);
      }}
      className={`rounded-xl border-2 border-dashed px-6 py-10 text-center cursor-pointer transition-colors ${
        dragging
          ? "border-[var(--color-accent)] bg-[var(--color-accent-light)]"
          : "border-[var(--color-line)] bg-[var(--color-surface-alt)] hover:border-[var(--color-accent)]"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }}
      />
      <svg className="mx-auto mb-3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={dragging ? "#16a34a" : "#94a3b8"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
      <p className="font-semibold text-[var(--color-ink)]">
        {dragging ? "Drop to upload" : "Drop an image or click to browse"}
      </p>
      <p className="text-sm text-[var(--color-muted)] mt-1">PNG · JPG · WEBP · GIF — processed in your browser</p>
    </div>
  );
}
