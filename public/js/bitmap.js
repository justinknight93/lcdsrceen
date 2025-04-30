const componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

export const bmpToBinaryArray = (imageElement) => {
  const canvas = document.createElement("canvas");
  canvas.width = imageElement.width;
  canvas.height = imageElement.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(imageElement, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const result = [];

  for (let y = 0; y < canvas.height; y++) {
    const row = [];
    for (let x = 0; x < canvas.width; x++) {
      const index = (y * canvas.width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const isWhite = r == 255 && g == 255 && b == 255;
      row.push(isWhite ? null : rgbToHex(r, g, b));
    }
    result.push(row);
  }

  return result;
};

export const loadImage = async (imagePath) => {
  const formattedId = imagePath.replace("/", "_").replace(" ", "_");
  const imageElem = document.querySelector(`#${formattedId}`);

  if (imageElem) {
    return imageElem;
  }

  return new Promise((resolve, reject) => {
    const image = document.createElement("img");
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = imagePath;
    image.id = formattedId;
  });
};
