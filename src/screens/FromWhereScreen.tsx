import { Box, Button, Input, Text } from "@src/ui";
import { useAppTheme } from "@src/theme/theme";
import { ScreenProps } from '@src/navigation/types';
import { useState } from "react";
import { useLocalization } from "@src/translations/i18n";

export const FromWhereScreen = ({ navigation }: ScreenProps<'from-where'>) => {
	const {colors} = useAppTheme()
	const { t } = useLocalization()

	const [inputValue, setInputValue] = useState('')

	return (
		<Box p={15}>

			<Input placeholder={t('city')} type="search" value={inputValue} onChangeText={setInputValue} color={colors.grey} />

			<Box onPress={() => null} py={7} ><Text type="body_500" children={t('whole-kazakstan')}/></Box>
			<Box onPress={() => null} py={7} ><Text type="body_500" children={t('astana')}/></Box>
			<Box onPress={() => null} py={7} ><Text type="body_500" children={t('almaty')}/></Box>
			<Box onPress={() => null} py={7} ><Text type="body_500" children={t('shimkent')}/></Box>
			<Box onPress={() => null} py={7} ><Text type="body_500" children={t('almatynskaya-oblast')}/></Box>
			<Box onPress={() => null} py={7} ><Text type="body_500" children={t('akmolinskaya-oblast')}/></Box>

		</Box>
	);
};