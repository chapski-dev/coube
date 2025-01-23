import { Button } from '@src/ui/Button/Button';
import { Text } from '@src/ui/Text';
import { StyleSheet, Switch, View } from 'react-native';
import NoAvatarIcon from '@assets/svg/no-avatar.svg'
import ArrowIcon from '@assets/svg/arrow.svg'
import { useState } from 'react';
import { ChangeLanguageModal } from './ChangeLanguageModal';
import { ScreenProps } from '@src/navigation/types';

export const ProfileScreen = ({ navigation }: ScreenProps<'profile'>) => {
	const isAvatarExist = false

	const [isToggleEnabled, setIsToggleEnabled] = useState(false);
	const toggleSwitch = () => setIsToggleEnabled(previousState => !previousState);

	const openProfileData = () => {navigation.push('profileData')}
	const openIdentityData = () => {navigation.push('identity')}

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FAFAFA', paddingBottom: 250, paddingTop: 20 }}>

			<View style={[styles.tabWrapper, styles.tabWrapperNoBackground]} >
				<View style={styles.avatarAndNameWrapper}>
					{isAvatarExist ? <NoAvatarIcon /> : <NoAvatarIcon />}
					<Text type={'simple'} fontSize={18}>Сергей</Text>
				</View>
				<ArrowIcon onPress={openProfileData} />
			</View>

			<View style={styles.infoTabsWrapper}>
				<View style={styles.infoTab}>
					<View style={[styles.quantityWrapper, styles.quantityWrapperGreenBackground]}>
						<Text color='white' fontWeight={700}>4.5</Text> 
					</View>
					<Text type={'label'} fontSize={10} fontWeight={400}>Мой рейтинг</Text>
				</View>

				<View style={styles.infoTab}>
					<View style={styles.quantityWrapper}>
						<Text color='white' fontWeight={700}>115</Text> 
					</View>
					<Text type={'label'} fontSize={10} fontWeight={400}>Перевозок</Text>
				</View>

				<View style={styles.infoTab}>
					<View style={styles.quantityWrapper}>
						<Text color='white' fontWeight={700}>351 тыс.</Text>
					</View>
					<Text type={'label'} fontSize={10} fontWeight={400}>Пройдено км.</Text>
				</View>
			</View>

			<View style={styles.tabWrapper}>
				<Text type={'simple'} fontSize={14}>Отчеты</Text>
				<ArrowIcon />
			</View>

			<View>
				<View style={styles.tabWrapper}>
					<Text type={'simple'} fontSize={14}>Удостоверение личности</Text>
					<ArrowIcon onPress={openIdentityData} />
				</View>

				<View style={styles.tabWrapper}>
					<Text type={'simple'} fontSize={14}>Водительское удостоверение</Text>
					<ArrowIcon />
				</View>
			</View>

			<View>
				<View style={styles.tabWrapper}>
					<Text type={'simple'} fontSize={14}>Язык приложения</Text>
					<ArrowIcon />
				</View>

				<View style={styles.tabWrapper}>
					<Text type={'simple'} fontSize={14}>Push-уведомления</Text>
					<Switch 
						trackColor={{false: '#767577', true: '#F69C22'}}
						thumbColor={'white'}
						onValueChange={toggleSwitch}
						value={isToggleEnabled}
					/>
				</View>
			</View>

			<Button backgroundColor='white' textColor='red' >Выйти</Button>

			<Button type='clear' textColor='textSecondary' >Удалить аккаунт</Button>

		</View>
	);
}

const styles = StyleSheet.create({
	tabWrapper: {
		width: '100%',
		height: 50,
		paddingHorizontal: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#FFFFFF'
	},
	tabWrapperNoBackground: {
		backgroundColor: 'none',
	},
	avatarAndNameWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 15,
	},

	infoTabsWrapper: {
		flexDirection: 'row',
		width: '100%',
		gap: 5,
		paddingHorizontal: 15
	},

	infoTab: {
		backgroundColor: '#EDEDED',
		borderRadius: 9,
		justifyContent: 'center',
		alignItems: 'flex-start',
		gap: 3,
		padding: 10,
		width: 126,
		height: 72,
	},
	quantityWrapper: {
		backgroundColor: '#494D4E',
		borderRadius: 35,
		paddingHorizontal: 10,
		paddingVertical: 3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	quantityWrapperGreenBackground: {
		backgroundColor: '#81CC20'
	},
})

