import './style.css';
import credits from '../CREDITS.md?raw';
import { loadAtlas, scoreRegionNames } from './brain/atlas';
import { Backdrop } from './brain/backdrop';
import { ConnectionLayer } from './brain/connections';
import { RegionLayer } from './brain/regions';
import { createStage } from './brain/scene';
import { Player } from './player/player';
import { loadScore, loadScoreIndex, type ScoreIndexEntry } from './score/load';
import type { RegionInfo, Score, VariantName } from './score/types';
import { setupAbout } from './ui/about';
import { activityLabels } from './ui/activityLabels';
import { createLabelLayer } from './ui/labelLayer';
import { updateCaption } from './ui/caption';
import { renderSidePanel, type PanelView } from './ui/sidePanel';
import { createStatePicker } from './ui/statePicker';
import { relatedEntries } from './ui/related';
import { createTimeline } from './ui/timeline';

const NO_TYPICAL = 'No comparison: the research does not support one for this state.';

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

function showFatal(message: string) {
  byId('stage').style.display = 'none';
  byId('ui').style.display = 'none';
  const box = document.createElement('div');
  box.className = 'fatal';
  box.textContent = message;
  document.body.appendChild(box);
}

/** Region ids whose evidence in this variant is mixed or debated; they are drawn hatched. */
function uncertainIds(score: Score | null, variant: VariantName, regions: RegionInfo[]): Set<string> {
  const ids = new Set<string>();
  const tracks = (variant === 'typical' ? score?.typical : score?.condition)?.regions ?? [];
  for (const track of tracks) {
    if (track.confidence === 'established') continue;
    for (const r of regions) if (r.id === track.region || r.group === track.region) ids.add(r.id);
  }
  return ids;
}

async function start() {
  const canvas = byId<HTMLCanvasElement>('stage');
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
  const player = new Player(atlas.regions);
  const regionNames = scoreRegionNames(atlas.regions);

  // ---- Interface ---------------------------------------------------------------------------
  const sidePanel = byId('side-panel');
  const typicalToggle = byId<HTMLInputElement>('typical-toggle');
  const typicalNote = byId('typical-note');
  const timeline = createTimeline(byId('timeline'), player);
  const labelLayer = createLabelLayer(byId('labels'), stage, atlas.regions);
  const labelsToggle = byId<HTMLInputElement>('labels-toggle');
  labelsToggle.addEventListener('change', () => {
    labelLayer.setEnabled(labelsToggle.checked);
    labelsToggle.blur();
  });
  setupAbout(byId<HTMLDialogElement>('about'), byId('about-open'), credits);

  let selectedRegion: RegionInfo | null = null;
  let loadError: { title: string; errors: string[] } | null = null;
  let panelKey = '';

  const panelView = (): PanelView => {
    if (selectedRegion) {
      return { kind: 'region', region: selectedRegion, score: player.score, variant: player.variant, regions: atlas.regions };
    }
    if (loadError) return { kind: 'errors', ...loadError };
    if (player.score) {
      return { kind: 'state', score: player.score, variant: player.variant, regions: atlas.regions, related: relatedEntries(player.score.id, entries) };
    }
    return { kind: 'empty' };
  };

  let shownScore: Score | null | undefined;
  let shownVariant: VariantName | undefined;
  const refresh = () => {
    const frame = player.frame();
    regions.apply(frame);
    connections.apply(frame);

    if (player.score !== shownScore || player.variant !== shownVariant) {
      shownScore = player.score;
      shownVariant = player.variant;
      regions.setUncertain(uncertainIds(player.score, player.variant, atlas.regions));
      regions.setFocus(player.score !== null);
    }

    timeline.update();
    updateCaption(byId('caption'), byId('banner'), player);

    const hasTypical = Boolean(player.score?.typical);
    typicalToggle.disabled = !hasTypical;
    typicalToggle.checked = player.variant === 'typical';
    const noComparison = player.score && !hasTypical ? NO_TYPICAL : '';
    typicalNote.textContent = noComparison;
    byId('typical-label').title = noComparison;

    // The side panel is rebuilt only when what it shows changes, so links in it stay clickable during playback.
    const key = [selectedRegion?.id, player.score?.id, player.variant, loadError?.title, loadError?.errors.length].join('|');
    if (key !== panelKey) {
      panelKey = key;
      renderSidePanel(sidePanel, panelView(), (entry) => void pickEntry(entry));
    }
  };
  player.onChange(refresh);

  typicalToggle.addEventListener('change', () => {
    player.setVariant(typicalToggle.checked ? 'typical' : 'condition');
    typicalToggle.blur(); // so the space bar goes back to play and pause
  });

  // ---- States ------------------------------------------------------------------------------
  let entries: ScoreIndexEntry[] = [];
  try {
    entries = await loadScoreIndex();
  } catch {
    loadError = { title: 'States', errors: ['The list of states could not be loaded.'] };
  }
  let request = 0;
  const pickEntry = async (entry: ScoreIndexEntry) => {
    const mine = ++request;
    picker.setSelected(entry.id);
    // Hand the keyboard back to the page, so the space bar plays instead of pressing this button again.
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    selectedRegion = null;
    const result = await loadScore(entry.file, regionNames);
    if (mine !== request) return; // a later pick overtook this one
    if (result.ok) {
      loadError = null;
      player.load(result.score);
    } else {
      loadError = { title: entry.title, errors: result.errors };
      player.load(null);
    }
  };
  const picker = createStatePicker(byId('state-list'), entries, (entry) => void pickEntry(entry));

  // ---- Clicking a region (a click, not the end of a drag) -------------------------------------
  let down: { x: number; y: number } | null = null;
  canvas.addEventListener('pointerdown', (event) => {
    down = { x: event.clientX, y: event.clientY };
  });
  canvas.addEventListener('pointerup', (event) => {
    if (!down) return;
    const moved = Math.hypot(event.clientX - down.x, event.clientY - down.y);
    down = null;
    if (moved > 5) return;
    selectedRegion = regions.pick(event.clientX, event.clientY);
    refresh();
  });

  window.addEventListener('keydown', (event) => {
    if (event.code !== 'Space' || !player.score) return;
    if (byId<HTMLDialogElement>('about').open) return;
    if (event.target instanceof HTMLElement && ['BUTTON', 'INPUT', 'A'].includes(event.target.tagName)) return;
    event.preventDefault();
    if (player.playing) player.pause();
    else player.play();
  });

  if (import.meta.env.DEV) {
    // For poking at the scene from the browser console while developing.
    (window as unknown as { __brain: unknown }).__brain = { stage, regions, connections, atlas, player };
  }

  window.addEventListener('resize', () => stage.resize());
  // Also catches the canvas getting its size after the first frame (a tab opened in the background).
  new ResizeObserver(() => stage.resize()).observe(canvas);

  // If frames are slow for a couple of seconds, render a little less sharply. Steps down, never back up.
  const qualitySteps = [1, 0.8, 0.65];
  let quality = 0;
  let slowTime = 0;

  refresh();
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
    player.tick(dt);
    regions.update(dt);
    connections.update(dt);
    backdrop.update(dt);
    stage.render(dt);
    labelLayer.update(activityLabels(player.frame(), atlas.regions));
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

start().catch((error: unknown) => {
  showFatal(error instanceof Error ? error.message : 'Something went wrong while loading.');
});
