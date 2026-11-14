import * as THREE from 'three';
import type { Frame, RegionInfo } from '../score/types';
import { activityToAppearance } from './appearance';
import { connectionStyle, groupCentroid } from './connectionStyle';
import type { Stage } from './scene';

const CURVE_POINTS = 64;
const FOLLOW_RATE = 10;
/** Roughly the middle of the brain; curves bow away from it. */
const BRAIN_CENTRE = new THREE.Vector3(0, 0.1, -0.15);

const VERTEX = /* glsl */ `
  attribute float along;
  uniform float uPointSize;
  varying float vAlong;
  void main() {
    vAlong = along;
    gl_PointSize = uPointSize;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uDashed;
  uniform float uPhase;
  uniform float uPulse;
  uniform float uLine;
  varying float vAlong;
  void main() {
    // Two pulses on the line at any time, travelling from "from" to "to".
    float p = fract(vAlong * 2.0 - uPhase);
    float pulse = exp(-pow(min(p, 1.0 - p) * 14.0, 2.0)) * uPulse;
    float dash = mix(1.0, step(0.55, fract(vAlong * 22.0)), uDashed);
    float glow = uLine * uOpacity * dash * 0.6 + pulse * 0.8;
    gl_FragColor = vec4(uColor * glow, 1.0);
  }
`;

interface Link {
  uniforms: Record<string, THREE.IUniform>;
  objects: THREE.Object3D[];
  current: number;
  target: number;
}

/** Draws the lines between regions and the pulses travelling along them. */
export class ConnectionLayer {
  private links = new Map<string, Link>();
  private group = new THREE.Group();

  constructor(stage: Stage, private readonly regions: RegionInfo[]) {
    stage.scene.add(this.group);
  }

  /** Show exactly the connections in the frame. Any other line is removed at once. */
  apply(frame: Frame | null): void {
    const wanted = new Map<string, { from: string; to: string; v: number }>();
    for (const c of frame?.connections ?? []) wanted.set(`${c.from}>${c.to}`, c);

    for (const [key, link] of this.links) {
      if (wanted.has(key)) continue;
      for (const object of link.objects) {
        this.group.remove(object);
        (object as THREE.Line).geometry.dispose();
      }
      this.links.delete(key);
    }
    for (const [key, c] of wanted) {
      let link = this.links.get(key);
      if (!link) {
        link = this.create(c.from, c.to, c.v);
        this.links.set(key, link);
      }
      link.target = c.v;
    }
  }

  update(dt: number): void {
    const follow = 1 - Math.exp(-FOLLOW_RATE * dt);
    for (const link of this.links.values()) {
      link.current += (link.target - link.current) * follow;
      const style = connectionStyle(link.current);
      const look = activityToAppearance(link.current);
      (link.uniforms.uColor.value as THREE.Color).setRGB(look.color[0], look.color[1], look.color[2]);
      link.uniforms.uOpacity.value = style.opacity;
      link.uniforms.uDashed.value = style.dashed ? 1 : 0;
      link.uniforms.uPulse.value = Math.min(1, style.pulseRate);
      link.uniforms.uPhase.value = (link.uniforms.uPhase.value + style.pulseRate * dt) % 1000;
    }
  }

  private create(from: string, to: string, v: number): Link {
    const shared = {
      uColor: { value: new THREE.Color() },
      uOpacity: { value: 0 },
      uDashed: { value: 0 },
      uPhase: { value: Math.random() },
      uPulse: { value: 0 },
    };
    const material = (line: boolean) =>
      new THREE.ShaderMaterial({
        uniforms: { ...shared, uLine: { value: line ? 1 : 0 }, uPointSize: { value: 3.5 } },
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        depthTest: false,
      });
    const lineMaterial = material(true);
    const dotMaterial = material(false);

    const objects: THREE.Object3D[] = [];
    const starts = groupCentroid(from, this.regions);
    const ends = groupCentroid(to, this.regions);
    for (const start of starts) {
      // A paired structure connects to its own side where the other end has one.
      const sameSide = ends.filter((end) => start[0] * end[0] > 0);
      for (const end of sameSide.length > 0 ? sameSide : ends) {
        const geometry = curveGeometry(new THREE.Vector3(...start), new THREE.Vector3(...end));
        const line = new THREE.Line(geometry, lineMaterial);
        const dots = new THREE.Points(geometry, dotMaterial);
        line.renderOrder = 3;
        dots.renderOrder = 3;
        this.group.add(line, dots);
        objects.push(line, dots);
      }
    }
    return { uniforms: shared, objects, current: v, target: v };
  }
}

function curveGeometry(start: THREE.Vector3, end: THREE.Vector3): THREE.BufferGeometry {
  const middle = start.clone().add(end).multiplyScalar(0.5);
  const outward = middle.clone().sub(BRAIN_CENTRE);
  if (outward.lengthSq() < 1e-6) outward.set(0, 1, 0);
  outward.normalize().multiplyScalar(start.distanceTo(end) * 0.3);
  const curve = new THREE.QuadraticBezierCurve3(start, middle.add(outward), end);

  const positions = new Float32Array(CURVE_POINTS * 3);
  const along = new Float32Array(CURVE_POINTS);
  for (let i = 0; i < CURVE_POINTS; i++) {
    const t = i / (CURVE_POINTS - 1);
    const p = curve.getPoint(t);
    positions.set([p.x, p.y, p.z], i * 3);
    along[i] = t;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('along', new THREE.BufferAttribute(along, 1));
  return geometry;
}
