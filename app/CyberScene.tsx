"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CyberScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02060a, 0.035);

    const camera = new THREE.PerspectiveCamera(
      54,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 6.5, 18);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x02060a, 0);
    mount.appendChild(renderer.domElement);

    const pointer = new THREE.Vector2(0, 0);
    const targetRotation = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();
    const rig = new THREE.Group();
    scene.add(rig);

    const grid = new THREE.GridHelper(72, 36, 0x38c2d9, 0x164253);
    grid.position.y = -5.25;
    grid.material.transparent = true;
    grid.material.opacity = 0.24;
    rig.add(grid);

    const nodeGeometry = new THREE.IcosahedronGeometry(0.11, 1);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xa8f4ff });
    const nodes = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, 84);
    const nodePositions: THREE.Vector3[] = [];
    const dummy = new THREE.Object3D();

    for (let index = 0; index < 84; index += 1) {
      const radius = 5 + Math.random() * 18;
      const angle = Math.random() * Math.PI * 2;
      const height = -3.6 + Math.random() * 10.8;
      const position = new THREE.Vector3(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius - 8
      );

      nodePositions.push(position);
      dummy.position.copy(position);
      dummy.scale.setScalar(0.55 + Math.random() * 1.4);
      dummy.updateMatrix();
      nodes.setMatrixAt(index, dummy.matrix);
    }

    rig.add(nodes);

    const linePositions: number[] = [];
    for (let index = 0; index < nodePositions.length; index += 2) {
      const start = nodePositions[index];
      const end = nodePositions[(index + 9) % nodePositions.length];
      linePositions.push(start.x, start.y, start.z, end.x, end.y, end.z);
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x70ddff,
      transparent: true,
      opacity: 0.16,
    });
    const networkLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    rig.add(networkLines);

    const core = new THREE.Group();
    core.position.set(7.4, 1.8, -4);
    rig.add(core);

    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xf1c36c,
      emissive: 0x8f5516,
      emissiveIntensity: 0.45,
      metalness: 0.62,
      roughness: 0.26,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(
      new THREE.DodecahedronGeometry(2.2, 0),
      coreMaterial
    );
    core.add(coreMesh);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x7de9ff,
      transparent: true,
      opacity: 0.32,
      wireframe: true,
    });

    const ringA = new THREE.Mesh(new THREE.TorusGeometry(3.25, 0.018, 8, 96), ringMaterial);
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(4.05, 0.014, 8, 96), ringMaterial.clone());
    ringA.rotation.x = Math.PI / 2.7;
    ringB.rotation.y = Math.PI / 2.3;
    core.add(ringA, ringB);

    const light = new THREE.PointLight(0x7de9ff, 55, 45);
    light.position.set(-8, 8, 12);
    scene.add(light);

    const warmLight = new THREE.PointLight(0xf0c36e, 32, 34);
    warmLight.position.set(9, 3, 6);
    scene.add(warmLight);

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const scrollOffset = window.scrollY / Math.max(document.body.scrollHeight, 1);

      targetRotation.x += (pointer.y * 0.08 - targetRotation.x) * 0.035;
      targetRotation.y += (pointer.x * 0.12 - targetRotation.y) * 0.035;

      rig.rotation.x = targetRotation.x;
      rig.rotation.y = targetRotation.y + scrollOffset * 0.9;
      grid.position.z = ((elapsed * 3.2) % 4) - 2;
      nodes.rotation.y = elapsed * 0.025;
      networkLines.rotation.y = elapsed * 0.02;

      core.rotation.x = elapsed * 0.24;
      core.rotation.y = elapsed * 0.38;
      ringA.rotation.z = elapsed * 0.45;
      ringB.rotation.x = elapsed * 0.32;

      camera.position.y = 6.5 + Math.sin(elapsed * 0.3) * 0.35;
      renderer.render(scene, camera);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", onResize);
    renderer.setAnimationLoop(animate);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      renderer.setAnimationLoop(null);
      mount.removeChild(renderer.domElement);
      lineGeometry.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineMaterial.dispose();
      coreMaterial.dispose();
      ringMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="cyber-scene" aria-hidden="true" />;
}
