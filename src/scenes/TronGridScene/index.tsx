import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import GridFloor from './GridFloor'
import Lightcycle from './Lightcycle'
import { useLightcycleAI } from './useLightcycleAI'

function Cycles() {
  const cycles = useLightcycleAI()
  return <>{cycles.map(c => <Lightcycle key={c.id} cycle={c} />)}</>
}

export default function TronGridScene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 6, 12], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#04060b']} />
        <fog attach="fog" args={['#04060b', 20, 80]} />
        <ambientLight intensity={0.2} />
        <GridFloor />
        <Cycles />
        <EffectComposer>
          <Bloom intensity={1.5} luminanceThreshold={0.1} luminanceSmoothing={0.9} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
