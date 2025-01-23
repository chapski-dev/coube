import { Button } from '@src/ui/Button/Button';
import { Text } from '@src/ui/Text';
import { Switch } from 'react-native';
import NoAvatarIcon from '@assets/svg/no-avatar.svg'
import ArrowIcon from '@assets/svg/arrow.svg'
import { useState } from 'react';
import { ChangeLanguageModal } from './ChangeLanguageModal';
import { ScreenProps } from '@src/navigation/types';
import { Box } from '@src/ui';
import { useAppTheme } from '@src/theme/theme';

export const ProfileScreen = ({ navigation }: ScreenProps<'profile'>) => {
	const isAvatarExist = false

	const [isToggleEnabled, setIsToggleEnabled] = useState(false);
	const toggleSwitch = () => setIsToggleEnabled(previousState => !previousState);

	const openProfileData = () => {navigation.push('profile-data')}
	const openIdentityData = () => {navigation.push('identity')}

	const {colors} = useAppTheme()

	return (
		<Box style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FAFAFA', paddingBottom: 250, paddingTop: 20 }}>

			<Box w='full' h={50} px={15} row={true} alignItems='center' justifyContent='space-between' >
				<Box row={true} alignItems='center' gap={15} >
					{isAvatarExist ? <NoAvatarIcon /> : <NoAvatarIcon />}
					<Text type='bodyBold' fontSize={18} >Сергей</Text>
				</Box>
				<ArrowIcon onPress={openProfileData} />
			</Box>

			<Box row={true} w='full' gap={5} px={15} >
				<Box backgroundColor={colors.grey} borderRadius={9} justifyContent='center' alignItems='flex-start' gap={3} p={10} w={126} h={72} >
					<Box backgroundColor={colors.green} borderRadius={35} px={10} py={3} alignItems='center' justifyContent='center' >
						<Text color='white' fontWeight={700}>4.5</Text> 
					</Box>
					<Text type={'label'} fontSize={10} fontWeight={400}>Мой рейтинг</Text>
				</Box>

				<Box backgroundColor={colors.grey} borderRadius={9} justifyContent='center' alignItems='flex-start' gap={3} p={10} w={126} h={72} >
					<Box backgroundColor={colors.darkGrey} borderRadius={35} px={10} py={3} alignItems='center' justifyContent='center' >
						<Text color='white' fontWeight={700}>115</Text> 
					</Box>
					<Text type={'label'} fontSize={10} fontWeight={400}>Перевозок</Text>
				</Box>

				<Box backgroundColor={colors.grey} borderRadius={9} justifyContent='center' alignItems='flex-start' gap={3} p={10} w={126} h={72} >
					<Box backgroundColor={colors.darkGrey} borderRadius={35} px={10} py={3} alignItems='center' justifyContent='center' >
						<Text color='white' fontWeight={700}>351 тыс.</Text>
					</Box>
					<Text type={'label'} fontSize={10} fontWeight={400}>Пройдено км.</Text>
				</Box>
			</Box>

			<Box w='full' h={50} px={15} row={true} alignItems='center' justifyContent='space-between' >
				<Text type={'bodyBold'} fontSize={14}>Отчеты</Text>
				<ArrowIcon />
			</Box>

			<Box>
			<Box w='full' h={50} px={15} row={true} alignItems='center' justifyContent='space-between' >
					<Text type={'bodyBold'} fontSize={14}>Удостоверение личности</Text>
					<ArrowIcon onPress={openIdentityData} />
				</Box>

				<Box w='full' h={50} px={15} row={true} alignItems='center' justifyContent='space-between' >
					<Text type={'bodyBold'} fontSize={14}>Водительское удостоверение</Text>
					<ArrowIcon />
				</Box>
			</Box>

			<Box>
				<Box w='full' h={50} px={15} row={true} alignItems='center' justifyContent='space-between' >
					<Text type={'bodyBold'} fontSize={14}>Язык приложения</Text>
					<ArrowIcon />
				</Box>

				<Box w='full' h={50} px={15} row={true} alignItems='center' justifyContent='space-between' >
					<Text type={'bodyBold'} fontSize={14}>Push-уведомления</Text>
					<Switch 
						trackColor={{false: '#767577', true: '#F69C22'}}
						thumbColor={'white'}
						onValueChange={toggleSwitch}
						value={isToggleEnabled}
					/>
				</Box>
			</Box>

			<Button backgroundColor='white' textColor='red' children='Выйти' />

			<Button type='clear' textColor='textSecondary' children='Удалить аккаунт' />

		</Box>
	);
}

