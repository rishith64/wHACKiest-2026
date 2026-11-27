import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, SlidersHorizontal, EyeOff, RotateCcw, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export type GridOrientation =
  | 'horizontal'
  | 'vertical'
  | 'diagonal-ne'
  | 'diagonal-se'
  | 'grid-mesh'
  | 'diagonal-mesh'
  | 'radial'
  | 'parametric';

export interface GridConfig {
  orientation: GridOrientation;
  lineSpacing: number;
  lineThickness: number;
  repelDistance: number;
  repelForce: number;
  springStrength: number;
  damping: number;
  lineOpacity: number;
}

const DEFAULT_CONFIG: GridConfig = {
  orientation: 'grid-mesh',
  lineSpacing: 30,
  lineThickness: 1.2,
  repelDistance: 150,
  repelForce: 0.80,
  springStrength: 0.010,
  damping: 0.64,
  lineOpacity: 0.30,
};

interface LineState {
  basePos: number;
  offset: number;
  velocity: number;
}

export const InteractiveGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [config, setConfig] = useState<GridConfig>(DEFAULT_CONFIG);
  const configRef = useRef<GridConfig>(config);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  // Web Audio subtle ambient harmonic ping on strong cursor movement
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastSoundTimeRef = useRef<number>(0);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  const playSubtlePulse = useCallback((intensity: number) => {
    if (!audioEnabled) return;
    const now = performance.now();
    if (now - lastSoundTimeRef.current < 140) return;
    lastSoundTimeRef.current = now;

    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180 + intensity * 240, ctx.currentTime);
      gain.gain.setValueAtTime(0.015 * Math.min(intensity, 1), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.19);
    } catch {
      // Ignore audio errors if blocked by browser policy
    }
  }, [audioEnabled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let hLines: LineState[] = [];
    let vLines: LineState[] = [];
    let d1Lines: LineState[] = [];
    let d2Lines: LineState[] = [];
    let rLines: LineState[] = [];

    const buildLines = () => {
      const sp = Math.max(12, configRef.current.lineSpacing);
      hLines = [];
      for (let y = 0; y <= height + sp; y += sp) {
        hLines.push({ basePos: y, offset: 0, velocity: 0 });
      }
      vLines = [];
      for (let x = 0; x <= width + sp; x += sp) {
        vLines.push({ basePos: x, offset: 0, velocity: 0 });
      }
      const diagMax = width + height;
      d1Lines = [];
      for (let d = -height; d <= diagMax; d += sp * 1.35) {
        d1Lines.push({ basePos: d, offset: 0, velocity: 0 });
      }
      d2Lines = [];
      for (let d = -height; d <= diagMax; d += sp * 1.35) {
        d2Lines.push({ basePos: d, offset: 0, velocity: 0 });
      }
      const maxR = Math.hypot(width / 2, height / 2) + sp;
      rLines = [];
      for (let r = sp; r <= maxR; r += sp) {
        rLines.push({ basePos: r, offset: 0, velocity: 0 });
      }
    };

    buildLines();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      buildLines();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          active: true,
        };
      }
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);

    let animId = 0;
    let lastSpacing = configRef.current.lineSpacing;
    let time = 0;

    const updateLinePhysics = (line: LineState, distToCursor: number, sign: number, cfg: GridConfig) => {
      if (mouseRef.current.active && distToCursor < cfg.repelDistance) {
        const normalized = 1 - distToCursor / cfg.repelDistance;
        const push = normalized * normalized * cfg.repelForce * 2.4 * sign;
        line.velocity += push;
        if (normalized > 0.65) {
          playSubtlePulse(normalized);
        }
      }
      // Spring back toward 0 offset
      const springForce = -line.offset * cfg.springStrength * 4.5;
      line.velocity = (line.velocity + springForce) * cfg.damping;
      line.offset += line.velocity;
    };

    const render = () => {
      const cfg = configRef.current;
      if (cfg.lineSpacing !== lastSpacing) {
        lastSpacing = cfg.lineSpacing;
        buildLines();
      }

      time += 0.015;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const ori = cfg.orientation;

      ctx.lineWidth = cfg.lineThickness;

      const drawHorizontal = ori === 'horizontal' || ori === 'grid-mesh';
      const drawVertical = ori === 'vertical' || ori === 'grid-mesh';
      const drawDiagNE = ori === 'diagonal-ne' || ori === 'diagonal-mesh';
      const drawDiagSE = ori === 'diagonal-se' || ori === 'diagonal-mesh';

      if (drawHorizontal) {
        for (const line of hLines) {
          const currentY = line.basePos + line.offset;
          const dist = Math.abs(my - currentY);
          const sign = currentY >= my ? 1 : -1;
          if (!prefersReducedMotion) updateLinePhysics(line, dist, sign, cfg);

          const proximity = mouseRef.current.active && dist < cfg.repelDistance
            ? (1 - dist / cfg.repelDistance) * 0.45
            : 0;
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, cfg.lineOpacity + proximity)})`;
          ctx.beginPath();
          ctx.moveTo(0, line.basePos + line.offset);
          ctx.lineTo(width, line.basePos + line.offset);
          ctx.stroke();
        }
      }

      if (drawVertical) {
        for (const line of vLines) {
          const currentX = line.basePos + line.offset;
          const dist = Math.abs(mx - currentX);
          const sign = currentX >= mx ? 1 : -1;
          if (!prefersReducedMotion) updateLinePhysics(line, dist, sign, cfg);

          const proximity = mouseRef.current.active && dist < cfg.repelDistance
            ? (1 - dist / cfg.repelDistance) * 0.45
            : 0;
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, cfg.lineOpacity + proximity)})`;
          ctx.beginPath();
          ctx.moveTo(line.basePos + line.offset, 0);
          ctx.lineTo(line.basePos + line.offset, height);
          ctx.stroke();
        }
      }

      if (drawDiagNE) {
        for (const line of d1Lines) {
          const val = mx + my;
          const currentD = line.basePos + line.offset;
          const dist = Math.abs(val - currentD) / Math.SQRT2;
          const sign = currentD >= val ? 1 : -1;
          if (!prefersReducedMotion) updateLinePhysics(line, dist, sign, cfg);

          const proximity = mouseRef.current.active && dist < cfg.repelDistance
            ? (1 - dist / cfg.repelDistance) * 0.45
            : 0;
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, cfg.lineOpacity + proximity)})`;
          const d = line.basePos + line.offset;
          ctx.beginPath();
          ctx.moveTo(0, d);
          ctx.lineTo(d, 0);
          ctx.stroke();
        }
      }

      if (drawDiagSE) {
        for (const line of d2Lines) {
          const val = mx - my + height;
          const currentD = line.basePos + line.offset;
          const dist = Math.abs(val - currentD) / Math.SQRT2;
          const sign = currentD >= val ? 1 : -1;
          if (!prefersReducedMotion) updateLinePhysics(line, dist, sign, cfg);

          const proximity = mouseRef.current.active && dist < cfg.repelDistance
            ? (1 - dist / cfg.repelDistance) * 0.45
            : 0;
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, cfg.lineOpacity + proximity)})`;
          const d = line.basePos + line.offset;
          ctx.beginPath();
          ctx.moveTo(0, height - d);
          ctx.lineTo(d, height);
          ctx.stroke();
        }
      }

      if (ori === 'radial') {
        const cx = width / 2;
        const cy = height / 2;
        const mDist = Math.hypot(mx - cx, my - cy);
        for (const line of rLines) {
          const currentR = Math.max(4, line.basePos + line.offset);
          const dist = Math.abs(mDist - currentR);
          const sign = currentR >= mDist ? 1 : -1;
          if (!prefersReducedMotion) updateLinePhysics(line, dist, sign, cfg);

          const proximity = mouseRef.current.active && dist < cfg.repelDistance
            ? (1 - dist / cfg.repelDistance) * 0.45
            : 0;
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, cfg.lineOpacity + proximity)})`;
          ctx.beginPath();
          ctx.arc(cx, cy, Math.max(2, line.basePos + line.offset), 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      if (ori === 'parametric') {
        for (const line of hLines) {
          const dist = Math.abs(my - (line.basePos + line.offset));
          const sign = line.basePos + line.offset >= my ? 1 : -1;
          if (!prefersReducedMotion) updateLinePhysics(line, dist, sign, cfg);

          const proximity = mouseRef.current.active && dist < cfg.repelDistance
            ? (1 - dist / cfg.repelDistance) * 0.45
            : 0;
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, cfg.lineOpacity + proximity)})`;
          ctx.beginPath();
          for (let x = 0; x <= width; x += 24) {
            const wave = Math.sin(x * 0.008 + time + line.basePos * 0.015) * 14;
            const y = line.basePos + line.offset + wave;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [playSubtlePulse]);

  const orientations: { id: GridOrientation; label: string; icon?: React.ReactNode }[] = [
    { id: 'horizontal', label: 'Horizontal' },
    { id: 'vertical', label: 'Vertical' },
    { id: 'diagonal-ne', label: 'Diagonal', icon: <ArrowUpRight className="w-3 h-3 inline ml-1" /> },
    { id: 'diagonal-se', label: 'Diagonal', icon: <ArrowDownRight className="w-3 h-3 inline ml-1 text-sky-400" /> },
    { id: 'grid-mesh', label: 'Grid Mesh' },
    { id: 'diagonal-mesh', label: 'Diagonal Mesh' },
    { id: 'radial', label: 'Radial' },
    { id: 'parametric', label: 'Parametric' },
  ];

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-black"
      />

      {/* Floating Grid Controls Dock (Bottom-Right on Desktop, Top-Right/Floating on Mobile) */}
      <div className="fixed bottom-20 right-4 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end space-y-2">
        {!controlsOpen ? (
          <button
            onClick={() => setControlsOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-full tactile-btn text-xs font-semibold"
            title="Customize Interactive Grid Physics"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Grid Controls</span>
          </button>
        ) : (
          <div className="w-72 bg-zinc-950/92 backdrop-blur-xl border border-white/15 rounded-2xl p-3.5 shadow-2xl text-zinc-200 space-y-2.5 max-h-[75vh] overflow-y-auto">
            {/* Top Action Buttons matching v0 reference */}
            <button
              onClick={() => setAudioEnabled((v) => !v)}
              className="w-full py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-semibold flex items-center justify-center space-x-2 transition"
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Audio On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Audio Off</span>
                </>
              )}
            </button>

            <button
              onClick={() => setControlsOpen(false)}
              className="w-full py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-semibold flex items-center justify-center space-x-2 transition"
            >
              <EyeOff className="w-3.5 h-3.5 text-zinc-400" />
              <span>Hide Controls</span>
            </button>

            {/* Orientation 2x4 Grid */}
            <div className="pt-1 border-t border-white/10">
              <div className="text-[11px] font-semibold text-zinc-400 mb-2">Orientation</div>
              <div className="grid grid-cols-2 gap-1.5">
                {orientations.map((o) => {
                  const active = config.orientation === o.id;
                  return (
                    <button
                      key={o.id}
                      onClick={() => setConfig({ ...config, orientation: o.id })}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-medium border transition ${
                        active
                          ? 'bg-zinc-600/80 text-white border-white/30'
                          : 'bg-zinc-900/90 text-zinc-300 border-white/10 hover:bg-zinc-800'
                      }`}
                    >
                      {o.label}
                      {o.icon}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Physics Sliders */}
            <div className="space-y-2.5 pt-1">
              <SliderControl
                label="Line Spacing"
                valueDisplay={`${config.lineSpacing}px`}
                min={15}
                max={80}
                step={1}
                value={config.lineSpacing}
                onChange={(v) => setConfig({ ...config, lineSpacing: v })}
              />
              <SliderControl
                label="Line Thickness"
                valueDisplay={`${config.lineThickness.toFixed(1)}px`}
                min={0.5}
                max={4}
                step={0.1}
                value={config.lineThickness}
                onChange={(v) => setConfig({ ...config, lineThickness: v })}
              />
              <SliderControl
                label="Repel Distance"
                valueDisplay={`${config.repelDistance}px`}
                min={50}
                max={350}
                step={5}
                value={config.repelDistance}
                onChange={(v) => setConfig({ ...config, repelDistance: v })}
              />
              <SliderControl
                label="Repel Force"
                valueDisplay={config.repelForce.toFixed(2)}
                min={0.1}
                max={2.5}
                step={0.05}
                value={config.repelForce}
                onChange={(v) => setConfig({ ...config, repelForce: v })}
              />
              <SliderControl
                label="Spring Strength"
                valueDisplay={config.springStrength.toFixed(3)}
                min={0.002}
                max={0.1}
                step={0.002}
                value={config.springStrength}
                onChange={(v) => setConfig({ ...config, springStrength: v })}
              />
              <SliderControl
                label="Damping"
                valueDisplay={config.damping.toFixed(2)}
                min={0.5}
                max={0.95}
                step={0.01}
                value={config.damping}
                onChange={(v) => setConfig({ ...config, damping: v })}
              />
              <SliderControl
                label="Line Opacity"
                valueDisplay={config.lineOpacity.toFixed(2)}
                min={0.05}
                max={1}
                step={0.05}
                value={config.lineOpacity}
                onChange={(v) => setConfig({ ...config, lineOpacity: v })}
              />
            </div>

            <button
              onClick={() => setConfig(DEFAULT_CONFIG)}
              className="w-full py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-semibold flex items-center justify-center space-x-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
              <span>Reset to Defaults</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

interface SliderControlProps {
  label: string;
  valueDisplay: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (val: number) => void;
}

const SliderControl: React.FC<SliderControlProps> = ({
  label,
  valueDisplay,
  min,
  max,
  step,
  value,
  onChange,
}) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between text-[11px]">
      <span className="font-medium text-zinc-300">{label}</span>
      <span className="font-mono text-zinc-400 tabular-nums">{valueDisplay}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
    />
  </div>
);
