const colorMap = {
  green: "#64d583",
  blue: "#91a8f9",
  orange: "#ee955e",
  pink: "#ee92d7",
  purple: "#aa8ef0",
  yellow: "#f5d770",
  default: "#64d583",
};

/**
 * Maps a color name to its corresponding hex value.
 * @param {string} colorName The color name to look up in the palette.
 * @returns {string} The matching hex color value, or the default color if no match is found.
 */
function stringToHex(colorName) {
  const color = colorMap[colorName];

  return color || colorMap.default;
}

/**
 * Finds the color name that matches a hex value.
 * @param {string} hexValue The hex color value to match.
 * @returns {string|null} The matching color name, or null if no match is found.
 */
function hexToString(hexValue) {
  const colorString = Object.keys(colorMap).find((key) => {
    return colorMap[key] === hexValue;
  });

  return colorString || null;
}

/**
 * Removes all color modifier classes from an element.
 * @param {HTMLElement} element The element whose color classes should be cleared.
 * @returns {void} This function does not return a value.
 */
function removeColorClasses(element) {
  [...element.classList].forEach((cls) => {
    if (cls.includes("_color_")) {
      element.classList.remove(cls);
    }
  });
}

export { stringToHex, hexToString, removeColorClasses };
