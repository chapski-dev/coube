import { StyleSheet, View } from 'react-native';
import NoAvatarIcon from '@assets/svg/no-avatar-big.svg'
import { Button } from '@src/ui/Button/Button';
import { Text } from '@src/ui/Text';
import { ScreenProps } from '@src/navigation/types';

export const ProfileDataScreen = ({ navigation }: ScreenProps<'profileData'>) => {
	return (
		<View>
			<View style={styles.photoWrapper}>
				<NoAvatarIcon />
				<View style={styles.addPhotoButtonWrapper}>
					<Button backgroundColor='grey'><Text fontSize={12} color='black'>Добавить фото</Text></Button>
				</View>
			</View>

			<View style={styles.infoParagraph}>
				<Text type='label'>ФИО</Text>
				<Text type='simple'>СЕРГЕЙ КРЫЛОВ ДМИТРИЕВИЧ</Text>
			</View>

			<View style={styles.phoneParagraph}>
				<View>
					<Text type='label'>Телефон</Text>
					<Text type='simple'>+7 777 777 77 77</Text>
				</View>
				<View style={styles.addPhoneButtonWrapper}>
					<Button type="clear" ><Text fontSize={12}>Добавить телефон</Text></Button>
				</View>
			</View>

			<View style={styles.infoParagraph}>
				<Text type='label'>ИНН</Text>
				<Text type='simple'>88121155548946</Text>
			</View>

			<Button type='clear' textColor='red'><Text fontSize={12} color='red'>Удалить аккаунт</Text></Button>

		</View>
	);
};

const styles = StyleSheet.create({
	photoWrapper: {
		flexDirection: 'row',
		gap: 15,
		padding: 20,
		alignItems: 'center',
	},
	addPhotoButtonWrapper: {
		width: 152,
	},
	infoParagraph: {
		padding: 15,
	},
	phoneParagraph: {
		padding: 15,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	addPhoneButtonWrapper: {
		width: 119,
	}
})