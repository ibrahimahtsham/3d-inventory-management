import { animate, init } from "./controls.js";
import {
  handleContextMenu,
  handleKeyDown,
  handleKeyUp,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
} from "./events.js";

const canvas = document.getElementById("canvas");
const fullscreenButton = document.getElementById("fullscreenButton");

fullscreenButton.addEventListener("click", () => {
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.mozRequestFullScreen) {
    // Firefox
    canvas.mozRequestFullScreen();
  } else if (canvas.webkitRequestFullscreen) {
    // Chrome, Safari and Opera
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) {
    // IE/Edge
    canvas.msRequestFullscreen();
  }
});

canvas.addEventListener("click", () => {
  canvas.requestPointerLock();
});

document.addEventListener("pointerlockchange", () => {
  if (document.pointerLockElement === canvas) {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
  } else {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("contextmenu", handleContextMenu);
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("keyup", handleKeyUp);
  }
});

init(canvas);
animate();
