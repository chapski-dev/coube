import React, {FC, useMemo} from 'react';
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
  textAlign?: TextStyle['textAlign'];
  fontWeight?: TextStyle['fontWeight'];
  fontSize?: number;
};
// TODO: add theme colors
const Text: FC<TextProps> = ({
  type,
  style,
  color,
  textAlign,
  fontWeight,
  fontSize,
  ...rest
}) => {
  const computedStyle = useMemo(() => {
    const customStyles: TextStyle = {};

    if (color) {
      customStyles.color = color;
    }
    if (textAlign) {
      customStyles.textAlign = textAlign;
    }
    if (fontWeight) {
      customStyles.fontWeight = fontWeight;
    }
    if (fontSize) {
      customStyles.fontSize = fontSize;
    }

    return [styles[type ? type : 'body'], customStyles, style].flat();
  }, [color, textAlign, fontWeight, fontSize, style, type]);

  return <RNText {...rest} style={computedStyle} />;
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 16,
    color: '#000',
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