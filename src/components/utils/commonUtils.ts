export function setupColors(color: string) {
  if (typeof color !== 'string') {
    throw new Error('Color must be a string');
  }
  if (color.length !== 7) {
    throw new Error('Color must be 7 characters long');
  }
  if (!/^#([A-Fa-f0-9]{6})$/.test(color)) {
    throw new Error(
      `Color must be hexadecimal, color is: ${color}, ${color.slice(
        1,
        color.length
      )}`
    );
  }

  const red = parseInt(color.slice(1, 3), 16);
  const green = parseInt(color.slice(3, 5), 16);
  const blue = parseInt(color.slice(5, 7), 16);

  return `${red} ${green} ${blue}`;
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

/////////////////////////////////////////////////////////////////////
// Change hex color into RGB /////////////////////////////////////////////////////////////////////
export const getRGBColor = (hex: string, type: string) => {
  let color = hex.replace(/#/g, '');
  // rgb values
  var r = parseInt(color.slice(0, 2), 16);
  var g = parseInt(color.slice(2, 2), 16);
  var b = parseInt(color.slice(4, 2), 16);

  return `--color-${type}: ${r}, ${g}, ${b};`;
};

/////////////////////////////////////////////////////////////////////
// Determine the accessible color of text
/////////////////////////////////////////////////////////////////////
export const getAccessibleColor = (hex: string) => {
  let color = hex.replace(/#/g, '');
  // rgb values
  var r = parseInt(color.slice(0, 2), 16);
  var g = parseInt(color.slice(2, 2), 16);
  var b = parseInt(color.slice(4, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#000000' : '#FFFFFF';
};
