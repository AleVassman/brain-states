import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export interface Stage {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  canvas: HTMLCanvasElement;
  /** Advance camera easing and draw one frame. */
  render(dt: number): void;
  resize(): void;
  /** Where a point in the scene lands on the page, in CSS pixels relative to the canvas. */
  project(point: [number, number, number]): { x: number; y: number; depth: number; behind: boolean };
  /** Render at a fraction of full sharpness (1 = full). Used to keep slow graphics chips smooth. */
  setQuality(scale: number): void;
  dispose(): void;
  /** Called if the browser takes the graphics context away. */
  onContextLost(cb: () => void): void;
}

export const WEBGL_MESSAGE = 'This needs WebGL, which your browser or graphics driver has turned off.';

const BACKGROUND = 0x05070d;
/** Roughly the middle of the head, in scene units. */
const FOCUS = new THREE.Vector3(0, -0.22, -0.1);

export function createStage(canvas: HTMLCanvasElement): Stage | { error: string } {
  let context: WebGL2RenderingContext | null = null;
  try {
    context = canvas.getContext('webgl2', { antialias: true, alpha: false }) as WebGL2RenderingContext | null;
  } catch {
    context = null;
  }
  if (!context) return { error: WEBGL_MESSAGE };

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, context, antialias: true });
  } catch {
    return { error: WEBGL_MESSAGE };
  }
  const fullPixelRatio = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(fullPixelRatio);
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.toneMappingExposure = 1;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BACKGROUND);
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  // From the brain's left and slightly in front: the face points to screen-left.
  camera.position.set(6.7, 0.35, 2.3);

  const controls = new OrbitControls(camera, canvas);
  controls.target.copy(FOCUS);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 1.6;
  controls.maxDistance = 11;
  controls.rotateSpeed = 0.7;
  controls.update();

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.6, 0, 0.2);
  // Keep the glow close to its source. The default mix spreads a faint veil over
  // the whole frame, which turns the near-black background grey.
  (bloom as unknown as { compositeMaterial: THREE.ShaderMaterial }).compositeMaterial.uniforms.bloomFactors.value = [
    1.0, 0.7, 0.3, 0.06, 0.0,
  ];
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  const resize = () => {
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    if (width < 1 || height < 1) return;
    renderer.setSize(width, height, false);
    composer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  resize();

  const projected = new THREE.Vector3();
  const lostCallbacks: (() => void)[] = [];
  const onLost = (event: Event) => {
    event.preventDefault();
    for (const cb of lostCallbacks) cb();
  };
  canvas.addEventListener('webglcontextlost', onLost);

  return {
    scene,
    camera,
    canvas,
    render() {
      controls.update();
      composer.render();
    },
    resize,
    project(point) {
      projected.set(point[0], point[1], point[2]);
      const depth = projected.distanceTo(camera.position);
      projected.project(camera);
      return {
        x: ((projected.x + 1) / 2) * canvas.clientWidth,
        y: ((1 - projected.y) / 2) * canvas.clientHeight,
        depth,
        behind: projected.z > 1,
      };
    },
    setQuality(scale) {
      renderer.setPixelRatio(fullPixelRatio * scale);
      composer.setPixelRatio(fullPixelRatio * scale);
      resize();
    },
    dispose() {
      canvas.removeEventListener('webglcontextlost', onLost);
      controls.dispose();
      composer.dispose();
      renderer.dispose();
    },
    onContextLost(cb) {
      lostCallbacks.push(cb);
    },
  };
}
