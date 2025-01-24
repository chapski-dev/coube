import { Text } from '@src/ui/Text';
import { Image } from 'react-native';
import { Box } from '@src/ui';
import { useAppTheme } from '@src/theme/theme';

export const IdentityScreen = () => {
	const {colors} = useAppTheme()

	return (
		<Box>

			<Box px={20} py={10} style={{ borderBottomWidth: 1, borderBottomColor: `${colors.grey}` }}>
				<Text type='label' children='ФИО' />
				<Text type='body_500' children='СЕРГЕЙ КРЫЛОВ ДМИТРИЕВИЧ' />
			</Box>

			<Box px={20} py={10} style={{ borderBottomWidth: 1, borderBottomColor: `${colors.grey}`  }}>
				<Text type='label' children='ИИН' />
				<Text type='body_500' children='88121155548946' />
			</Box>

			<Box px={20} py={10} gap={25} row style={{ borderBottomWidth: 1, borderBottomColor: `${colors.grey}`  }}>
				<Box>
					<Text type='label' children='Дата выдачи' />
					<Text type='body_500' children='12.08.2014' />
				</Box>
				<Box>
					<Text type='label' children='Срок действия' />
					<Text type='body_500' children='12.08.2034' />
				</Box>
			</Box>

			<Box px={20} py={10} style={{ borderBottomWidth: 1, borderBottomColor: `${colors.grey}`  }}>
				<Text type='label' children='Выдан' />
				<Text type='body_500' children='МИНИСТЕРСТВО ЮСТИЦИИ' />
			</Box>

			<Box pt={20} alignItems='center' >
				<Image source={require('@assets/png/identityCardPicture.png')} />
			</Box>
			
		</Box>
	);
};