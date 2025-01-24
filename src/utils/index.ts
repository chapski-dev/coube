import { pickBy } from 'lodash';

export const phoneMask = [
  '+',
  '7',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];

export const removeUndefinedOnes = (obj: Record<string, any>): Record<string, any> => {
  return pickBy(obj, (v) => v !== undefined)
}