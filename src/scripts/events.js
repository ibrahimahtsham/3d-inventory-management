import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.137.5/build/three.module.js";
import {
  camera,
  movement,
  placeholderCube,
  player,
  scene,
  sensitivity,
} from "./controls.js";
import { addCube, removeCube } from "./cube.js";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const MAX_PLACE_DISTANCE = 5; // Maximum distance from the player to place cubes

function handleMouseMove(event) {
  const deltaX = event.movementX;
  const deltaY = event.movementY;

  player.rotation.y -= deltaX * sensitivity;
  camera.rotation.x -= deltaY * sensitivity;
  camera.rotation.x = Math.max(
    -Math.PI / 2,
    Math.min(Math.PI / 2, camera.rotation.x)
  );

  // Update placeholder cube position
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    const intersect = intersects[0];
    const position = intersect.point.clone().add(intersect.face.normal);
    position.divideScalar(1).floor().multiplyScalar(1).addScalar(0.5);

    if (position.distanceTo(player.position) <= MAX_PLACE_DISTANCE) {
      placeholderCube.position.copy(position);
    } else {
      placeholderCube.position.set(0, -1000, 0); // Hide placeholder cube if out of range
    }
  } else {
    placeholderCube.position.set(0, -1000, 0); // Hide placeholder cube if no intersection
  }
}

function handleMouseDown(event) {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const intersect = intersects[0];
    const position = intersect.point.clone().add(intersect.face.normal);
    position.divideScalar(1).floor().multiplyScalar(1).addScalar(0.5);

    if (position.distanceTo(player.position) <= MAX_PLACE_DISTANCE) {
      if (event.button === 2) {
        addCube(scene, position);
      } else if (event.button === 0) {
        removeCube(scene, intersect.object.position);
      }
    }
  }
}

function handleMouseUp() {
  // Handle mouse up logic here
}

function handleContextMenu(event) {
  event.preventDefault();
}

function handleKeyDown(event) {
  switch (event.code) {
    case "KeyW":
      movement.forward = true;
      break;
    case "KeyS":
      movement.backward = true;
      break;
    case "KeyA":
      movement.left = true;
      break;
    case "KeyD":
      movement.right = true;
      break;
    case "Space":
      movement.up = true;
      break;
    case "KeyC":
      movement.down = true;
      break;
  }
}

function handleKeyUp(event) {
  switch (event.code) {
    case "KeyW":
      movement.forward = false;
      break;
    case "KeyS":
      movement.backward = false;
      break;
    case "KeyA":
      movement.left = false;
      break;
    case "KeyD":
      movement.right = false;
      break;
    case "Space":
      movement.up = false;
      break;
    case "KeyC":
      movement.down = false;
      break;
  }
}

export {
  handleContextMenu,
  handleKeyDown,
  handleKeyUp,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
};
