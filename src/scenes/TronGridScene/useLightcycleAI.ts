import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'

export type Dir = 'N' | 'S' | 'E' | 'W'
const DIR_VEC: Record<Dir, [number, number]> = {
  N: [0, -1], S: [0, 1], E: [1, 0], W: [-1, 0],
}
const TURN_LEFT: Record<Dir, Dir> = { N: 'W', W: 'S', S: 'E', E: 'N' }
const TURN_RIGHT: Record<Dir, Dir> = { N: 'E', E: 'S', S: 'W', W: 'N' }

export type CycleState = {
  id: 'cyan' | 'magenta'
  pos: THREE.Vector3
  dir: Dir
  trail: THREE.Vector3[]
  alive: boolean
}

const ARENA = 40 // half-extent
const TICK_MS = 80
const MAX_TRAIL = 300

function spawnCycle(id: CycleState['id'], seed: number): CycleState {
  // Spawn in opposite corners
  const x = id === 'cyan' ? -ARENA * 0.6 : ARENA * 0.6
  const z = id === 'cyan' ? -ARENA * 0.6 : ARENA * 0.6
  const dir: Dir = id === 'cyan' ? 'S' : 'N'
  const pos = new THREE.Vector3(x, 0, z)
  return { id, pos: pos.clone(), dir, trail: [pos.clone()], alive: true }
}

function occupied(x: number, z: number, cycles: CycleState[]): boolean {
  if (Math.abs(x) > ARENA || Math.abs(z) > ARENA) return true
  for (const c of cycles) {
    for (const t of c.trail) {
      if (Math.abs(t.x - x) < 0.5 && Math.abs(t.z - z) < 0.5) return true
    }
  }
  return false
}

function chooseDir(c: CycleState, cycles: CycleState[]): Dir {
  const forward = c.dir
  const left = TURN_LEFT[c.dir]
  const right = TURN_RIGHT[c.dir]
  const options: Dir[] = [forward, left, right]
  const safe = options.filter(d => {
    const [dx, dz] = DIR_VEC[d]
    return !occupied(c.pos.x + dx, c.pos.z + dz, cycles)
  })
  if (safe.length === 0) return forward // doomed
  if (safe.includes(forward) && Math.random() < 0.6) return forward
  return safe[Math.floor(Math.random() * safe.length)]
}

export function useLightcycleAI() {
  const [cycles, setCycles] = useState<CycleState[]>([
    spawnCycle('cyan', 1),
    spawnCycle('magenta', 2),
  ])
  const cyclesRef = useRef(cycles)
  cyclesRef.current = cycles

  const reset = useCallback(() => {
    setTimeout(() => {
      setCycles([spawnCycle('cyan', Math.random()), spawnCycle('magenta', Math.random())])
    }, 1500)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCycles(prev => {
        const next = prev.map(c => {
          if (!c.alive) return c
          const dir = chooseDir(c, prev)
          const [dx, dz] = DIR_VEC[dir]
          const newX = c.pos.x + dx
          const newZ = c.pos.z + dz
          if (occupied(newX, newZ, prev)) {
            return { ...c, alive: false }
          }
          const newPos = new THREE.Vector3(newX, 0, newZ)
          const trail = [...c.trail, newPos]
          if (trail.length > MAX_TRAIL) trail.shift()
          return { ...c, pos: newPos, dir, trail }
        })
        if (next.every(c => !c.alive)) {
          setTimeout(() => setCycles([
            spawnCycle('cyan', Math.random()),
            spawnCycle('magenta', Math.random()),
          ]), 1500)
        }
        return next
      })
    }, TICK_MS)
    return () => clearInterval(interval)
  }, [])

  return cycles
}
