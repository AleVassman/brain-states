import * as THREE from 'three';
import type { Frame, RegionInfo } from '../score/types';
import { activityToAppearance, displayLevel } from './appearance';
import { CONTEXT_GROUPS, type Atlas } from './atlas';
import { glowPointsMaterial, glowSurfaceMaterial } from './materials';
import type { Stage } from './scene';

/** How quickly a region's glow follows a change in activity (per second). */
const FOLLOW_RATE = 10;
const SHIMMER_DEPTH = 0.08;
const SHIMMER_SPEED = 0.8;

interface RegionVisual {
  info: RegionInfo;
  surface: THREE.ShaderMaterial;
  points: THREE.ShaderMaterial | null;
  /** Used only for clicking; never drawn. */
  pickMesh: THREE.Mesh | null;
  current: number;
  target: number;
  phase: number;
  /** Context regions are drawn fainter than the regions a score can light up. */
  gain: number;
  /** Dots overlap heavily, so they are drawn much fainter than the surface. */
  pointGain: number;
}

/** Draws every brain region and turns a Frame's activity values into glow. */
export class RegionLayer {
  private visuals = new Map<string, RegionVisual>();
  private pickGroup = new THREE.Group();
  private raycaster = new THREE.Raycaster();
  private time = 0;
  /** 0 = no state loaded; 1 = a state is showing and the surroundings are dimmed to let it stand out. */
  private focus = 0;
  private focusTarget = 0;

  constructor(private readonly stage: Stage, atlas: Atlas) {
    const group = new THREE.Group();
    stage.scene.add(group);

    atlas.regions.forEach((info, index) => {
      const isCortex = info.group === 'cortex';
      const isContext = CONTEXT_GROUPS.includes(info.group);

      let geometry: THREE.BufferGeometry;
      if (info.kind === 'marker') {
        geometry = new THREE.SphereGeometry(info.radius ?? 0.03, 24, 16);
        geometry.translate(...info.centroid);
      } else {
        const mesh = atlas.meshes.get(info.id);
        if (!mesh) return;
        geometry = mesh.geometry;
      }

      const surface = isCortex
        ? glowSurfaceMaterial({ base: 0.0, rim: 0.13, power: 4.0 })
        : isContext
          ? glowSurfaceMaterial({ base: 0.0, rim: 0.08, power: 3.0 })
          : glowSurfaceMaterial({ base: 0.006, rim: 0.11, power: 2.2 });
      const surfaceMesh = new THREE.Mesh(geometry, surface);
      surfaceMesh.renderOrder = isContext ? 1 : 2;
      group.add(surfaceMesh);

      let points: THREE.ShaderMaterial | null = null;
      if (info.kind === 'mesh') {
        points = glowPointsMaterial(isCortex ? 0.011 : 0.014);
        const cloud = new THREE.Points(geometry, points);
        cloud.renderOrder = surfaceMesh.renderOrder;
        group.add(cloud);
      }

      let pickMesh: THREE.Mesh | null = null;
      if (!isContext) {
        pickMesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
        pickMesh.userData.regionId = info.id;
        this.pickGroup.add(pickMesh);
      }

      this.visuals.set(info.id, {
        info,
        surface,
        points,
        pickMesh,
        current: 0,
        target: 0,
        phase: index * 2.399963, // golden angle, so neighbours shimmer out of step
        gain: isContext ? 0.55 : 1,
        pointGain: isCortex ? 0.04 : isContext ? 0.03 : 0.05,
      });
    });
    this.pickGroup.updateMatrixWorld(true);
    this.update(0);
  }

  /** Set where each region's activity should head. `null`, or a region missing from the frame, means baseline. */
  apply(frame: Frame | null): void {
    for (const [id, visual] of this.visuals) {
      visual.target = displayLevel(frame?.regions.get(id) ?? 0);
    }
  }

  /** Dim the context-only outlines while a state is showing, so the regions that change stand out. */
  setFocus(on: boolean): void {
    this.focusTarget = on ? 1 : 0;
  }

  /** Mark regions whose evidence is mixed or debated; they are drawn hatched. */
  setUncertain(ids: Set<string>): void {
    for (const [id, visual] of this.visuals) {
      visual.surface.uniforms.uHatch.value = ids.has(id) ? 1 : 0;
    }
  }

  update(dt: number): void {
    this.time += dt;
    const follow = 1 - Math.exp(-FOLLOW_RATE * dt);
    const pointScale = this.stage.canvas.clientHeight || 800;
    this.focus += (this.focusTarget - this.focus) * (1 - Math.exp(-3 * dt));
    for (const visual of this.visuals.values()) {
      visual.current += (visual.target - visual.current) * follow;
      const look = activityToAppearance(visual.current);
      const shimmer = 1 + SHIMMER_DEPTH * Math.sin(this.time * SHIMMER_SPEED + visual.phase);
      const isContext = visual.pickMesh === null;
      // Context dims to 45% and untouched regions to 70% while a state shows; regions that change keep full strength.
      const quiet = Math.abs(visual.current) < 0.05;
      const focusDim = isContext ? 1 - 0.55 * this.focus : quiet ? 1 - 0.3 * this.focus : 1;
      const intensity = look.intensity * shimmer * visual.gain * focusDim;
      visual.surface.uniforms.uFill.value = Math.max(0, visual.current) * 0.035;
      visual.surface.uniforms.uOutline.value = Math.max(0, -visual.current) * 0.55;
      (visual.surface.uniforms.uColor.value as THREE.Color).setRGB(look.color[0], look.color[1], look.color[2]);
      visual.surface.uniforms.uIntensity.value = intensity;
      if (visual.points) {
        (visual.points.uniforms.uColor.value as THREE.Color).setRGB(look.color[0], look.color[1], look.color[2]);
        visual.points.uniforms.uIntensity.value = intensity * visual.pointGain;
        visual.points.uniforms.uScale.value = pointScale;
      }
    }
  }

  /** The region under a screen position, nearest to the camera first; null if none. */
  pick(clientX: number, clientY: number): RegionInfo | null {
    const rect = this.stage.canvas.getBoundingClientRect();
    const pointer = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(pointer, this.stage.camera);
    const hits = this.raycaster.intersectObjects(this.pickGroup.children, false);
    if (hits.length === 0) return null;
    const id = hits[0].object.userData.regionId as string;
    return this.visuals.get(id)?.info ?? null;
  }
}
