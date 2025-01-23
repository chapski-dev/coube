import { Text } from '@src/ui/Text';
import { Image, StyleSheet, View } from 'react-native';

export const IdentityScreen = () => {
	return (
		<View>

			<View style={styles.identityParagraph}>
				<Text type='label'>ФИО</Text>
				<Text type='simple'>СЕРГЕЙ КРЫЛОВ ДМИТРИЕВИЧ</Text>
			</View>

			<View style={styles.identityParagraph}>
				<Text type='label'>ИИН</Text>
				<Text type='simple'>88121155548946</Text>
			</View>

			<View style={[styles.identityParagraph, styles.identityParagraphDates]}>
				<View>
					<Text type='label'>Дата выдачи</Text>
					<Text type='simple'>12.08.2014</Text>
				</View>
				<View>
					<Text type='label'>Срок действия</Text>
					<Text type='simple'>12.08.2034</Text>
				</View>
			</View>

			<View style={styles.identityParagraph}>
				<Text type='label'>Выдан</Text>
				<Text type='simple'>МИНИСТЕРСТВО ЮСТИЦИИ</Text>
			</View>

			<View style={styles.identityCardWrapper}>
				<Image source={require('@assets/png/identityCardPicture.png')} />
			</View>
			
		</View>
	);
};

const styles = StyleSheet.create({
	identityParagraph: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#EDEDED'
	},
	identityParagraphDates: {
		flexDirection: 'row',
		gap: 25,
	},
	identityCardWrapper: {
		paddingTop: 20,
		alignItems: 'center',
	}
})
