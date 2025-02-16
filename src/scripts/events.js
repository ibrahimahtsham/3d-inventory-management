import { camera, movement, player, scene, sensitivity } from "./controls.js";
import { addCube, removeCube } from "./cube.js";

function handleMouseMove(event) {
  const deltaX = event.movementX;
  const deltaY = event.movementY;

  player.rotation.y -= deltaX * sensitivity;
  camera.rotation.x -= deltaY * sensitivity;
  camera.rotation.x = Math.max(
    -Math.PI / 2,
    Math.min(Math.PI / 2, camera.rotation.x)
  );
}

function handleMouseDown(event) {
  const vector = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
  const position = new THREE.Vector3().copy(player.position).add(vector);

  if (event.button === 2) {
    addCube(scene, position);
  } else if (event.button === 0) {
    removeCube(scene, position);
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
