'use client';

import { useRef, useEffect, useCallback } from 'react';

interface Props {
  label: string;
  height?: number;
}

export default function SignaturePad({ label, height = 72 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  // Map a client coordinate to canvas internal coordinate
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
    }
    last.current = { x, y };
  }, []);

  const clear = () => {
    const c = canvasRef.current;
    if (!c) return;
    c.getContext('2d')!.clearRect(0, 0, c.width, c.height);
  };

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
            top: 4,
            right: 6,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 10,
            color: '#bbb',
            fontFamily: 'inherit',
            padding: '1px 6px',
            borderRadius: 4,
            lineHeight: 1.4,
          }}
        >
          limpar
        </button>
      </div>
      <p style={{ fontSize: 11, color: '#888' }}>{label}</p>
    </div>
  );
}
