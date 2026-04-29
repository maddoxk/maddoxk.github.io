import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function GridFloor() {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  // Hoist uniforms so an ancestor re-render doesn't reset uTime to 0
  // mid-animation by handing the material a fresh uniforms object.
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#00f0ff') },
      uLineWidth: { value: 0.02 },
      uGridSize: { value: 2.0 },
      uScrollSpeed: { value: 2.0 },
    }),
    [],
  )

  useFrame((_, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[200, 200, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        transparent
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vWorldPosition;
          void main() {
            vUv = uv;
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vWorldPosition = wp.xyz;
            gl_Position = projectionMatrix * viewMatrix * wp;
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor;
          uniform float uLineWidth;
          uniform float uGridSize;
          uniform float uScrollSpeed;
          varying vec3 vWorldPosition;

          float gridLine(float coord, float size, float width) {
            float line = abs(fract(coord / size - 0.5) - 0.5) / fwidth(coord / size);
            return 1.0 - min(line, 1.0);
          }

          void main() {
            float scrollZ = vWorldPosition.z + uTime * uScrollSpeed;
            float gx = gridLine(vWorldPosition.x, uGridSize, uLineWidth);
            float gz = gridLine(scrollZ, uGridSize, uLineWidth);
            float grid = max(gx, gz);

            // distance fade
            float dist = length(vWorldPosition.xz);
            float fade = 1.0 - smoothstep(10.0, 60.0, dist);

            vec3 col = uColor * grid * fade;
            float alpha = grid * fade;
            gl_FragColor = vec4(col, alpha);
          }
        `}
      />
    </mesh>
  )
}
