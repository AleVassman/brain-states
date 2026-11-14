import * as THREE from 'three';

/**
 * A see-through "x-ray" surface: faint where it faces the camera, bright where
 * it turns edge-on. On a folded surface that draws the folds as glowing lines.
 * Added on top of whatever is behind it, and never hides anything.
 */
export function glowSurfaceMaterial(options: { base: number; rim: number; power: number }): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(1, 1, 1) },
      uIntensity: { value: 1 },
      uBase: { value: options.base },
      uRim: { value: options.rim },
      uPower: { value: options.power },
      uHatch: { value: 0 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uIntensity;
      uniform float uBase;
      uniform float uRim;
      uniform float uPower;
      uniform float uHatch;
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        // Clamped: a value a hair outside 0..1 would make pow() undefined and blank the whole frame.
        float facing = clamp(abs(dot(normalize(vNormal + 1e-6), normalize(vView))), 0.0, 1.0);
        float glow = uBase + uRim * pow(1.0 - facing, uPower);
        // Diagonal hatching marks a region whose evidence is mixed or debated.
        float stripe = step(0.5, fract((gl_FragCoord.x + gl_FragCoord.y) / 7.0));
        glow *= mix(1.0, 0.25 + 0.75 * stripe, uHatch);
        gl_FragColor = vec4(uColor * uIntensity * glow, 1.0);
      }
    `,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide,
  });
}

/** Small soft dots at a mesh's vertices. */
export function glowPointsMaterial(size: number): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(1, 1, 1) },
      uIntensity: { value: 1 },
      uSize: { value: size },
      uScale: { value: 1 },
    },
    vertexShader: /* glsl */ `
      uniform float uSize;
      uniform float uScale;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = max(1.0, uSize * uScale / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uIntensity;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.1, d);
        gl_FragColor = vec4(uColor * uIntensity * a, 1.0);
      }
    `,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
    depthTest: false,
  });
}
