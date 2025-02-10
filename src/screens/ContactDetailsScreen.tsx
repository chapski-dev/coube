import React, { useState } from 'react';

import { ScreenProps } from '@src/navigation/types';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Input } from '@src/ui';

export const ContactDetails = ({
  navigation,
}: ScreenProps<'contact-details'>) => {
  const { t } = useLocalization();

  const [actualAdress, setActualAdress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [accountingDocuments, setAccountingDocuments] = useState('');

  return (
    <Box px={15} py={20} gap={10}>
      <Input
        label={t('actual-address')}
        value={actualAdress}
        onChangeText={setActualAdress}
      />

      <Input
        label={t('phone')}
        placeholder="+ 7 777 777 77 77"
        value={phone}
        onChangeText={setPhone}
      />

      <Input
        label={t('email')}
        placeholder="Cost@mail.ru"
        value={email}
        onChangeText={setEmail}
      />

      <Input
        label={t('mail-for-accounting-documents')}
        placeholder="Cost@mail.ru"
        value={accountingDocuments}
        onChangeText={setAccountingDocuments}
      />

      <Button children={t('save')} />
    </Box>
  );
};
