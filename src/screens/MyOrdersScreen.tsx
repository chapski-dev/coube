import React from 'react';
import { Text, View } from 'react-native';

import { useLocalization } from '@src/translations/i18n';

export const MyOrdersScreen = () => {
  const { t } = useLocalization();

  return (
    <View>
      <Text children={t('my_orders_page')} />
    </View>
  );
};
