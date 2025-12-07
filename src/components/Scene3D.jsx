import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, Sphere, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

// DNA Helix - Double helix with glowing data points
const DNAHelix = ({ position = [0, 0, 0] }) => {
  const groupRef = useRef();
  const pointsCount = 60;
  
  const helixData = useMemo(() => {
    const data = [];
    for (let i = 0; i < pointsCount; i++) {
      const t = (i / pointsCount) * Math.PI * 4;
      const y = (i / pointsCount) * 16 - 8;
      
      // First strand
      data.push({
        position: [Math.cos(t) * 1.5, y, Math.sin(t) * 1.5],
        color: '#00f5ff',
        strand: 1
      });
      
      // Second strand (opposite)
      data.push({
        position: [Math.cos(t + Math.PI) * 1.5, y, Math.sin(t + Math.PI) * 1.5],
        color: '#ff00ff',
        strand: 2
      });
    }
    return data;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {helixData.map((point, i) => (
        <mesh key={i} position={point.position}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={point.color} transparent opacity={0.9} />
        </mesh>
      ))}
      {/* Connection bars between strands */}
      {Array.from({ length: 15 }).map((_, i) => {
        const t = (i / 15) * Math.PI * 4;
        const y = (i / 15) * 16 - 8;
        return (
          <mesh key={`bar-${i}`} position={[0, y, 0]} rotation={[0, t, 0]}>
            <boxGeometry args={[3, 0.02, 0.02]} />
            <meshBasicMaterial color="#00ff88" transparent opacity={0.4} />
          </mesh>
        );
      })}
    </group>
  );
};

// Infinite Grid Floor with wave effect
const GridFloor = () => {
  const gridRef = useRef();
  const gridSize = 40;
  const divisions = 40;

  const gridHelper = useMemo(() => {
    const grid = new THREE.GridHelper(gridSize, divisions, '#00f5ff', '#1a1a3a');
    grid.material.transparent = true;
    grid.material.opacity = 0.3;
    return grid;
  }, []);

  useFrame((state) => {
    if (gridRef.current) {
      // Subtle wave effect
      const time = state.clock.elapsedTime;
      gridRef.current.position.z = (time * 2) % (gridSize / divisions);
    }
  });

  return (
    <group position={[0, -5, 0]}>
      <primitive ref={gridRef} object={gridHelper} />
      {/* Glow lines */}
      {[-20, -10, 0, 10, 20].map((x, i) => (
        <mesh key={i} position={[x, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.05, gridSize]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
};

// Mouse-following particles
const MouseParticles = () => {
  const { viewport } = useThree();
  const particlesRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const particleCount = 50;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      velocities.push({ x: 0, y: 0, z: 0 });
      
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i * 3] = 0; colors[i * 3 + 1] = 0.96; colors[i * 3 + 2] = 1; // cyan
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 1; // magenta
      } else {
        colors[i * 3] = 0; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 0.53; // green
      }
    }
    
    return { positions, velocities, colors };
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array;
    const mouse = state.mouse;
    const targetX = (mouse.x * viewport.width) / 2;
    const targetY = (mouse.y * viewport.height) / 2;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Attract to mouse with delay based on index
      const delay = i * 0.02;
      const attraction = 0.02;
      
      particles.velocities[i].x += (targetX - positions[i3]) * attraction * (1 - delay);
      particles.velocities[i].y += (targetY - positions[i3 + 1]) * attraction * (1 - delay);
      
      // Apply velocity with damping
      positions[i3] += particles.velocities[i].x;
      positions[i3 + 1] += particles.velocities[i].y;
      positions[i3 + 2] = Math.sin(state.clock.elapsedTime + i) * 0.5;
      
      particles.velocities[i].x *= 0.95;
      particles.velocities[i].y *= 0.95;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Floating holographic pyramid
const HoloPyramid = ({ position, size = 1, speed = 1 }) => {
  const meshRef = useRef();
  const edgesRef = useRef();

  useFrame((state) => {
    if (meshRef.current && edgesRef.current) {
      const t = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = t;
      edgesRef.current.rotation.y = t;
      meshRef.current.position.y = position[1] + Math.sin(t * 2) * 0.3;
      edgesRef.current.position.y = position[1] + Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <Float speed={1.5} floatIntensity={0.5}>
      <group>
        <mesh ref={meshRef} position={position}>
          <coneGeometry args={[size, size * 1.5, 4]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.1} />
        </mesh>
        <lineSegments ref={edgesRef} position={position}>
          <edgesGeometry args={[new THREE.ConeGeometry(size, size * 1.5, 4)]} />
          <lineBasicMaterial color="#00f5ff" transparent opacity={0.8} />
        </lineSegments>
      </group>
    </Float>
  );
};

// Energy beam connecting elements
const EnergyBeam = ({ start, end, color = '#00f5ff' }) => {
  const lineRef = useRef();

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
    }
  });

  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.5} linewidth={2} />
    </line>
  );
};

// Floating tech cube with wireframe
const TechCube = ({ position, size = 1, speed = 1, color = '#00f5ff' }) => {
  const meshRef = useRef();
  const wireRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (meshRef.current && wireRef.current) {
      meshRef.current.rotation.x = t * 0.3;
      meshRef.current.rotation.y = t * 0.5;
      wireRef.current.rotation.x = t * 0.3;
      wireRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        <mesh ref={meshRef}>
          <boxGeometry args={[size, size, size]} />
          <meshStandardMaterial color={color} transparent opacity={0.1} />
        </mesh>
        <mesh ref={wireRef}>
          <boxGeometry args={[size, size, size]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
        </mesh>
      </group>
    </Float>
  );
};

// Glowing icosahedron (tech polyhedron)
const TechPolyhedron = ({ position, size = 1, color = '#ff00ff' }) => {
  const meshRef = useRef();
  const wireRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current && wireRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.z = t * 0.3;
      wireRef.current.rotation.x = t * 0.2;
      wireRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group position={position}>
        <Icosahedron ref={meshRef} args={[size, 0]}>
          <meshStandardMaterial color={color} transparent opacity={0.15} />
        </Icosahedron>
        <Icosahedron ref={wireRef} args={[size, 0]}>
          <meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
        </Icosahedron>
      </group>
    </Float>
  );
};

// Neural network particles
const NeuralParticles = ({ count = 100 }) => {
  const points = useRef();
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      const t = Math.random();
      colors[i * 3] = t < 0.5 ? 0 : 1;
      colors[i * 3 + 1] = t < 0.5 ? 0.96 : 0;
      colors[i * 3 + 2] = 1;
    }
    
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      const t = state.clock.elapsedTime;
      points.current.rotation.y = t * 0.05;
      points.current.rotation.x = Math.sin(t * 0.03) * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

// Glowing orb with distortion
const GlowOrb = ({ position, color = '#00f5ff', size = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.2} floatIntensity={1}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.3}
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

// Orbiting rings around center
const OrbitingRings = () => {
  const group1 = useRef();
  const group2 = useRef();
  const group3 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group1.current) group1.current.rotation.z = t * 0.3;
    if (group2.current) group2.current.rotation.x = t * 0.2;
    if (group3.current) group3.current.rotation.y = t * 0.25;
  });

  return (
    <>
      <group ref={group1}>
        <mesh>
          <torusGeometry args={[3, 0.02, 16, 100]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.4} />
        </mesh>
      </group>
      <group ref={group2}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[3.5, 0.02, 16, 100]} />
          <meshBasicMaterial color="#ff00ff" transparent opacity={0.3} />
        </mesh>
      </group>
      <group ref={group3}>
        <mesh rotation={[0, Math.PI / 4, Math.PI / 6]}>
          <torusGeometry args={[4, 0.02, 16, 100]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.3} />
        </mesh>
      </group>
    </>
  );
};

// Floating ring
const TechRing = ({ position, size = 1, color = '#00f5ff', speed = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed;
      meshRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.3;
      meshRef.current.rotation.z = t * 0.5;
    }
  });

  return (
    <Float speed={2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[size, size * 0.05, 16, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
    </Float>
  );
};

// Main Scene Component
const Scene3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 2, 12], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        <spotLight position={[0, 10, 0]} intensity={0.5} color="#ffffff" angle={0.5} />
        <pointLight position={[0, -5, 0]} intensity={0.3} color="#00ff88" />

        {/* Background stars */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Infinite Grid Floor - Tron style */}
        <GridFloor />

        {/* Mouse-following particles */}
        <MouseParticles />

        {/* DNA Helix - Left side */}
        <DNAHelix position={[-8, 0, -5]} />

        {/* DNA Helix - Right side (smaller) */}
        <DNAHelix position={[10, 2, -8]} />

        {/* Neural network particles */}
        <NeuralParticles count={200} />

        {/* Central glowing orb */}
        <GlowOrb position={[0, 0, -5]} color="#00f5ff" size={2.5} />

        {/* Orbiting rings */}
        <OrbitingRings />

        {/* Holographic pyramids */}
        <HoloPyramid position={[-5, 3, -4]} size={0.8} speed={0.8} />
        <HoloPyramid position={[6, -2, -3]} size={0.6} speed={1.2} />
        <HoloPyramid position={[3, 4, -6]} size={0.5} speed={1} />

        {/* Tech cubes */}
        <TechCube position={[-6, 2, -3]} size={1.5} speed={0.5} color="#00f5ff" />
        <TechCube position={[7, -1, -4]} size={1} speed={0.7} color="#ff00ff" />
        <TechCube position={[-4, -3, -2]} size={0.8} speed={0.9} color="#00ff88" />
        <TechCube position={[5, 3, -5]} size={1.2} speed={0.6} color="#ffff00" />

        {/* Tech polyhedrons */}
        <TechPolyhedron position={[4, 1, -2]} size={0.8} color="#ff00ff" />
        <TechPolyhedron position={[-5, -2, -4]} size={1} color="#00f5ff" />
        <TechPolyhedron position={[0, 4, -6]} size={0.6} color="#00ff88" />

        {/* Energy beams */}
        <EnergyBeam start={[-8, 0, -5]} end={[0, 0, -5]} color="#00f5ff" />
        <EnergyBeam start={[10, 2, -8]} end={[0, 0, -5]} color="#ff00ff" />
        <EnergyBeam start={[0, 0, -5]} end={[0, -5, 0]} color="#00ff88" />

        {/* Floating rings */}
        <TechRing position={[-3, 0, -1]} size={0.8} color="#00f5ff" speed={1.2} />
        <TechRing position={[4, -2, -3]} size={1.2} color="#ff00ff" speed={0.8} />
        <TechRing position={[0, 2, -4]} size={1} color="#00ff88" speed={1} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
