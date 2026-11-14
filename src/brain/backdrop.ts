import * as THREE from 'three';
import type { Atlas } from './atlas';
import type { Stage } from './scene';

const HEAD_COLOR = new THREE.Color(0x2f8fff);
const PARTICLE_COUNT = 420;

/** Shared by the head's lines and dots: fades the head out towards the neck. */
const HEAD_VERTEX = /* glsl */ `
  uniform float uSize;
  uniform float uScale;
  varying float vFade;
  void main() {
    vFade = smoothstep(-0.74, -0.58, position.y);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = max(1.0, uSize * uScale / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

function headMaterial(opacity: number, round: boolean, size = 0): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: HEAD_COLOR },
      uOpacity: { value: opacity },
      uSize: { value: size },
      uScale: { value: 800 },
    },
    vertexShader: HEAD_VERTEX,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vFade;
      void main() {
        float a = uOpacity * vFade;
        ${round ? 'a *= smoothstep(0.5, 0.15, length(gl_PointCoord - 0.5));' : ''}
        gl_FragColor = vec4(uColor * a, 1.0);
      }
    `,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
    depthTest: false,
  });
}

/** The see-through head and the drifting out-of-focus particles. Decoration only. */
export class Backdrop {
  private particles: THREE.ShaderMaterial;
  private headPoints: THREE.ShaderMaterial | null = null;
  private time = 0;

  constructor(private readonly stage: Stage, atlas: Atlas) {
    if (atlas.head) {
      const lines = new THREE.LineSegments(new THREE.WireframeGeometry(atlas.head.geometry), headMaterial(0.07, false));
      lines.renderOrder = 0;
      stage.scene.add(lines);
      this.headPoints = headMaterial(0.3, true, 0.009);
      const dots = new THREE.Points(atlas.head.geometry, this.headPoints);
      dots.renderOrder = 0;
      stage.scene.add(dots);
    }

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const seeds = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // A wide shell around the head, so nothing drifts in front of the brain itself.
      const radius = 2.2 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi) * 0.7;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      seeds[i * 3] = Math.random(); // size
      seeds[i * 3 + 1] = Math.random(); // warm or cool
      seeds[i * 3 + 2] = Math.random() * Math.PI * 2; // drift phase
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('seed', new THREE.BufferAttribute(seeds, 3));
    this.particles = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uScale: { value: 800 } },
      vertexShader: /* glsl */ `
        attribute vec3 seed;
        uniform float uTime;
        uniform float uScale;
        varying float vWarm;
        varying float vAlpha;
        void main() {
          vec3 p = position;
          p.y += 0.12 * sin(uTime * 0.11 + seed.z);
          p.x += 0.10 * cos(uTime * 0.07 + seed.z * 1.7);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          // Capped, and faded out close to the camera, so a nearby particle never veils the whole view.
          gl_PointSize = min(46.0, uScale * (0.012 + 0.09 * seed.x * seed.x) / -mv.z);
          gl_Position = projectionMatrix * mv;
          vWarm = step(0.62, seed.y);
          vAlpha = (0.05 + 0.16 * (1.0 - seed.x)) * smoothstep(0.8, 2.5, -mv.z);
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vWarm;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d) * vAlpha;
          vec3 cool = vec3(0.16, 0.50, 1.0);
          vec3 warm = vec3(1.0, 0.42, 0.24);
          gl_FragColor = vec4(mix(cool, warm, vWarm) * a, 1.0);
        }
      `,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });
    const cloud = new THREE.Points(geometry, this.particles);
    cloud.frustumCulled = false;
    cloud.renderOrder = -1;
    stage.scene.add(cloud);
  }

  update(dt: number): void {
    this.time += dt;
    const scale = this.stage.canvas.clientHeight || 800;
    this.particles.uniforms.uTime.value = this.time;
    this.particles.uniforms.uScale.value = scale;
    if (this.headPoints) this.headPoints.uniforms.uScale.value = scale;
  }
}
