import { container, cubeColorInput, cubeOptionsMenu } from "./app.js";

let selectedCubes = new Set();

function addCube() {
  const cube = document.createElement("div");
  cube.className = "cube";
  const color = cubeColorInput.value;
  cube.innerHTML = `
    <div class="face front" style="background-color: ${color};"></div>
    <div class="face back" style="background-color: ${color};"></div>
    <div class="face left" style="background-color: ${color};"></div>
    <div class="face right" style="background-color: ${color};"></div>
    <div class="face top" style="background-color: ${color};"></div>
    <div class="face bottom" style="background-color: ${color};"></div>
  `;
  cube.addEventListener("click", () => {
    toggleCubeSelection(cube);
    cubeColorInput.value = rgbToHex(
      cube.querySelector(".face").style.backgroundColor
    );
  });
  cube.addEventListener("mouseenter", () => {
    cube.querySelectorAll(".face").forEach((face) => {
      face.style.border = "2px solid #fff"; // Bold border on hover
    });
  });
  cube.addEventListener("mouseleave", () => {
    cube.querySelectorAll(".face").forEach((face) => {
      face.style.border = "1px solid #ccc"; // Revert border on mouse leave
    });
  });
  container.appendChild(cube);
  updateCubeList();
}

function removeCube() {
  if (container.lastChild) {
    container.removeChild(container.lastChild);
    updateCubeList();
  }
}

function updateCubeList() {
  const cubeList = document.getElementById("cubeList");
  cubeList.innerHTML = "";
  const cubes = document.querySelectorAll(".cube");
  cubes.forEach((cube, index) => {
    const cubeItem = document.createElement("div");
    cubeItem.textContent = `Cube ${index + 1}`;
    cubeItem.style.cursor = "pointer";
    cubeItem.style.color = rgbToHex(
      cube.querySelector(".face").style.backgroundColor
    ); // Set text color to match cube color
    cubeItem.addEventListener("click", () => {
      toggleCubeSelection(cube);
    });
    cubeList.appendChild(cubeItem);
  });
}

function toggleCubeSelection(cube) {
  const cubeList = document.getElementById("cubeList");
  const cubeItems = cubeList.children;
  const cubeIndex = Array.from(container.children).indexOf(cube);

  if (selectedCubes.has(cube)) {
    selectedCubes.delete(cube);
    cube.classList.remove("selected");
    cubeItems[cubeIndex].classList.remove("selected-text");
  } else {
    selectedCubes.add(cube);
    cube.classList.add("selected");
    cubeItems[cubeIndex].classList.add("selected-text");
  }
  cubeOptionsMenu.style.display = selectedCubes.size > 0 ? "block" : "none";
}

function selectAllCubes(select) {
  const cubes = document.querySelectorAll(".cube");
  cubes.forEach((cube) => {
    if (select) {
      selectedCubes.add(cube);
      cube.classList.add("selected");
    } else {
      selectedCubes.delete(cube);
      cube.classList.remove("selected");
    }
  });
  updateCubeList();
  cubeOptionsMenu.style.display = selectedCubes.size > 0 ? "block" : "none";
}

function rgbToHex(rgb) {
  const rgbValues = rgb.match(/\d+/g);
  const hex = rgbValues.map((value) => {
    const hexValue = parseInt(value).toString(16);
    return hexValue.length === 1 ? "0" + hexValue : hexValue;
  });
  return `#${hex.join("")}`;
}

function handleCubeColorInput(event) {
  const color = event.target.value;
  selectedCubes.forEach((cube) => {
    cube.querySelectorAll(".face").forEach((face) => {
      face.style.backgroundColor = color;
    });
  });
  updateCubeList(); // Update the cube list to reflect the new colors
}

document
  .getElementById("selectAllCubes")
  .addEventListener("change", (event) => {
    selectAllCubes(event.target.checked);
  });

export { addCube, handleCubeColorInput, removeCube, updateCubeList };
