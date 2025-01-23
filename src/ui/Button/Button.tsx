import { AppLightTheme, useAppTheme } from '@src/theme/theme';
import { merge } from 'lodash';
import React, { FC, useMemo } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
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
  type?: ButtonType
  backgroundColor?: keyof typeof AppLightTheme.colors;
  textColor?: keyof typeof AppLightTheme.colors;
}

const typeStyle = {
  clear: merge({}, commonStytle, clearStyle),
  filled: merge({}, commonStytle, filledStyle),
  outline: merge({}, commonStytle, outlineStyle),
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
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => typeStyle[type], [type]);
  const generateBgColor = useMemo(() => {
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

  const generateTextColor = useMemo(() => {
    if(textColor){
      return colors[textColor];
    } else if (type === 'filled' && !textColor ) {
      return colors.textDefaultReverse;
    } else {
      return colors.textDefault;
    }
  }, [colors, textColor, type]);

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <TouchableOpacity
        activeOpacity={0.3}
        style={disabled ? [
          styles.button,
          buttonStyle,
          styles.buttonDisabled,
          buttonDisabledStyle,
          { backgroundColor: generateBgColor },
        ] : [styles.button,
          buttonStyle,
        { backgroundColor: generateBgColor },
        ]}
        disabled={disabled}
        onPress={onPress}>
        {loading ? <ActivityIndicator color="white" /> : <Text style={[styles.text, {color: generateTextColor}, textStyle]} children={children} />}
      </TouchableOpacity>
    </View>
  );
};


