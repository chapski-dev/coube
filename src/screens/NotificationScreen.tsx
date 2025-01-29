import React from 'react';
import { SectionList } from 'react-native';
import Orders from '@assets/svg/orders.svg';
import Transport from '@assets/svg/transport.svg';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { useAppTheme } from '@src/theme/theme';
import { Box, Text } from '@src/ui';

export enum OrderStatus {
  OrderAccepted = 'Заказ принят!',
  NewOrder = 'У вас новый заказ!',
  NewTransport = 'Назначен новый транспорт',
}

type OrderData =
  | { status: OrderStatus; orderNumber: string }
  | { status: OrderStatus; carModel?: string; stateNumber?: string };

const DATA: OrderData[] = [
  { orderNumber: '№ 15-020342', status: OrderStatus.OrderAccepted },
  { orderNumber: '№ 15-020342', status: OrderStatus.NewOrder },
  {
    carModel: 'FAW J7',
    stateNumber: '123 BOK 02',
    status: OrderStatus.NewTransport,
  },
];

export const NotificationScreen = () => {
  const { colors } = useAppTheme();
  const today = format(new Date(), 'dd MMMM', { locale: ru });

  const getStatusIcon = (status: OrderStatus) => {
    const iconProps = { borderRadius: 4, px: 6, py: 6 };
    switch (status) {
      case OrderStatus.OrderAccepted:
        return (
          <Box backgroundColor={colors.green} {...iconProps}>
            <Orders color={colors.white} />
          </Box>
        );
      case OrderStatus.NewOrder:
        return (
          <Box backgroundColor={colors.blue} {...iconProps}>
            <Orders color={colors.white} />
          </Box>
        );
      case OrderStatus.NewTransport:
        return (
          <Box backgroundColor={colors.blue} {...iconProps}>
            <Transport color={colors.white} />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <SectionList
      sections={[{ data: DATA, title: today }]}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Box
          borderWidth={1}
          borderRadius={4}
          borderColor={colors.border}
          mx={17}
          p={8}
          mt={8}
          gap={8}
          row
          alignItems="flex-start"
        >
          {getStatusIcon(item.status)}
          <Box>
            <Text type="h3" color={colors.dark_grey} children={item.status} />
            {'orderNumber' in item && <Text children={item.orderNumber} />}
            {'carModel' in item && (
              <Text
                type="h3"
                color={colors.dark_grey}
                children={item.carModel}
              />
            )}
            {'stateNumber' in item && (
              <Text
                color={colors.dark_grey}
                children={`Гос.номер: ${item.stateNumber}`}
              />
            )}
          </Box>
        </Box>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Box mt={16} mx={17}>
          <Text type="label" color={colors.dark_grey} children={title} />
        </Box>
      )}
      contentContainerStyle={{flexGrow: 1}}
      ListEmptyComponent={
        <Box flex={1} justifyContent='center' alignItems='center'>
          <Text children="У вас пока нет уведомлений" />
        </Box>}
    />
  );
};
