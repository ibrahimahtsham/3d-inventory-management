import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.137.5/build/three.module.js";

function addCube(scene, position) {
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.copy(position);
  scene.add(cube);
}

function removeCube(scene, position) {
  const objects = scene.children.filter(
    (obj) =>
      obj instanceof THREE.Mesh && obj.geometry instanceof THREE.BoxGeometry
  );
  for (const obj of objects) {
    if (obj.position.distanceTo(position) < 1) {
      scene.remove(obj);
      break;
    }
  }
}

export { addCube, removeCube };
