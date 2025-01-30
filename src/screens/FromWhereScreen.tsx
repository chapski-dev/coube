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

			<Input placeholder={t('city')} value={inputValue} onChangeText={(text) => {setInputValue(text)}} color={colors.grey} />

			<Button type='clear' buttonStyle={{ alignItems: 'flex-start', paddingLeft: 15 }} children={t('whole-kazakstan')} />
			<Button type='clear' buttonStyle={{ alignItems: 'flex-start', paddingLeft: 15 }} children={t('astana')} />
			<Button type='clear' buttonStyle={{ alignItems: 'flex-start', paddingLeft: 15 }} children={t('almaty')} />
			<Button type='clear' buttonStyle={{ alignItems: 'flex-start', paddingLeft: 15 }} children={t('shimkent')} />
			<Button type='clear' buttonStyle={{ alignItems: 'flex-start', paddingLeft: 15 }} children={t('almatynskaya-oblast')} />
			<Button type='clear' buttonStyle={{ alignItems: 'flex-start', paddingLeft: 15 }} children={t('akmolinskaya-oblast')} />

		</Box>
	);
};