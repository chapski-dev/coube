import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { Box } from './Box';

interface InputWithButtonProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  buttonText: string | string[];
  onButtonPress?: () => void;
  inputStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
}

export const InputWithButton: React.FC<InputWithButtonProps> = ({
  placeholder,
  value,
  onChangeText,
  buttonText,
  onButtonPress,
  inputStyle,
  buttonStyle,
  buttonTextStyle,
}) => {
  const isMultipleButtons = Array.isArray(buttonText);

  return (
    <Box w="full" row flexGrow={1}>
      <Box flex={1}>
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
        />
      </Box>
      <Box flex={1} row>
        {isMultipleButtons ? (
          <Box row flex={1}>
            <Box flex={1}>
              <TouchableOpacity
                style={[styles.button, styles.additionalButton, buttonStyle]}
                onPress={onButtonPress}
              >
                <Text style={[styles.buttonText, buttonTextStyle]}>
                  {buttonText[0]}
                </Text>
              </TouchableOpacity>
            </Box>
            <Box flex={1}>
              <TouchableOpacity
                style={[styles.button, buttonStyle]}
                onPress={onButtonPress}
              >
                <Text style={[styles.buttonText, buttonTextStyle]}>
                  {buttonText[1]}
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        ) : (
          <Box flex={1}>
            <TouchableOpacity
              style={[styles.button, buttonStyle]}
              onPress={onButtonPress}
            >
              <Text style={[styles.buttonText, buttonTextStyle]}>
                {buttonText}
              </Text>
            </TouchableOpacity>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  additionalButton: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  button: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 5,
    borderColor: '#ccc',
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 5,
    borderWidth: 1,
    height: 40,
    padding: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 0,
    borderColor: '#ccc',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 0,
    borderWidth: 1,
    fontSize: 16,
    height: 40,
    padding: 10,
  },
});
