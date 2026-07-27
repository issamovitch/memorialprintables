'use client';

import { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ImageCropModalProps {
  open: boolean;
  imageSrc: string | null;
  /** Called with the cropped image as a data URL (image/jpeg). */
  onCropComplete: (croppedDataUrl: string, croppedBytes: Uint8Array) => void;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Helpers — produce a cropped canvas → data URL + raw bytes
// Uses the standard, reliable approach: drawImage with crop coordinates directly.
// ---------------------------------------------------------------------------
async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<{ dataUrl: string; bytes: Uint8Array }> {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement('canvas');

  // Make the output square by taking the smaller dimension of the crop area
  const size = Math.round(Math.min(pixelCrop.width, pixelCrop.height));
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // Center the crop: if the crop is rectangular, shift to center the square
  const offsetX = pixelCrop.width > size
    ? Math.round(pixelCrop.x + (pixelCrop.width - size) / 2)
    : Math.round(pixelCrop.x - (size - pixelCrop.width) / 2);
  const offsetY = pixelCrop.height > size
    ? Math.round(pixelCrop.y + (pixelCrop.height - size) / 2)
    : Math.round(pixelCrop.y - (size - pixelCrop.height) / 2);

  ctx.drawImage(
    image,
    offsetX, offsetY, size, size,   // source rect
    0, 0, canvas.width, canvas.height  // dest rect
  );

  const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
  const bytes = await dataUrlToBytes(dataUrl);
  return { dataUrl, bytes };
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

async function dataUrlToBytes(dataUrl: string): Promise<Uint8Array> {
  const res = await fetch(dataUrl);
  const buf = await res.arrayBuffer();
  return new Uint8Array(buf);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function ImageCropModal({ open, imageSrc, onCropComplete, onClose }: ImageCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [processing, setProcessing] = useState(false);

  // Reset state when a new image is loaded
  useEffect(() => {
    if (open && imageSrc) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    }
  }, [open, imageSrc]);

  const onCropCompleteCb = useCallback(
    (_area: { x: number; y: number; width: number; height: number },
     areaPixels: { x: number; y: number; width: number; height: number }) => {
      setCroppedAreaPixels(areaPixels);
    },
    []
  );

  const handleApply = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setProcessing(true);
    try {
      const { dataUrl, bytes } = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(dataUrl, bytes);
      onClose();
    } catch (err) {
      console.error('Crop failed', err);
    } finally {
      setProcessing(false);
    }
  }, [imageSrc, croppedAreaPixels, onCropComplete, onClose]);

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o && !processing) onClose(); }}>
      <DialogContent className="sm:max-w-[480px] er-root">
        <DialogHeader>
          <DialogTitle>Edit photo</DialogTitle>
        </DialogHeader>

        {/* Cropper stage — square aspect ratio only */}
        <div
          className="relative w-full bg-neutral-900 rounded-md overflow-hidden"
          style={{ height: 340 }}
        >
          {imageSrc ? (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropCompleteCb}
              restrictPosition={false}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-neutral-400 text-sm">
              No image loaded
            </div>
          )}
        </div>

        {/* Zoom slider */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--muted)] w-12 shrink-0">Zoom</span>
          <Slider
            value={[zoom]}
            min={1}
            max={3}
            step={0.01}
            onValueChange={(v) => setZoom(v[0])}
            className="flex-1"
          />
          <span className="text-xs text-[var(--muted)] w-10 text-right tabular-nums">{zoom.toFixed(2)}×</span>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={processing}>
            Cancel
          </Button>
          <Button onClick={handleApply} disabled={processing || !croppedAreaPixels}>
            {processing ? 'Applying…' : 'Apply crop'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
