import React, { useState } from 'react';
import { Text, View } from 'react-native';

import SosModal from '@src/components/SosModal';
import SwipeButton from '@src/components/SwipeButton';
import { useLocalization } from '@src/translations/i18n';
import { modal } from '@src/ui/Layouts/ModalLayout';
import { wait } from '@src/utils';

export const MyOrdersScreen = () => {
  const { t } = useLocalization();
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    const Element = <SosModal />;

    modal().setupModal?.({
      element: Element,
      justifyContent: 'center',
      marginHorizontal: 10,
    });
  };

  const onSwipe = async () => {
    setLoading(true);
    console.log('swipe');
    await wait(1000);
    setLoading(false);
    openModal();
  };

  return (
    <View>
      <Text children={t('my_orders_page')} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
    </View>
  );
};
