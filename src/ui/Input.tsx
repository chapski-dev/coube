import React, { forwardRef, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import SearchIcon from '@assets/svg/search.svg'

import { useAppTheme } from '@src/theme/theme';

import { Text } from './Text';

interface InputProps extends TextInputProps {
  label?: string;
  prompting?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: boolean;
  errorText?: string;
  required?: boolean;
  wrapperStyle?: StyleProp<ViewStyle>
  type?: 'search' | 'classic'
}

export const Input = forwardRef<InputProps, InputProps>(
  (
    {
      label,
      prompting,
      value,
      onChangeText,
      error,
      errorText,
      required,
      wrapperStyle,
      onFocus,
      onBlur,
      type,
      ...props
    },
    ref,
  ) => {
    const localRef: React.Ref<TextInput> &
      React.Ref<React.PropsWithChildren<InputProps>> = useRef(null);

    const [isFocused, setIsFocused] = useState(false);
    const { colors } = useAppTheme();

    const _onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      if (onFocus) {
        onFocus(e)
      }
    }

    const _onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      if (onBlur) {
        onBlur(e)
      }
    }

    return (
      <View style={[{ flexGrow: 1, gap: 4 }, wrapperStyle]}>
        {label && <Text style={styles.label}>
          <Text children={label} />
          {required ? <Text children='*' color={colors.red} /> : null}
        </Text>
        }
        <View
          style={[
            { ...styles.inputWrapper, borderColor: colors.border },
            isFocused && { borderColor: colors.main },
            error && styles.inputError,
          ]}>
          {type === 'search' && <SearchIcon />}
          <TextInput
            value={value}
            style={styles.input}
            onChangeText={onChangeText}
            onFocus={_onFocus}
            onBlur={_onBlur}
            placeholderTextColor={colors.border}
            //@ts-ignore
            ref={ref || localRef}
            {...props}
          />
        </View>
        {error && <Text style={styles.errorText} children={errorText} />}
        {prompting &&
          <Text
            style={{ ...styles.label, color: colors.label }}
            children={prompting}
          />}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
  },
  input: {
    flexGrow: 1,
    fontSize: 15,
    height: 50,
  },
  inputError: {
    borderColor: 'red',
  },
  inputWrapper: {
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: 'row',
    flexGrow: 1,
    gap: 9,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 13,
  },
});
