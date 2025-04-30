import { bmpToBinaryArray, loadImage } from "./bitmap.js";
export const OFF_COLOR = "#3535354f";
export const SCREEN_HEIGHT = 16;
export const SCREEN_WIDTH = 32;
const screen = document.querySelector("#screen");

export const drawImage = (binaryArray, x, y) => {
  x = Math.round(x);
  y = Math.round(y);
  const height = binaryArray.length;
  const width = binaryArray[0].length;

  for (let yy = 0; yy < height; yy++) {
    for (let xx = 0; xx < width; xx++) {
      if (y + yy < 0 || y + yy > SCREEN_HEIGHT - 1) {
        continue;
      }
      if (x + xx < 0 || x + xx > SCREEN_WIDTH - 1) {
        continue;
      }
      const index = (y + yy) * SCREEN_WIDTH + (x + xx);
      const value = binaryArray[yy][xx];
      if (index > -1 && value) {
        screen.children[index].style.backgroundColor = value;
      }
    }
  }
};

export const clear = () => {
  for (const child of screen.children) {
    child.style.backgroundColor = OFF_COLOR;
  }
};

const fontImage = await loadImage("images/font.bmp");
const fontBin = bmpToBinaryArray(fontImage);

export const drawChar = (char, x, y) => {
  const index = char.charCodeAt(0) - 1;
  const column = index % 16;
  const row = Math.floor(index / 16);

  const charPixelHeight = 8;
  const charPixelWidth = 8;

  x = Math.round(x);
  y = Math.round(y);

  for (let yy = 0; yy < charPixelHeight; yy++) {
    for (let xx = 0; xx < charPixelWidth; xx++) {
      if (y + yy < 0 || y + yy > SCREEN_HEIGHT - 1) {
        continue;
      }
      if (x + xx < 0 || x + xx > SCREEN_WIDTH - 1) {
        continue;
      }
      const index = (y + yy) * SCREEN_WIDTH + (x + xx);
      const value =
        fontBin[yy + row * charPixelHeight][xx + column * charPixelWidth];
      if (index > -1 && value) {
        screen.children[index].style.backgroundColor = value;
      }
    }
  }
};

export const drawString = (string, x, y, charSpacing = 7) => {
  let charIndex = 0;
  for (const char of string) {
    drawChar(char, charIndex * charSpacing + x, y);
    charIndex++;
  }
};
