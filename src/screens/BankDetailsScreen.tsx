import React, { useState } from 'react';

import { ScreenProps } from '@src/navigation/types';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Input } from '@src/ui';

export const BankDetailsScreen = ({
  navigation,
}: ScreenProps<'bank-details'>) => {
  const { t } = useLocalization();

  const [accountNumber, setAccountNumber] = useState('');
  const [bank, setBank] = useState('');
  const [bik, setBik] = useState('');

  return (
    <Box px={15} py={20} gap={10}>
      <Input
        label={t('account-number')}
        placeholder="KZ12345677889965"
        value={accountNumber}
        onChangeText={setAccountNumber}
      />

      <Input
        label={t('bank')}
        placeholder="AO «KaspiBank»"
        value={bank}
        onChangeText={setBank}
      />

      <Input
        label={t('bik')}
        placeholder="153255366844"
        value={bik}
        onChangeText={setBik}
      />

      <Button children={t('save')} />
    </Box>
  );
};
