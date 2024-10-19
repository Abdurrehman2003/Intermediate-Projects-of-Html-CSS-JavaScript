const generateBtn = document.getElementById("generateBtn");

// Function to generate a single hex color
const singleHexColorGenerator = () => {
  const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    let random = Math.floor(Math.random() * hex.length);
    hexColor += hex[random];
  }
  return hexColor;
};

// Function to generate a palette of 4 colors
const colorPaletteGenerator = () => {
  const colorPalette = [];
  for (let i = 0; i < 4; i++) {
    colorPalette.push(singleHexColorGenerator());
  }
  return colorPalette;
};

// Function to show the toast notification
const showToast = () => {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000); // Toast will disappear after 2 seconds
};

// Function to copy the color code to clipboard
const copytoClipBoard = (id) => {
  const el = document.getElementById(id);
  navigator.clipboard.writeText(el.innerText)
    .then(() => {
      showToast(); // Show toast notification when copied successfully
    })
    .catch((err) => {
      console.error('Could not copy', err);
    });
};

// Function to render the color palette in the UI
const renderColorPalette = () => {
  const colorsContainer = document.querySelector(".colors_container");
  colorsContainer.innerHTML = "";
  const colorPalette = colorPaletteGenerator();
  
  colorPalette.forEach((color, i) => {
    const colorDiv = document.createElement("div");
    colorDiv.id = `color${i + 1}`;
    colorDiv.style.background = color;
    colorDiv.className = "colorBox";

    const colorTag = document.createElement("p");
    colorTag.id = `color${i + 1}Tag`;
    colorTag.className = "colorTag";
    colorTag.innerHTML = color;
    colorDiv.appendChild(colorTag);
    colorsContainer.appendChild(colorDiv);
  });

  // Add event listeners for copying colors to clipboard
  const colorTags = document.querySelectorAll(".colorTag");
  colorTags.forEach((colorTag, i) => {
    colorTag.addEventListener("click", () => copytoClipBoard(`color${i + 1}Tag`));
  });
};

// Render the palette when the page loads
renderColorPalette();

// Re-generate palette when the button is clicked
generateBtn.addEventListener("click", renderColorPalette);
