import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.137.5/build/three.module.js";

let camera, scene, renderer;
let player, crosshair;
let movement = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  up: false,
  down: false,
};
let sensitivity = 0.00125;
let movementSpeed = 0.025;

function init(canvas) {
  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.6, 0); // Eye level

  // Player
  player = new THREE.Object3D();
  player.add(camera);
  scene.add(player);

  // Crosshair
  const crosshairGeometry = new THREE.RingGeometry(0.02, 0.03, 32);
  const crosshairMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  crosshair = new THREE.Mesh(crosshairGeometry, crosshairMaterial);
  crosshair.position.set(0, 0, -2);
  camera.add(crosshair);

  // Lighting
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7.5);
  scene.add(light);

  // Add a ground plane
  const groundGeometry = new THREE.PlaneGeometry(100, 100);
  const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Add some cubes
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  for (let i = 0; i < 10; i++) {
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(Math.random() * 20 - 10, 0.5, Math.random() * 20 - 10);
    scene.add(cube);
  }

  // Event listeners
  window.addEventListener("resize", onWindowResize);
  window.addEventListener("keydown", handleEscapeKey);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function handleEscapeKey(event) {
  if (event.code === "Escape") {
    const newSensitivity = prompt("Enter new mouse sensitivity:", sensitivity);
    if (newSensitivity !== null) {
      sensitivity = parseFloat(newSensitivity);
    }
  }
}

function animate() {
  requestAnimationFrame(animate);

  if (movement.forward) player.translateZ(-movementSpeed);
  if (movement.backward) player.translateZ(movementSpeed);
  if (movement.left) player.translateX(-movementSpeed);
  if (movement.right) player.translateX(movementSpeed);
  if (movement.up) player.translateY(movementSpeed);
  if (movement.down) player.translateY(-movementSpeed);

  renderer.render(scene, camera);
}

export {
  animate,
  camera,
  init,
  movement,
  movementSpeed,
  player,
  renderer,
  scene,
  sensitivity,
};
