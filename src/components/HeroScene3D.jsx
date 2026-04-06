import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei'
import { Suspense, useRef } from 'react'

/**
 * Lightweight hero mesh: single distorted icosahedron + float.
 * Canvas is lazy-loaded from the parent to keep initial JS small.
 */
function HeroShape() {
  const meshRef = useRef(null)

  useFrame((state) => {
    const m = meshRef.current
    if (!m) return
    m.rotation.x = state.clock.elapsedTime * 0.07
    m.rotation.y = state.clock.elapsedTime * 0.11
  })

  return (
    <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.55}>
      <mesh ref={meshRef} scale={1.45}>
        <icosahedronGeometry args={[1, 5]} />
        <MeshDistortMaterial
          color="#6366f1"
          emissive="#312e81"
          emissiveIntensity={0.25}
          roughness={0.25}
          metalness={0.65}
          distort={0.32}
          speed={1.8}
        />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 8, 10]} intensity={1.05} />
      <directionalLight position={[-6, -4, -6]} intensity={0.35} color="#a5b4fc" />
      <HeroShape />
      <Environment preset="city" />
    </>
  )
}

export default function HeroScene3D() {
  return (
    <Canvas
      className="h-full min-h-[280px] w-full touch-none"
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      aria-hidden
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
