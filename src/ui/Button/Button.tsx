import React, { FC, ReactNode, useMemo } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle
} from 'react-native';
import { merge } from 'lodash';

import { AppLightTheme, useAppTheme } from '@src/theme/theme';

import { clearStyle, commonStytle, filledStyle, outlineStyle } from './Button.styles';

type ButtonType = keyof typeof typeStyle;

interface PropsType extends ViewProps {
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  wrapperStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonDisabledStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  type?: ButtonType;
  backgroundColor?: keyof typeof AppLightTheme.colors;
  textColor?: keyof typeof AppLightTheme.colors;
  borderColor?: keyof typeof AppLightTheme.colors;
  icon?: ReactNode;
}

const typeStyle = {
  clear: merge({}, commonStytle, clearStyle),
  filled: merge({}, commonStytle, filledStyle),
  outline: merge({}, commonStytle, outlineStyle)
};

export const Button: FC<PropsType> = ({
  disabled,
  loading,
  onPress,
  wrapperStyle,
  buttonStyle,
  buttonDisabledStyle,
  textStyle,
  children,
  type = 'filled',
  backgroundColor,
  textColor,
  borderColor,
  icon
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => typeStyle[type], [type]);
  const _bgColor = useMemo(() => {
    if (backgroundColor && type !== 'filled') {
      return colors[backgroundColor];
    } else if (!backgroundColor && type === 'filled') {
      return colors.main;
    } else if (backgroundColor && type === 'filled') {
      return colors[backgroundColor];
    } else {
      return 'transparent';
    }
  }, [backgroundColor, colors, type]);

  const _textColor = useMemo(() => {
    if (textColor) {
      return colors[textColor];
    } else if (type === 'filled' && !textColor) {
      return colors.textDefaultReverse;
    } else {
      return colors.textDefault;
    }
  }, [colors, textColor, type]);

  const _borderColor = useMemo(() => {
    if (borderColor) {
      return colors[borderColor];
    } else if (type === 'outline' && !borderColor) {
      return colors.black;
    }
  }, [borderColor, type, colors]);

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <TouchableOpacity
        activeOpacity={0.3}
        style={
          disabled
            ? [
                styles.button,
                buttonStyle,
                styles.buttonDisabled,
                buttonDisabledStyle,
                { backgroundColor: _bgColor }
              ]
            : [
                styles.button,
                buttonStyle,
                { backgroundColor: _bgColor },
                { borderColor: _borderColor }
              ]
        }
        disabled={disabled}
        onPress={onPress}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <View style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}>
            <Text
              style={[styles.text, { color: _textColor }, textStyle]}
              children={children}
            />
            {icon}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
