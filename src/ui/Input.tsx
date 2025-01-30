import React, { forwardRef, useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { Text } from './Text';
import { useAppTheme } from '@src/theme/theme';
import SearchIcon from '@assets/svg/search.svg'
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
  color?: string
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
      <View style={[{ gap: 4, flexGrow: 1 }, wrapperStyle]}>
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
        {prompting && <Text style={{ ...styles.label, color: colors.label }} children={prompting} />}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    flexGrow: 1,
    gap: 9,
  },
  input: {
    flexGrow: 1,
    fontSize: 15,
    height: 50,
  },
  inputError: {
    borderColor: 'red',
  },
  label: {
    fontSize: 13,
  },
  errorText: {
    color: 'red',
  },
});
