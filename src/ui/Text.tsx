import { removeUndefinedOnes } from '@src/utils';
import React, { FC, useMemo } from 'react';
import {
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';

type TextType = keyof typeof styles;
type Spacing = number

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
  m?: Spacing
  mx?: Spacing
  my?: Spacing
  mt?: Spacing
  mr?: Spacing
  mb?: Spacing
  ml?: Spacing
  p?: Spacing
  px?: Spacing
  py?: Spacing
  pt?: Spacing
  pr?: Spacing
  pb?: Spacing
  pl?: Spacing
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
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
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
          textTransform,
          margin: m,
          marginHorizontal: mx,
          marginVertical: my,
          marginTop: mt,
          marginRight: mr,
          marginBottom: mb,
          marginLeft: ml,
          padding: p,
          paddingHorizontal: px,
          paddingVertical: py,
          paddingTop: pt,
          paddingRight: pr,
          paddingBottom: pb,
          paddingLeft: pl,
        })
      },
      style
    ].flat();
  }, [capitalize, center, color, fontSize, fontWeight, left, lowercase, m, mb, ml, mr, mt, mx, my, p, pb, pl, pr, pt, px, py, right, style, type, uppercase]);

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
  body_500: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  body: {
    fontSize: 14,
  },
});

export {Text};