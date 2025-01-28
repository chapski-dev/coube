export const DefaultColors = {
  background: '#FAFAFA',
  black: '#000000',
  blue: '#639DF4',
  border: '#EDEDED',
  dark_grey: '#494D4E',
  disabled: '#D7D6D6',
  green: '#81CC20',
  grey: '#EDEDED',
  label: '#798391',
  main: '#FAB54D',
  main_light: '#FAB54D26',
  red: '#EC1B2E',
  textDefault: '#091C21',
  textDefaultReverse: '#FFFFFF',
  textSecondary: '#979797',
  white: '#FFFFFF',
  invoice_icon: '#D9D9D9',
  invoice_text: '#393226',
} as const;

export const lightColors = {
  ...DefaultColors,
} as const;

export const darkColors = {
  ...DefaultColors,
} as const;
