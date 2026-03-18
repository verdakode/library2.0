"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SHELF_BOOKS } from '@/data/books';

const shelves = [
  { id: "000", name: "tools", description: "instruments of creation" },
  { id: "100", name: "philosophy", description: "why? what?" },
  { id: "200", name: "my life", description: "first hand perspective" },
  { id: "300", name: "the glazing shelf", description: "people" },
  { id: "400", name: "language", description: "especially that which is unnatural" },
  { id: "500", name: "alchemy", description: "tracking, data, tools" },
  { id: "600", name: "technology & the future", description: "the infinite possibilities" },
  { id: "700", name: "arts", description: "media Consumption, creative Works, music" },
  { id: "800", name: "literature", description: "reading List, book Notes, books that should exist, reviews, etc." },
  { id: "900", name: "history", description: "the Timeline, memory archive, Various Notable Historical Events" }
];

export default function Library3D() {
  const containerRef = useRef(null);
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [debug, setDebug] = useState('Initializing...');

  useEffect(() => {
    console.log('Component mounted');
    setDebug('Component mounted, loading Three.js...');

    if (!containerRef.current) {
      setDebug('Error: Container ref not found');
      return;
    }

    let animationId;
    let renderer, scene, camera;

    async function init() {
      try {
        setDebug('Importing Three.js...');
        const THREE = await import('three');
        setDebug('Three.js imported successfully!');

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1410);
        scene.fog = new THREE.Fog(0x1a1410, 10, 30);

        // Camera
        camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
        camera.position.set(0, 4, 12);

        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.4);
        scene.add(ambientLight);

        const mainLight = new THREE.PointLight(0xffaa55, 2, 25);
        mainLight.position.set(0, 8, 5);
        mainLight.castShadow = true;
        scene.add(mainLight);

        // Floor
        const floorGeometry = new THREE.PlaneGeometry(25, 25);
        const floorMaterial = new THREE.MeshStandardMaterial({
          color: 0x3d2314,
          roughness: 0.9
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);

        // Back wall
        const wallGeometry = new THREE.PlaneGeometry(20, 15);
        const wallMaterial = new THREE.MeshStandardMaterial({
          color: 0x2b1810,
          roughness: 0.95
        });
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(0, 7.5, -3);
        wall.receiveShadow = true;
        scene.add(wall);

        // Create shelves
        const bookObjects = [];

        shelves.forEach((shelf, index) => {
          const y = 0.5 + index * 0.7;
          const shelfBooks = SHELF_BOOKS[shelf.id] || [];

          // Shelf board
          const shelfGeometry = new THREE.BoxGeometry(10, 0.12, 1.5);
          const shelfMaterial = new THREE.MeshStandardMaterial({
            color: 0x3d2314,
            roughness: 0.7
          });
          const shelfMesh = new THREE.Mesh(shelfGeometry, shelfMaterial);
          shelfMesh.position.set(0, y, -2);
          shelfMesh.castShadow = true;
          shelfMesh.receiveShadow = true;
          scene.add(shelfMesh);

          // Books
          let xPos = -4.5;
          shelfBooks.forEach((book) => {
            const bookWidth = 0.15 + Math.random() * 0.15;
            const bookHeight = 0.5 + Math.random() * 0.3;

            const bookGeometry = new THREE.BoxGeometry(bookWidth, bookHeight, 1.0);
            const bookColor = new THREE.Color(book.color);
            const bookMaterial = new THREE.MeshStandardMaterial({
              color: bookColor,
              roughness: 0.7
            });

            const bookMesh = new THREE.Mesh(bookGeometry, bookMaterial);
            bookMesh.position.set(xPos + bookWidth / 2, y + 0.06 + bookHeight / 2, -2);
            bookMesh.castShadow = true;
            bookMesh.receiveShadow = true;
            bookMesh.userData = { bookId: book.id, title: book.title };

            scene.add(bookMesh);
            bookObjects.push(bookMesh);

            xPos += bookWidth + 0.03;
          });
        });

        // Side panels
        [-5.1, 5.1].forEach(x => {
          const panelGeometry = new THREE.BoxGeometry(0.2, 8, 1.6);
          const panelMaterial = new THREE.MeshStandardMaterial({ color: 0x3d2314 });
          const panel = new THREE.Mesh(panelGeometry, panelMaterial);
          panel.position.set(x, 4, -2);
          panel.castShadow = true;
          scene.add(panel);
        });

        // Raycaster for clicks
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        function onMouseMove(event) {
          const rect = container.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        }

        function onClick() {
          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(bookObjects);
          if (intersects.length > 0) {
            const book = intersects[0].object;
            router.push(`/books/${book.userData.bookId}`);
          }
        }

        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('click', onClick);

        // Camera controls
        let cameraAngle = 0;
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        container.addEventListener('mousedown', (e) => {
          isDragging = true;
          previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        container.addEventListener('mouseup', () => isDragging = false);

        container.addEventListener('mousemove', (e) => {
          if (!isDragging) return;
          const deltaX = e.clientX - previousMousePosition.x;
          cameraAngle += deltaX * 0.005;
          previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        // Animation loop
        function animate() {
          animationId = requestAnimationFrame(animate);

          const radius = 12;
          camera.position.x = Math.sin(cameraAngle) * radius;
          camera.position.z = Math.cos(cameraAngle) * radius;
          camera.position.y = 4;
          camera.lookAt(0, 4, -2);

          renderer.render(scene, camera);
        }

        animate();
        setIsLoaded(true);
        setDebug('Scene loaded successfully!');

      } catch (error) {
        console.error('Error:', error);
        setDebug(`Error: ${error.message}`);
      }
    }

    init();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) renderer.dispose();
    };
  }, [router]);

  return (
    <div className="w-full h-screen relative" style={{ background: '#1a1410' }}>
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ touchAction: 'none' }}
      />

      {/* Debug info */}
      <div className="fixed top-4 left-4 bg-black/80 text-green-400 p-4 rounded font-mono text-sm z-50">
        {debug}
      </div>

      {/* Back button */}
      <button
        onClick={() => router.push('/entrance')}
        className="fixed top-4 right-4 px-4 py-2 rounded-lg z-50"
        style={{
          background: 'linear-gradient(135deg, #4a3728, #3d2314)',
          color: '#d4a574',
          border: '2px solid #8B4513',
          fontFamily: 'serif'
        }}
      >
        ← EXIT
      </button>

      {/* Instructions */}
      <div className="fixed bottom-4 left-4 text-amber-200 text-sm z-40">
        <p>Drag to rotate • Click books to read</p>
      </div>
    </div>
  );
}
