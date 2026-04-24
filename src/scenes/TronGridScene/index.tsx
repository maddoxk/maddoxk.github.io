import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import GridFloor from './GridFloor'

export default function TronGridScene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 3, 8], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#04060b']} />
        <fog attach="fog" args={['#04060b', 15, 60]} />
        <ambientLight intensity={0.2} />
        <GridFloor />
        <EffectComposer>
          <Bloom intensity={1.2} luminanceThreshold={0.1} luminanceSmoothing={0.9} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
