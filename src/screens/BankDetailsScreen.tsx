/* eslint-disable max-len */
import React, { useState } from 'react';

import { ScreenProps } from '@src/navigation/types';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Input, Text} from '@src/ui';


export const BankDetailsScreen = ({navigation}: ScreenProps<'bank-details'>) => {
	const { t } = useLocalization();
	
	const [accountNumber, setAccountNumber] = useState('')
	const [bank, setBank] = useState('')
	const [BIK, setBIK] = useState('')

	return (
		<Box px={15} py={20} gap={10}>
			<Box gap={5}>
				<Text children={t('account-number')} />
				<Input placeholder='KZ12345677889965' value={accountNumber} onChangeText={setAccountNumber} />
			</Box>

			<Box gap={5}>
				<Text children={t('bank')} />
				<Input placeholder='AO «KaspiBank»' value={bank} onChangeText={setBank} />
			</Box>

			<Box gap={5}>
				<Text children={t('bik')} />
				<Input placeholder='153255366844' value={BIK} onChangeText={setBIK} />
			</Box>

			<Button type='filled' children={t('save')} />
		</Box>
	);
};