'use client';

import { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';

export interface SignaturePadHandle {
  getDataURL: () => string | null;
  isEmpty: () => boolean;
}

interface Props {
  label: string;
  height?: number;
}

const SignaturePad = forwardRef<SignaturePadHandle, Props>(function SignaturePad({ label, height = 72 }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const hasStrokes = useRef(false);

  const toCanvas = useCallback((clientX: number, clientY: number) => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return {
      x: ((clientX - r.left) / r.width) * c.width,
      y: ((clientY - r.top) / r.height) * c.height,
    };
  }, []);

  const stroke = useCallback((x: number, y: number) => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d')!;
    ctx.strokeStyle = '#111';
    ctx.lineWidth = (c.width / 400) * 2.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (last.current) {
      ctx.beginPath();
      ctx.moveTo(last.current.x, last.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      hasStrokes.current = true;
    }
    last.current = { x, y };
  }, []);

  const clear = () => {
    const c = canvasRef.current;
    if (!c) return;
    c.getContext('2d')!.clearRect(0, 0, c.width, c.height);
    hasStrokes.current = false;
  };

  useImperativeHandle(ref, () => ({
    getDataURL: () => {
      const c = canvasRef.current;
      if (!c || !hasStrokes.current) return null;
      return c.toDataURL('image/png');
    },
    isEmpty: () => !hasStrokes.current,
  }));

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    const onDown = (e: PointerEvent) => {
      e.preventDefault();
      c.setPointerCapture(e.pointerId);
      drawing.current = true;
      last.current = toCanvas(e.clientX, e.clientY);
    };
    const onMove = (e: PointerEvent) => {
      if (!drawing.current) return;
      e.preventDefault();
      const p = toCanvas(e.clientX, e.clientY);
      stroke(p.x, p.y);
    };
    const onUp = () => { drawing.current = false; last.current = null; };

    c.addEventListener('pointerdown', onDown);
    c.addEventListener('pointermove', onMove);
    c.addEventListener('pointerup', onUp);
    c.addEventListener('pointercancel', onUp);

    return () => {
      c.removeEventListener('pointerdown', onDown);
      c.removeEventListener('pointermove', onMove);
      c.removeEventListener('pointerup', onUp);
      c.removeEventListener('pointercancel', onUp);
    };
  }, [toCanvas, stroke]);

  return (
    <div>
      <div style={{ position: 'relative', marginBottom: 8 }}>
        <canvas
          ref={canvasRef}
          width={800}
          height={height * 2}
          style={{
            width: '100%',
            height,
            display: 'block',
            cursor: 'crosshair',
            touchAction: 'none',
            borderBottom: '1px solid #333',
            borderRadius: '2px 2px 0 0',
            background: 'rgba(0,0,0,0.018)',
          }}
        />
        <button
          className="no-print"
          onClick={clear}
          style={{
            position: 'absolute',
            top: 6,
            right: 6,
            background: 'rgba(0,0,0,0.06)',
            border: '1px solid #ddd',
            cursor: 'pointer',
            fontSize: 11,
            color: '#888',
            fontFamily: 'inherit',
            padding: '4px 10px',
            borderRadius: 6,
            lineHeight: 1.4,
            minWidth: 44,
            minHeight: 28,
          }}
        >
          limpar
        </button>
      </div>
      <p style={{ fontSize: 11, color: '#888' }}>{label}</p>
    </div>
  );
});

export default SignaturePad;
