import { addCube, handleCubeColorInput, removeCube } from "./cube.js";
import {
  handleContextMenu,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
} from "./rotation.js";
import {
  handleSmoothingSliderInput,
  handleSmoothingToggleChange,
  toggleCubeOptionsMenu,
  toggleOptionsMenu,
} from "./ui.js";

const container = document.getElementById("container");
const optionsMenu = document.getElementById("optionsMenu");
const cubeOptionsMenu = document.getElementById("cubeOptionsMenu");
const smoothingSlider = document.getElementById("smoothingSlider");
const smoothingToggle = document.getElementById("smoothingToggle");
const cubeColorInput = document.getElementById("cubeColor");

document.getElementById("addCube").addEventListener("click", addCube);
document.getElementById("removeCube").addEventListener("click", removeCube);
document
  .getElementById("optionsButton")
  .addEventListener("click", toggleOptionsMenu);
document
  .getElementById("cubeOptionsButton")
  .addEventListener("click", toggleCubeOptionsMenu);
smoothingSlider.addEventListener("input", handleSmoothingSliderInput);
smoothingToggle.addEventListener("change", handleSmoothingToggleChange);
cubeColorInput.addEventListener("input", handleCubeColorInput);
container.addEventListener("mousedown", handleMouseDown);
container.addEventListener("mousemove", handleMouseMove);
container.addEventListener("mouseup", handleMouseUp);
container.addEventListener("contextmenu", handleContextMenu);

export { container, cubeColorInput, cubeOptionsMenu, optionsMenu };
