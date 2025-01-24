import NoAvatarIcon from '@assets/svg/no-avatar.svg'
import { Button } from '@src/ui/Button/Button';
import { Text } from '@src/ui/Text';
import { ScreenProps } from '@src/navigation/types';
import { Box } from '@src/ui';
import { useAppTheme } from '@src/theme/theme';

export const ProfileDataScreen = ({ navigation }: ScreenProps<'profile-data'>) => {

	const {colors} = useAppTheme()

	return (
		<Box>
			<Box row gap={15} p={20} alignItems='center' >
				<NoAvatarIcon width={90} height={90} />
				<Box w={152} >
					<Button backgroundColor='grey' textColor='black' children='Добавить фото' />
				</Box>
			</Box>

			<Box p={15} >
				<Text type='label' children='ФИО' />
				<Text type='body_500' uppercase children='СЕРГЕЙ КРЫЛОВ ДМИТРИЕВИЧ' />
			</Box>

			<Box p={15} row justifyContent='space-between' >
				<Box>
					<Text type='label' children='Телефон' />
					<Text type='body_500' children='+7 777 777 77 77' />
				</Box>
				<Box w={119} >
					<Button type="clear" children='Добавить телефон' />
				</Box>
			</Box>

			<Box p={15} >
				<Text type='label' children='ИНН' />
				<Text type='body_500'  children='88121155548946' />
			</Box>

			<Button type='clear' textColor='red' children='Удалить аккаунт' />

		</Box>
	);
};