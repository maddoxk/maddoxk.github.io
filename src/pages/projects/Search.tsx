import React, { useState, useEffect, useRef, useCallback } from 'react'
import ProjectHero from '@/components/project/ProjectHero'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Pause, RotateCcw, StepForward, Trash2, Map, ShieldAlert, Sparkles } from 'lucide-react'

type Algorithm = 'bfs' | 'dfs' | 'dijkstra' | 'astar'
type ToolMode = 'wall' | 'start' | 'target' | 'erase'

interface Node {
  row: number
  col: number
  isStart: boolean
  isTarget: boolean
  isWall: boolean
  distance: number
  totalCost: number // for A*
  isVisited: boolean
  isPath: boolean
  previousNode: Node | null
}

const ROWS = 20
const COLS = 40

const PRESETS: Record<string, { start: [number, number]; target: [number, number]; walls: [number, number][] }> = {
  city_grid: {
    start: [2, 3],
    target: [17, 36],
    walls: (() => {
      const w: [number, number][] = []
      // Vertical main avenues
      for (let r = 0; r < ROWS; r++) {
        if (r !== 5 && r !== 14) {
          w.push([r, 10], [r, 20], [r, 30])
        }
      }
      // Horizontal cross streets
      for (let c = 0; c < COLS; c++) {
        if (c !== 5 && c !== 15 && c !== 25 && c !== 35) {
          w.push([8, c], [15, c])
        }
      }
      return w
    })(),
  },
  maze: {
    start: [1, 1],
    target: [18, 38],
    walls: (() => {
      const w: [number, number][] = []
      for (let r = 0; r < ROWS; r += 2) {
        for (let c = 0; c < COLS; c += 2) {
          if (!(r === 1 && c === 1) && !(r === 18 && c === 38)) {
            w.push([r, c])
            if (r + 1 < ROWS && (r + c) % 3 === 0) w.push([r + 1, c])
            if (c + 1 < COLS && (r * c) % 5 === 0) w.push([r, c + 1])
          }
        }
      }
      return w
    })(),
  },
  simple_barrier: {
    start: [10, 5],
    target: [10, 35],
    walls: (() => {
      const w: [number, number][] = []
      for (let r = 3; r < 17; r++) {
        w.push([r, 20])
      }
      return w
    })(),
  },
}

export default function Search() {
  const [grid, setGrid] = useState<Node[][]>([])
  const [isMousePressed, setIsMousePressed] = useState(false)
  const [tool, setTool] = useState<ToolMode>('wall')
  const [algorithm, setAlgorithm] = useState<Algorithm>('astar')
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [speed, setSpeed] = useState<number>(20) // ms delay
  const [stats, setStats] = useState<{ visitedCount: number; pathLength: number; executionTimeMs: number } | null>(null)

  const [startPos, setStartPos] = useState<[number, number]>([10, 6])
  const [targetPos, setTargetPos] = useState<[number, number]>([10, 33])

  // Refs for tracking animation frames
  const timeoutRef = useRef<number | null>(null)

  // Initialize empty grid
  const createInitialGrid = useCallback((sPos = startPos, tPos = targetPos, wallSet?: Set<string>) => {
    const newGrid: Node[][] = []
    for (let r = 0; r < ROWS; r++) {
      const currentRow: Node[] = []
      for (let c = 0; c < COLS; c++) {
        const key = `${r}-${c}`
        currentRow.push({
          row: r,
          col: c,
          isStart: r === sPos[0] && c === sPos[1],
          isTarget: r === tPos[0] && c === tPos[1],
          isWall: wallSet ? wallSet.has(key) : false,
          distance: Infinity,
          totalCost: Infinity,
          isVisited: false,
          isPath: false,
          previousNode: null,
        })
      }
      newGrid.push(currentRow)
    }
    return newGrid
  }, [startPos, targetPos])

  useEffect(() => {
    setGrid(createInitialGrid())
  }, [createInitialGrid])

  // Clear visualization states while keeping walls
  const resetVisualization = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsRunning(false)
    setIsFinished(false)
    setStats(null)
    setGrid(prev =>
      prev.map(row =>
        row.map(node => ({
          ...node,
          distance: Infinity,
          totalCost: Infinity,
          isVisited: false,
          isPath: false,
          previousNode: null,
        }))
      )
    )
  }

  // Clear everything including walls
  const clearBoard = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsRunning(false)
    setIsFinished(false)
    setStats(null)
    setGrid(createInitialGrid(startPos, targetPos))
  }

  // Load preset map
  const loadPreset = (presetKey: string) => {
    resetVisualization()
    const p = PRESETS[presetKey]
    if (!p) return
    setStartPos(p.start)
    setTargetPos(p.target)
    const wallSet = new Set(p.walls.map(([r, c]) => `${r}-${c}`))
    setGrid(createInitialGrid(p.start, p.target, wallSet))
  }

  // Handle cell interaction
  const handleMouseDown = (row: number, col: number) => {
    if (isRunning) return
    setIsMousePressed(true)
    updateCell(row, col)
  }

  const handleMouseEnter = (row: number, col: number) => {
    if (!isMousePressed || isRunning) return
    updateCell(row, col)
  }

  const handleMouseUp = () => {
    setIsMousePressed(false)
  }

  const updateCell = (r: number, c: number) => {
    if (isFinished) resetVisualization()
    setGrid(prev => {
      const next = prev.map(row => [...row])
      const targetNode = next[r][c]

      if (tool === 'start') {
        if (targetNode.isTarget || targetNode.isWall) return next
        next[startPos[0]][startPos[1]].isStart = false
        targetNode.isStart = true
        setStartPos([r, c])
      } else if (tool === 'target') {
        if (targetNode.isStart || targetNode.isWall) return next
        next[targetPos[0]][targetPos[1]].isTarget = false
        targetNode.isTarget = true
        setTargetPos([r, c])
      } else if (tool === 'wall') {
        if (!targetNode.isStart && !targetNode.isTarget) {
          targetNode.isWall = true
        }
      } else if (tool === 'erase') {
        targetNode.isWall = false
      }
      return next
    })
  }

  // --- Pathfinding Algorithms ---
  const runPathfinding = () => {
    if (isRunning) return
    resetVisualization()
    setIsRunning(true)

    const startTime = performance.now()
    const startNode = grid[startPos[0]][startPos[1]]
    const targetNode = grid[targetPos[0]][targetPos[1]]

    let visitedInOrder: Node[] = []

    if (algorithm === 'bfs') {
      visitedInOrder = bfs(grid, startNode, targetNode)
    } else if (algorithm === 'dfs') {
      visitedInOrder = dfs(grid, startNode, targetNode)
    } else if (algorithm === 'dijkstra') {
      visitedInOrder = dijkstra(grid, startNode, targetNode)
    } else if (algorithm === 'astar') {
      visitedInOrder = astar(grid, startNode, targetNode)
    }

    const pathInOrder = getNodesInShortestPathOrder(targetNode)
    const endTime = performance.now()

    animateSearch(visitedInOrder, pathInOrder, Math.round(endTime - startTime))
  }

  const animateSearch = (visitedNodes: Node[], shortestPath: Node[], execTime: number) => {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        timeoutRef.current = setTimeout(() => {
          animatePath(shortestPath, execTime, visitedNodes.length)
        }, speed * i)
        return
      }
      timeoutRef.current = setTimeout(() => {
        const node = visitedNodes[i]
        setGrid(prev => {
          const next = prev.map(row => [...row])
          next[node.row][node.col].isVisited = true
          return next
        })
      }, speed * i)
    }
  }

  const animatePath = (shortestPath: Node[], execTime: number, visitedCount: number) => {
    for (let i = 0; i < shortestPath.length; i++) {
      timeoutRef.current = setTimeout(() => {
        const node = shortestPath[i]
        setGrid(prev => {
          const next = prev.map(row => [...row])
          next[node.row][node.col].isPath = true
          return next
        })
        if (i === shortestPath.length - 1) {
          setIsRunning(false)
          setIsFinished(true)
          setStats({
            visitedCount,
            pathLength: shortestPath.length,
            executionTimeMs: execTime,
          })
        }
      }, 30 * i)
    }
  }

  return (
    <>
      <ProjectHero
        eyebrow="Algorithms & Interactive Simulation"
        title="Search & Pathfinding Visualizer"
        subtitle="Draw custom wall obstacles, test preset city maps, and step through BFS, DFS, Dijkstra, and A* search algorithms."
        thumb="/images/search.jpg"
      />

      <article className="px-6 max-w-6xl mx-auto py-8">
        {/* Controls Bar */}
        <Card className="bg-card/50 border-border/50 backdrop-blur-md mb-6 p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Algorithm Selector */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground uppercase">Algorithm:</span>
              <div className="flex rounded-md bg-muted/40 p-1 border border-border/40">
                {(['astar', 'dijkstra', 'bfs', 'dfs'] as Algorithm[]).map(alg => (
                  <button
                    key={alg}
                    onClick={() => { setAlgorithm(alg); resetVisualization() }}
                    disabled={isRunning}
                    className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                      algorithm === alg ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {alg.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Map Presets */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground uppercase">Presets:</span>
              <Button variant="outline" size="xs" onClick={() => loadPreset('city_grid')} disabled={isRunning} className="gap-1">
                <Map className="w-3 h-3" /> City Grid
              </Button>
              <Button variant="outline" size="xs" onClick={() => loadPreset('maze')} disabled={isRunning}>
                Maze
              </Button>
              <Button variant="outline" size="xs" onClick={() => loadPreset('simple_barrier')} disabled={isRunning}>
                Barrier
              </Button>
            </div>

            {/* Drawing Tools */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground uppercase">Tool:</span>
              {(['wall', 'start', 'target', 'erase'] as ToolMode[]).map(t => (
                <button
                  key={t}
                  onClick={() => setTool(t)}
                  disabled={isRunning}
                  className={`px-2.5 py-1 text-xs capitalize rounded border ${
                    tool === t ? 'bg-secondary text-foreground border-primary/50 font-bold' : 'border-border/40 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button onClick={runPathfinding} disabled={isRunning} size="sm" className="gap-1.5 font-semibold">
                <Play className="w-3.5 h-3.5" /> Visualize
              </Button>
              <Button onClick={resetVisualization} disabled={isRunning} variant="outline" size="sm" className="gap-1">
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </Button>
              <Button onClick={clearBoard} disabled={isRunning} variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
                <Trash2 className="w-3.5 h-3.5" /> Clear Walls
              </Button>
            </div>
          </div>
        </Card>

        {/* Live Legend & Stats */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 font-mono text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Start</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-500 inline-block" /> Target</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-zinc-700 inline-block" /> Wall</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-sky-500/40 inline-block" /> Visited</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-400 inline-block" /> Shortest Path</span>
          </div>

          {stats && (
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="font-mono text-xs">
                Visited Nodes: {stats.visitedCount}
              </Badge>
              <Badge variant="secondary" className="font-mono text-xs">
                Path Length: {stats.pathLength} steps
              </Badge>
              <Badge variant="outline" className="font-mono text-xs border-primary/40 text-primary">
                Time: {stats.executionTimeMs}ms
              </Badge>
            </div>
          )}
        </div>

        {/* Interactive Grid Board */}
        <Card className="bg-card/40 border-border/50 p-3 overflow-x-auto select-none" onMouseLeave={handleMouseUp}>
          <div className="flex flex-col items-center">
            {grid.map((row, rIdx) => (
              <div key={rIdx} className="flex">
                {row.map((node, cIdx) => {
                  let bgClass = 'bg-card/30 border-border/20'

                  if (node.isStart) bgClass = 'bg-emerald-500 scale-95 shadow-md shadow-emerald-500/30'
                  else if (node.isTarget) bgClass = 'bg-rose-500 scale-95 shadow-md shadow-rose-500/30'
                  else if (node.isPath) bgClass = 'bg-amber-400 scale-95 animate-pulse'
                  else if (node.isVisited) bgClass = 'bg-sky-500/40 border-sky-400/20'
                  else if (node.isWall) bgClass = 'bg-zinc-700 border-zinc-600'

                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      onMouseDown={() => handleMouseDown(rIdx, cIdx)}
                      onMouseEnter={() => handleMouseEnter(rIdx, cIdx)}
                      onMouseUp={handleMouseUp}
                      className={`w-5 h-5 sm:w-6 sm:h-6 border transition-all duration-150 rounded-sm cursor-pointer ${bgClass}`}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </Card>
      </article>
    </>
  )
}

// --- Algorithm Helper Functions ---
function getNeighbors(node: Node, grid: Node[][]): Node[] {
  const neighbors: Node[] = []
  const { row, col } = node
  if (row > 0) neighbors.push(grid[row - 1][col])
  if (row < ROWS - 1) neighbors.push(grid[row + 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (col < COLS - 1) neighbors.push(grid[row][col + 1])
  return neighbors.filter(n => !n.isWall)
}

function bfs(grid: Node[][], startNode: Node, targetNode: Node): Node[] {
  const visitedInOrder: Node[] = []
  const queue: Node[] = [startNode]
  startNode.isVisited = true

  while (queue.length > 0) {
    const current = queue.shift()!
    visitedInOrder.push(current)
    if (current === targetNode) return visitedInOrder

    for (const neighbor of getNeighbors(current, grid)) {
      if (!neighbor.isVisited) {
        neighbor.isVisited = true
        neighbor.previousNode = current
        queue.push(neighbor)
      }
    }
  }
  return visitedInOrder
}

function dfs(grid: Node[][], startNode: Node, targetNode: Node): Node[] {
  const visitedInOrder: Node[] = []
  const stack: Node[] = [startNode]

  while (stack.length > 0) {
    const current = stack.pop()!
    if (current.isVisited) continue
    current.isVisited = true
    visitedInOrder.push(current)

    if (current === targetNode) return visitedInOrder

    for (const neighbor of getNeighbors(current, grid)) {
      if (!neighbor.isVisited) {
        neighbor.previousNode = current
        stack.push(neighbor)
      }
    }
  }
  return visitedInOrder
}

function dijkstra(grid: Node[][], startNode: Node, targetNode: Node): Node[] {
  const visitedInOrder: Node[] = []
  startNode.distance = 0
  const unvisited = getAllNodes(grid)

  while (unvisited.length > 0) {
    unvisited.sort((a, b) => a.distance - b.distance)
    const closest = unvisited.shift()!

    if (closest.isWall) continue
    if (closest.distance === Infinity) return visitedInOrder

    closest.isVisited = true
    visitedInOrder.push(closest)

    if (closest === targetNode) return visitedInOrder

    for (const neighbor of getNeighbors(closest, grid)) {
      const alt = closest.distance + 1
      if (alt < neighbor.distance) {
        neighbor.distance = alt
        neighbor.previousNode = closest
      }
    }
  }
  return visitedInOrder
}

function astar(grid: Node[][], startNode: Node, targetNode: Node): Node[] {
  const visitedInOrder: Node[] = []
  startNode.distance = 0
  startNode.totalCost = heuristic(startNode, targetNode)
  const openSet: Node[] = [startNode]

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.totalCost - b.totalCost)
    const current = openSet.shift()!

    if (current.isWall) continue
    current.isVisited = true
    visitedInOrder.push(current)

    if (current === targetNode) return visitedInOrder

    for (const neighbor of getNeighbors(current, grid)) {
      const tentativeG = current.distance + 1
      if (tentativeG < neighbor.distance) {
        neighbor.previousNode = current
        neighbor.distance = tentativeG
        neighbor.totalCost = neighbor.distance + heuristic(neighbor, targetNode)
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor)
        }
      }
    }
  }
  return visitedInOrder
}

function heuristic(nodeA: Node, nodeB: Node): number {
  // Manhattan distance
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col)
}

function getAllNodes(grid: Node[][]): Node[] {
  const nodes: Node[] = []
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node)
    }
  }
  return nodes
}

function getNodesInShortestPathOrder(targetNode: Node): Node[] {
  const nodesInPath: Node[] = []
  let current: Node | null = targetNode
  while (current !== null) {
    nodesInPath.unshift(current)
    current = current.previousNode
  }
  return nodesInPath
}
