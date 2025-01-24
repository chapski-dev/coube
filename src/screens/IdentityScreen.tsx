import { Text } from '@src/ui/Text';
import { Image } from 'react-native';
import { Box } from '@src/ui';
import { useAppTheme } from '@src/theme/theme';

export const IdentityScreen = () => {
	const {colors} = useAppTheme()

	return (
		<Box>

			<Box px={20} py={10} style={{ borderBottomWidth: 1, borderBottomColor: `${colors.grey}` }}>
				<Text type='label'>ФИО</Text>
				<Text type='body_500'>СЕРГЕЙ КРЫЛОВ ДМИТРИЕВИЧ</Text>
			</Box>

			<Box px={20} py={10} style={{ borderBottomWidth: 1, borderBottomColor: `${colors.grey}`  }}>
				<Text type='label'>ИИН</Text>
				<Text type='body_500'>88121155548946</Text>
			</Box>

			<Box px={20} py={10} gap={25} row style={{ borderBottomWidth: 1, borderBottomColor: `${colors.grey}`  }}>
				<Box>
					<Text type='label'>Дата выдачи</Text>
					<Text type='body_500'>12.08.2014</Text>
				</Box>
				<Box>
					<Text type='label'>Срок действия</Text>
					<Text type='body_500'>12.08.2034</Text>
				</Box>
			</Box>

			<Box px={20} py={10} style={{ borderBottomWidth: 1, borderBottomColor: `${colors.grey}`  }}>
				<Text type='label'>Выдан</Text>
				<Text type='body_500'>МИНИСТЕРСТВО ЮСТИЦИИ</Text>
			</Box>

			<Box pt={20} alignItems='center' >
				<Image source={require('@assets/png/identityCardPicture.png')} />
			</Box>
			
		</Box>
	);
};