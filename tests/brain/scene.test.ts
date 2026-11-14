import { describe, expect, it } from 'vitest';
import { createStage } from '../../src/brain/scene';

describe('createStage', () => {
  it('reports an error instead of throwing when WebGL is unavailable', () => {
    const canvas = {
      getContext: () => null,
      addEventListener: () => {},
      removeEventListener: () => {},
      style: {},
      clientWidth: 800,
      clientHeight: 600,
    } as unknown as HTMLCanvasElement;
    const stage = createStage(canvas);
    expect('error' in stage).toBe(true);
    if ('error' in stage) expect(stage.error).toContain('WebGL');
  });
});
