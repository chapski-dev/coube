import React, { forwardRef, useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Text } from './Text';
import { useAppTheme } from '@src/theme/theme';

interface InputProps extends TextInputProps {
  label?: string;
  prompting?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: boolean;
  errorText?: string;
  required?: boolean;
  wrapperStyle?: StyleProp<ViewStyle>
}

export const Input = forwardRef<InputProps, InputProps>(
  (
    { label, prompting, value, onChangeText, error, errorText, required, wrapperStyle, ...props },
    ref,
  ) => {
    const localRef: React.Ref<TextInput> &
      React.Ref<React.PropsWithChildren<InputProps>> = useRef(null);

    const [isFocused, setIsFocused] = useState(false);
    const { colors } = useAppTheme();

    return (
      <View style={[{ gap: 8, flexGrow: 1 }, wrapperStyle]}>
        {label && <Text style={styles.label}>
          <Text children={label} />
          {required ? <Text children={'*'} color={colors.red} /> : null}
        </Text>
        }
        <View
          style={[
            styles.inputWrapper,
            isFocused && { borderColor: colors.main },
            error && styles.inputError,
          ]}>
          <TextInput
            value={value}
            style={styles.input}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            //@ts-ignore
            ref={ref || localRef}
            {...props}
          />
        </View>
        {error && <Text style={styles.errorText} children={errorText} />}
        {prompting && <Text style={styles.label} children={prompting} />}
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
    borderColor: '#E8ECF0',
    paddingRight: 10,
    flexGrow: 1,
  },
  input: {
    flexGrow: 1,
    fontSize: 15,
    paddingLeft: 20,
    height: 50,
  },
  inputFocused: {
    borderColor: '#0090FF',
  },
  inputError: {
    borderColor: 'red',
  },
  label: {
    fontSize: 13,
    lineHeight: 16,
    color: '#798391',
  },
  errorText: {
    color: 'red',
  },
});
