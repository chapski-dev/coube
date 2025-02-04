import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
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
		<Box w='full' row flexGrow={1} >
			<Box flex={1} >
				<TextInput
					style={[styles.input, inputStyle]}
					placeholder={placeholder}
					placeholderTextColor="#999"
					value={value}
					onChangeText={onChangeText}
				/>
			</Box>
			<Box flex={1} row >
				{
				isMultipleButtons 
				? 
				<Box row flex={1} >
					<Box flex={1}>
						<TouchableOpacity
							style={[styles.button, styles.additionalButton, buttonStyle]}
							onPress={onButtonPress}
						>
							<Text style={[styles.buttonText, buttonTextStyle]}>{buttonText[0]}</Text>
						</TouchableOpacity>
					</Box>
					<Box flex={1}>
						<TouchableOpacity
							style={[styles.button, buttonStyle]}
							onPress={onButtonPress}
						>
							<Text style={[styles.buttonText, buttonTextStyle]}>{buttonText[1]}</Text>
						</TouchableOpacity>
					</Box>

				</Box>
				: 
				<Box flex={1}>
					<TouchableOpacity
						style={[styles.button, buttonStyle]}
						onPress={onButtonPress}
					>
						<Text style={[styles.buttonText, buttonTextStyle]}>{buttonText}</Text>
					</TouchableOpacity>
				</Box>
				}
			</Box>
			
		</Box>
	);
};

const styles = StyleSheet.create({
input: {
	height: 40,
	borderWidth: 1,
	borderColor: '#ccc',
	borderTopLeftRadius: 5,
	borderBottomLeftRadius: 0,
	borderBottomRightRadius: 0,
	borderTopRightRadius: 5,
	padding: 10,
	fontSize: 16,
},
button: {
	height: 40,
	backgroundColor: '#EEEEEE',
	borderWidth: 1,
	borderColor: '#ccc',
	padding: 10,
	borderTopLeftRadius: 0,
	borderBottomLeftRadius: 0,
	borderBottomRightRadius: 5,
	borderTopRightRadius: 5,
},
additionalButton: {
	borderTopLeftRadius: 0,
	borderBottomLeftRadius: 0,
	borderBottomRightRadius: 0,
	borderTopRightRadius: 0,
},
buttonText: {
	color: 'black',
	fontSize: 16,
},
});