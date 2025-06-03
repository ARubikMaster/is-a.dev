document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("header");
  const title = container.querySelector(".title");

  function fillGrid() {
    container.querySelectorAll(".square").forEach(square => square.remove());

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const cols = Math.ceil(containerWidth / 50);
    const rows = Math.floor(containerHeight / 50);
    const totalSquares = cols * rows;

    for (let i = 0; i < totalSquares; i++) {
      const square = document.createElement("div");
      square.className = "square";
      container.insertBefore(square, title);
    }

    container.style.gridTemplateColumns = `repeat(${cols}, 50px)`;
  }

  fillGrid();
  window.addEventListener("resize", fillGrid);
});