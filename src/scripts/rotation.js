let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotation = { x: 0, y: 0 };
let smoothing = 0.5;
let smoothingEnabled = true;

function handleMouseDown(event) {
  if (event.button === 2) {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
  }
}

function handleMouseMove(event) {
  if (isDragging) {
    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;
    const smoothingFactor = smoothingEnabled ? smoothing : 1;
    rotation.y += deltaX * smoothingFactor;
    rotation.x -= deltaY * smoothingFactor;
    document.querySelectorAll(".cube").forEach((cube) => {
      cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
    });
    previousMousePosition = { x: event.clientX, y: event.clientY };
  }
}

function handleMouseUp() {
  isDragging = false;
}

function handleContextMenu(event) {
  event.preventDefault();
}

export { handleContextMenu, handleMouseDown, handleMouseMove, handleMouseUp };
