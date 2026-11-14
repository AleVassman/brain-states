import './style.css';
import { loadAtlas } from './brain/atlas';
import { Backdrop } from './brain/backdrop';
import { ConnectionLayer } from './brain/connections';
import { RegionLayer } from './brain/regions';
import { createStage } from './brain/scene';

function showFatal(message: string) {
  const canvas = document.getElementById('stage');
  if (canvas) canvas.style.display = 'none';
  const box = document.createElement('div');
  box.className = 'fatal';
  box.textContent = message;
  document.body.appendChild(box);
}

async function start() {
  const canvas = document.getElementById('stage') as HTMLCanvasElement;
  const stage = createStage(canvas);
  if ('error' in stage) {
    showFatal(stage.error);
    return;
  }
  stage.onContextLost(() => showFatal('The graphics context was lost. Reload the page to continue.'));

  const atlas = await loadAtlas();
  const backdrop = new Backdrop(stage, atlas);
  const regions = new RegionLayer(stage, atlas);
  const connections = new ConnectionLayer(stage, atlas.regions);

  if (import.meta.env.DEV) {
    // For poking at the scene from the browser console while developing.
    (window as unknown as { __brain: unknown }).__brain = { stage, regions, connections, atlas };
  }

  window.addEventListener('resize', () => stage.resize());
  // Also catches the canvas getting its size after the first frame (a tab opened in the background).
  new ResizeObserver(() => stage.resize()).observe(canvas);

  // If frames are slow for a couple of seconds, render a little less sharply. Steps down, never back up.
  const qualitySteps = [1, 0.8, 0.65];
  let quality = 0;
  let slowTime = 0;

  let last = performance.now();
  const loop = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    slowTime = dt > 1 / 40 ? slowTime + dt : Math.max(0, slowTime - dt);
    if (slowTime > 2 && quality < qualitySteps.length - 1) {
      quality++;
      slowTime = 0;
      stage.setQuality(qualitySteps[quality]);
    }
    regions.update(dt);
    connections.update(dt);
    backdrop.update(dt);
    stage.render(dt);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

start().catch((error: unknown) => {
  showFatal(error instanceof Error ? error.message : 'Something went wrong while loading.');
});
