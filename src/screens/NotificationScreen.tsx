import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, SectionList } from 'react-native';
import EmptyBox from '@assets/svg/empty-box.svg';
import Orders from '@assets/svg/orders.svg';
import Transport from '@assets/svg/transport.svg';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { useAppTheme } from '@src/theme/theme';
import { OrderStatusEnum } from '@src/types/order';
import { Box, Text } from '@src/ui';
import { wait } from '@src/utils';

type OrderData =
  | { status: OrderStatusEnum; orderNumber: string }
  | { status: OrderStatusEnum; carModel?: string; stateNumber?: string };

const DATA: OrderData[] = [
  { orderNumber: '№ 15-020342', status: OrderStatusEnum.pending },
  { orderNumber: '№ 15-020342', status: OrderStatusEnum.new },
  {
    carModel: 'FAW J7',
    stateNumber: '123 BOK 02',
    status: OrderStatusEnum.processing
  }
];

export const NotificationScreen = () => {
  const { colors, insets } = useAppTheme();
  const today = format(new Date(), 'dd MMMM', { locale: ru });

  const { t } = useTranslation()
  const getStatusIcon = (status: OrderStatusEnum) => {
    const iconProps = { borderRadius: 4, px: 6, py: 6 };
    switch (status) {
      case OrderStatusEnum.pending:
        return (
          <Box backgroundColor={colors.green} {...iconProps}>
            <Orders color={colors.white} />
          </Box>
        );
      case OrderStatusEnum.new:
        return (
          <Box backgroundColor={colors.blue} {...iconProps}>
            <Orders color={colors.white} />
          </Box>
        );
      case OrderStatusEnum.processing:
        return (
          <Box backgroundColor={colors.blue} {...iconProps}>
            <Transport color={colors.white} />
          </Box>
        );
      default:
        return null;
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await wait(1000);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SectionList
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      ListFooterComponent={() => <Box h={insets.bottom || 15} />}
      // sections={[
      //   { data: DATA, title: today },
      //   { data: DATA, title: today },
      //   { data: [...DATA, ...DATA], title: today }
      // ]}
      sections={[]}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Box
          borderWidth={1}
          borderRadius={4}
          borderColor={colors.border}
          p={8}
          gap={8}
          row
          alignItems="flex-start"
        >
          {getStatusIcon(item.status)}
          <Box>
            <Text type="h3" color={colors.dark_grey} children={item.status} />
            {'orderNumber' in item && <Text children={item.orderNumber} />}
            {'carModel' in item && (
              <Text type="h3" color={colors.dark_grey} children={item.carModel} />
            )}
            {'stateNumber' in item && (
              <Text color={colors.dark_grey} children={`Гос.номер: ${item.stateNumber}`} />
            )}
          </Box>
        </Box>
      )}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section: { title } }) => (
        <Text mt={17} mb={4} type="label" color={colors.dark_grey} children={title} />
      )}
      contentContainerStyle={{ flexGrow: 1, marginHorizontal: 16 }}
      ItemSeparatorComponent={() => <Box h={5} />}
      ListEmptyComponent={
        <Box pt={20} flex={1} justifyContent="center" gap={10} alignItems="center">
          <EmptyBox color={colors.disabled} width={50} height={50} />
          <Box>
            <Text center children={t('the_notification_list_is_empty')} />
          </Box>
        </Box>
      }
    />
  );
};
