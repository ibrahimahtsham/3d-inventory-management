import { cubeOptionsMenu, optionsMenu } from "./app.js";

function handleSmoothingSliderInput(event) {
  smoothing = parseFloat(event.target.value);
}

function handleSmoothingToggleChange(event) {
  smoothingEnabled = event.target.checked;
}

function toggleOptionsMenu() {
  optionsMenu.style.display =
    optionsMenu.style.display === "none" ? "block" : "none";
}

function toggleCubeOptionsMenu() {
  cubeOptionsMenu.style.display =
    cubeOptionsMenu.style.display === "none" ? "block" : "none";
}

export {
  handleSmoothingSliderInput,
  handleSmoothingToggleChange,
  toggleCubeOptionsMenu,
  toggleOptionsMenu,
};
