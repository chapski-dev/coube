import NoAvatarIcon from '@assets/svg/no-avatar.svg'
import { Button } from '@src/ui/Button/Button';
import { Text } from '@src/ui/Text';
import { ScreenProps } from '@src/navigation/types';
import { Box } from '@src/ui';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';

export const ProfileDataScreen = ({ navigation }: ScreenProps<'profile-data'>) => {
	const { t } = useLocalization()

	const {colors} = useAppTheme()

	return (
		<Box>
			<Box row gap={15} p={20} alignItems='center' >
				<NoAvatarIcon width={90} height={90} />
				<Box w={152} >
					<Button backgroundColor='grey' textColor='black' children={t('add-photo')}  />
				</Box>
			</Box>

			<Box p={15} >
				<Text type='label' children={t('full_name')} />
				<Text type='body_500' uppercase children='СЕРГЕЙ КРЫЛОВ ДМИТРИЕВИЧ' />
			</Box>

			<Box p={15} row justifyContent='space-between' >
				<Box>
					<Text type='label' children={t('phone')} />
					<Text type='body_500' children='+7 777 777 77 77' />
				</Box>
				<Box w={119} >
					<Button type="clear" children='Добавить телефон' />
				</Box>
			</Box>

			<Box p={15} >
				<Text type='label' children={t('iin')} />
				<Text type='body_500' children='88121155548946' />
			</Box>

			<Button type='clear' textColor='red' children={t('delete-account')}/>

		</Box>
	);
};