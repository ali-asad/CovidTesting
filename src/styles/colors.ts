import { hexToRGB } from '../utils';

const blue = '#1A96DB';
const green = '#4AB175';
const grey = '#B4B4BB';
const darkBlue = '#2A5F87';

const colors = {
  white: '#FFFFFF',
  black: hexToRGB('#262626', 0.8),
  grey,
  grey80: hexToRGB(grey, 0.8),
  grey20: hexToRGB(grey, 0.2),
  blue,
  blue50: hexToRGB(blue, 0.5),
  blue8: hexToRGB(blue, 0.08),
  darkBlue,
  darkBlue50: hexToRGB(darkBlue, 0.5),
  green,
  green50: hexToRGB(green, 0.5),
  red: '#FF5A60',
};

export { colors };
