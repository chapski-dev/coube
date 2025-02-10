import React, { useState } from 'react';

import { ScreenProps } from '@src/navigation/types';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Input, Text} from '@src/ui';


export const ContactDetails = ({navigation}: ScreenProps<'contact-details'>) => {
	const { t } = useLocalization();
	
	const [actualAdress, setActualAdress] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [accountingDocuments, setAccountingDocuments] = useState('')

	return (
		<Box px={15} py={20} gap={10}>
			<Box gap={5}>
				<Text children={t('actual-address')} />
				<Input value={actualAdress} onChangeText={setActualAdress} />
			</Box>

			<Box gap={5}>
				<Text children={t('phone')} />
				<Input placeholder='+ 7 777 777 77 77' value={phone} onChangeText={setPhone} />
			</Box>

			<Box gap={5}>
				<Text children={t('email')} />
				<Input placeholder='Cost@mail.ru' value={email} onChangeText={setEmail} />
			</Box>

			<Box gap={5}>
				<Text children={t('mail-for-accounting-documents')} />
				<Input placeholder='Cost@mail.ru' value={accountingDocuments} onChangeText={setAccountingDocuments} />
			</Box>

			<Button children={t('save')} />
		</Box>
	);
};