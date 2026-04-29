import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// --- Game tuning knobs ---
// ARENA: half-extent of the play area (meters). A cycle is dead if it leaves
// [-ARENA, ARENA] on either axis.
// TICK_MS: simulation step interval. Each tick advances every alive cycle by
// one grid cell.
// MAX_TRAIL: maximum trail length per cycle before the oldest point is dropped.
// Caps memory and per-tick collision-check cost.
// FORWARD_BIAS: probability that a cycle continues forward when forward is a
// safe move. Lower => more chaotic / shorter rounds.
// RESPAWN_MS: delay after both cycles die before a new round spawns.
const ARENA = 40
const TICK_MS = 80
const MAX_TRAIL = 300
const FORWARD_BIAS = 0.6
const RESPAWN_MS = 1500

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

function spawnCycle(id: CycleState['id']): CycleState {
  // Spawn in opposite corners moving toward each other.
  const x = id === 'cyan' ? -ARENA * 0.6 : ARENA * 0.6
  const z = id === 'cyan' ? -ARENA * 0.6 : ARENA * 0.6
  const dir: Dir = id === 'cyan' ? 'S' : 'N'
  const pos = new THREE.Vector3(x, 0, z)
  return { id, pos: pos.clone(), dir, trail: [pos.clone()], alive: true }
}

function freshRound(): CycleState[] {
  return [spawnCycle('cyan'), spawnCycle('magenta')]
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
  if (safe.includes(forward) && Math.random() < FORWARD_BIAS) return forward
  return safe[Math.floor(Math.random() * safe.length)]
}

export function useLightcycleAI() {
  const [cycles, setCycles] = useState<CycleState[]>(freshRound)
  const respawnTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Step the simulation. The setCycles updater must stay pure — respawn
  // scheduling lives in a separate effect that watches `cycles` so it can
  // tolerate StrictMode's double-invocation of updaters.
  useEffect(() => {
    const interval = setInterval(() => {
      setCycles(prev =>
        prev.map(c => {
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
        }),
      )
    }, TICK_MS)
    return () => clearInterval(interval)
  }, [])

  // Schedule a single respawn whenever every cycle is dead. Clearing any
  // pending timer first keeps StrictMode (or rapid state updates) from
  // queueing duplicate respawns.
  useEffect(() => {
    const allDead = cycles.length > 0 && cycles.every(c => !c.alive)
    if (!allDead) return
    if (respawnTimer.current) clearTimeout(respawnTimer.current)
    respawnTimer.current = setTimeout(() => {
      setCycles(freshRound())
      respawnTimer.current = null
    }, RESPAWN_MS)
    return () => {
      if (respawnTimer.current) {
        clearTimeout(respawnTimer.current)
        respawnTimer.current = null
      }
    }
  }, [cycles])

  return cycles
}
