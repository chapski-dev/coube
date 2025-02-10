import React, { useState } from 'react';

import { ScreenProps } from '@src/navigation/types';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Input } from '@src/ui';

export const BankDetailsScreen = ({navigation}: ScreenProps<'bank-details'>) => {
	const { t } = useLocalization();
	
	const [accountNumber, setAccountNumber] = useState('')
	const [bank, setBank] = useState('')
	const [bik, setBik] = useState('')

	return (
		<Box px={15} py={20} gap={10}>
			<Box gap={5}>
				<Input label={t('account-number')} placeholder='KZ12345677889965' value={accountNumber} onChangeText={setAccountNumber} />
			</Box>

			<Box gap={5}>
				<Input label={t('bank')} placeholder='AO «KaspiBank»' value={bank} onChangeText={setBank} />
			</Box>

			<Box gap={5}>
				<Input label={t('bik')} placeholder='153255366844' value={bik} onChangeText={setBik} />
			</Box>

			<Button children={t('save')} />
		</Box>
	);
};