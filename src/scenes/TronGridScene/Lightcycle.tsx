import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import type { CycleState } from './useLightcycleAI'

export default function Lightcycle({ cycle }: { cycle: CycleState }) {
  const color = cycle.id === 'cyan' ? '#00f0ff' : '#ff2bd6'
  const points = useMemo(() => cycle.trail.map(p => new THREE.Vector3(p.x, 0.05, p.z)), [cycle.trail])

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(points)
    return g
  }, [points])

  // Manually dispose the BufferGeometry — r3f only auto-disposes geometries
  // declared as JSX children. Without this, each tick leaks GPU buffers.
  useEffect(() => () => geometry.dispose(), [geometry])

  const head = cycle.trail[cycle.trail.length - 1]

  return (
    <group>
      <line>
        <primitive attach="geometry" object={geometry} />
        <lineBasicMaterial color={color} linewidth={2} transparent opacity={cycle.alive ? 1 : 0.3} />
      </line>
      {points.slice(0, -1).map((p, i) => {
        const next = points[i + 1]
        const dx = next.x - p.x
        const dz = next.z - p.z
        const len = Math.sqrt(dx * dx + dz * dz)
        if (len === 0) return null
        const angle = Math.atan2(dz, dx)
        const mx = (p.x + next.x) / 2
        const mz = (p.z + next.z) / 2
        return (
          <mesh key={i} position={[mx, 0.5, mz]} rotation={[0, -angle, 0]}>
            <planeGeometry args={[len, 1]} />
            <meshBasicMaterial color={color} transparent opacity={0.35} side={THREE.DoubleSide} />
          </mesh>
        )
      })}
      {cycle.alive && head && (
        <mesh position={[head.x, 0.3, head.z]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshBasicMaterial color={color} />
        </mesh>
      )}
    </group>
  )
}
