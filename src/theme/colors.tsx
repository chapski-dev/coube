export const DefaultColors = {
  main: '#FAB54D',
  main_light: '#FAB54D26',
  white: '#FFFFFF',
  textDefault: '#091C21',
  textDefaultReverse: '#FFFFFF',
  textSecondary: '#979797',
  green: '#81CC20',
  red: '#EC1B2E',
  blue: '#639DF4',
  grey: '#EDEDED',
  dark_grey: '#494D4E',
  light_grey: '#EEEEEE',
  black: '#000000',
  background: '#FAFAFA',
  disabled: '#D7D6D6',
  border: '#EDEDED',
  label: '#798391',
} as const;

export const lightColors = {
  ...DefaultColors,
} as const;

export const darkColors = {
  ...DefaultColors,
} as const;
