import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.137.5/build/three.module.js";

const WORLD_SIZE = 100;

function snapToGrid(position) {
  position.x = Math.round(position.x);
  position.y = Math.round(position.y);
  position.z = Math.round(position.z);
  return position;
}

function isWithinWorldBounds(position) {
  return (
    position.x >= -WORLD_SIZE / 2 &&
    position.x <= WORLD_SIZE / 2 &&
    position.z >= -WORLD_SIZE / 2 &&
    position.z <= WORLD_SIZE / 2
  );
}

function addCube(scene, position) {
  position = snapToGrid(position);
  if (!isWithinWorldBounds(position)) return;

  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.copy(position);
  scene.add(cube);
}

function removeCube(scene, position) {
  position = snapToGrid(position);
  const objects = scene.children.filter(
    (obj) =>
      obj instanceof THREE.Mesh && obj.geometry instanceof THREE.BoxGeometry
  );
  for (const obj of objects) {
    if (obj.position.distanceTo(position) < 0.5) {
      scene.remove(obj);
      break;
    }
  }
}

export { addCube, removeCube };
