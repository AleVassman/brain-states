import { frameAt } from '../score/timeline';
import type { Frame, RegionInfo, Score, VariantName } from '../score/types';

/** Longest step one tick may take, so a tab that was hidden does not skip ahead. */
const MAX_TICK_SECONDS = 0.1;

/** Holds playback state for one score and turns it into frames. Knows nothing about rendering. */
export class Player {
  private _score: Score | null = null;
  private _t = 0;
  private _playing = false;
  private _variant: VariantName = 'condition';
  private listeners = new Set<() => void>();

  constructor(private readonly regions: RegionInfo[]) {}

  get score(): Score | null {
    return this._score;
  }
  get t(): number {
    return this._t;
  }
  get playing(): boolean {
    return this._playing;
  }
  get variant(): VariantName {
    return this._variant;
  }

  /** Replace the score. Always returns to the start, paused, showing the condition. */
  load(score: Score | null): void {
    this._score = score;
    this._t = 0;
    this._playing = false;
    this._variant = 'condition';
    this.emit();
  }

  play(): void {
    if (!this._score) return;
    if (this._t >= 1) this._t = 0;
    this._playing = true;
    this.emit();
  }

  pause(): void {
    this._playing = false;
    this.emit();
  }

  seek(t: number): void {
    this._t = Math.min(1, Math.max(0, t));
    this.emit();
  }

  setVariant(variant: VariantName): void {
    if (variant === 'typical' && !this._score?.typical) return;
    this._variant = variant;
    this.emit();
  }

  tick(dtSeconds: number): void {
    if (!this._playing || !this._score) return;
    const dt = Math.min(Math.max(dtSeconds, 0), MAX_TICK_SECONDS);
    this._t += dt / this._score.durationSeconds;
    if (this._t >= 1) {
      this._t = 1;
      this._playing = false;
    }
    this.emit();
  }

  frame(): Frame | null {
    if (!this._score) return null;
    return frameAt(this._score, this._variant, this._t, this.regions);
  }

  /** Calls `cb` after any change. Returns a function that stops the calls. */
  onChange(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private emit(): void {
    for (const cb of this.listeners) cb();
  }
}
