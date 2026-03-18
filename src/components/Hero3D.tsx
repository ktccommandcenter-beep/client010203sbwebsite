import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useRef, Suspense, useMemo } from 'react';
import { PerspectiveCamera, Environment, ContactShadows, Decal, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Bottle() {
  const meshRef = useRef<THREE.Group>(null);
  const logoTexture = useTexture('https://www.zaddyproducts.com/cdn/shop/files/Zaddy-Logo.png?v=1641479507&width=512');
  
  // Pre-invert the logo if needed, but usually it's black on transparent or white.
  // The logo is black, so we might need to invert it for a dark bottle or use it as a mask.
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      // Smooth floating + mouse follow
      meshRef.current.position.y = Math.sin(t) * 0.1;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        t * 0.2 + state.mouse.x * 0.4,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        state.mouse.y * 0.1,
        0.05
      );
    }
  });

  return (
    <group ref={meshRef}>
      {/* Bottle Body - Sleek Matte Black */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.8, 2.5, 64]} />
        <meshStandardMaterial 
          color="#080808" 
          metalness={0.9} 
          roughness={0.1} 
          envMapIntensity={2}
        />
        {/* Logo Decal */}
        <Decal
          position={[0, 0, 0.81]} // Positioned on the front
          rotation={[0, 0, 0]}
          scale={[1.2, 0.4, 1]} // Scale of the logo
        >
          <meshStandardMaterial
            map={logoTexture}
            transparent
            polygonOffset
            polygonOffsetFactor={-1}
            metalness={0.5}
            roughness={0.2}
          />
        </Decal>
      </mesh>
      
      {/* Bottle Neck */}
      <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.7, 0.4, 64]} />
        <meshStandardMaterial 
          color="#080808" 
          metalness={1} 
          roughness={0.05} 
        />
      </mesh>

      {/* Bottle Cap - Premium Gold */}
      <mesh position={[0, 1.7, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.3, 64]} />
        <meshStandardMaterial 
          color="#C8A84B" 
          metalness={1} 
          roughness={0.1} 
          envMapIntensity={3}
        />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <ambientLight intensity={0.4} />
          <spotLight position={[5, 10, 5]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#C8A84B" />
          
          <group position={[1.8, -0.2, 0]} scale={1.1}>
            <Bottle />
          </group>

          <ContactShadows 
            position={[1.8, -2.2, 0]} 
            opacity={0.5} 
            scale={6} 
            blur={2.5} 
            far={4} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
