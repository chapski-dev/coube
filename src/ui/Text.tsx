import { removeUndefinedOnes } from '@src/utils';
import React, { FC, useMemo } from 'react';
import {
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';

type TextType = keyof typeof styles;

type TextProps = RNTextProps & {
  type?: TextType;
  color?: string;
  fontWeight?: TextStyle['fontWeight'];
  fontSize?: number;
  center?: boolean;
  left?: boolean;
  right?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
};

// TODO: add theme colors
const Text: FC<TextProps> = ({
  type,
  style,
  color,
  fontWeight,
  fontSize,
  left,
  right,
  center,
  uppercase,
  lowercase,
  capitalize,
  ...rest
}) => {
  const computedStyle = useMemo(() => {
    const textAlign = left ? 'left' : right ? 'right' : center ? 'center' : undefined
    const textTransform = uppercase ? 'uppercase' : lowercase ? 'lowercase' : capitalize ? 'capitalize' : undefined

    return [
      styles[type ? type : 'body'],
      {
        ...removeUndefinedOnes({
          color,
          textAlign,
          fontWeight,
          fontSize,
          textTransform
        })
      },
      style
    ].flat();
  }, [capitalize, center, color, fontSize, fontWeight, left, lowercase, right, style, type, uppercase]);

  return <RNText {...rest} style={computedStyle} />;
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 13,
    lineHeight: 16,
    color: '#798391',
  },
  body: {},
});

export { Text };
