import React, { FC, useState } from 'react';
import RightArrowIcon from '@assets/svg/arrow-right.svg';
import Circle from '@assets/svg/circle.svg';
import ThreeDots from '@assets/svg/three-dots.svg';
import { useNavigation } from '@react-navigation/native';

import { acceptDriverOrder, rejectDriverOrder } from '@src/api';
import { OrderDetails } from '@src/api/types';
import MapWithDistance from '@src/components/MapWithDistance';
import geolocationService from '@src/service/geolocation-service';
import ordersService from '@src/service/orders';
import useTransportationStore from '@src/service/transportation-service';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { DriverStatusEnum, OrderStatusEnum } from '@src/types/order';
import { Box, Button, Text } from '@src/ui';
import { wait } from '@src/utils';
import { handleCatchError } from '@src/utils/handleCatchError';

import { OrderStatusLabel } from './OrderStatusLabel';

type OrderPropsTypes = OrderDetails;

export const Order: FC<OrderPropsTypes> = (props) => {
  const { transportationCargoInfoResponse, transportationMainInfoResponse } = props;

  const navigation = useNavigation();

  const { t } = useLocalization();
  const { colors } = useAppTheme();
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingDecline, setLoadingDecline] = useState(false);
  const [isOrderAccepted, setIsOrderAccepted] = useState(props.hasAlreadyApplied);

  const { setOrderStatus } = useTransportationStore();

  const handleDecline = async () => {
    try {
      setLoadingDecline(true);
      await rejectDriverOrder(props.transportationMainInfoResponse.id)
      await ordersService.refresh()
      await geolocationService.stopTracking();
      await wait(1000);
      setLoadingDecline(false);
    } catch (error) {
      handleCatchError(error);
    }
  };

  const handleAccept = async () => {
    try {
      setLoadingAccept(true);
      await acceptDriverOrder(props.transportationMainInfoResponse.id)
      await geolocationService.startTracking();
      setOrderStatus(OrderStatusEnum.pending);
      await wait(1000);
      setIsOrderAccepted(true);
      navigation.navigate('order-accepted', {
        order_number: props.transportationMainInfoResponse.id.toString()
      });
    } catch (error) {
      handleCatchError(error);
    } finally {
      setLoadingAccept(false);
    }
  };

  const goToOrderScreen = () =>
    navigation.navigate('order-screen', {
      ...props,
      driver_status: DriverStatusEnum.accepted,
      order_status: OrderStatusEnum.pending
    });

  const openTransportationDetails = async () =>
    navigation.navigate('transportation-details', props);

  return (
    <Box
      backgroundColor={colors.white}
      p={15}
      gap={8}
      flex={1}
      borderColor={colors.border}
      style={{ borderBottomWidth: 1, borderTopWidth: 1 }}
    >
      <Box row w="full" justifyContent="space-between" alignItems="center">
        <Box row gap={10} alignItems="center">
          <Text fontSize={12} color={colors.textSecondary} children="№" />
          <Text
            color={colors.textDefault}
            fontWeight="bold"
            children={transportationMainInfoResponse.id}
          />
        </Box>
        <OrderStatusLabel
          status={isOrderAccepted ? OrderStatusEnum.pending : transportationMainInfoResponse.status}
        />
      </Box>

      <MapWithDistance route={transportationCargoInfoResponse.cargoLoadings} />
      <Box gap={4}>
        <Text color={colors.textSecondary} children={t('cargo-name')} />
        <Text type="body_500" children={transportationMainInfoResponse.cargoName} />
      </Box>

      <Box w="full" h={0.5} backgroundColor={colors.disabled} />

      <Box gap={4}>
        <Text color={colors.textSecondary} children={t('route')} />
        <Box gap={8}>
          {transportationCargoInfoResponse.cargoLoadings.map((el, i, arr) => {
            const isFirst = i === 0;
            const isLast = i === arr.length - 1;
            if (isFirst) {
              return (
                <Box key={i} row gap={10} alignItems="center">
                  <Circle color="dark_grey" />
                  <Text type="body_500" children={el.address} />
                </Box>
              );
            }
            if (arr.length > 2 && !isLast)
              return (
                <Box key={i} row gap={10} alignItems="center">
                  <ThreeDots />
                  <Box row gap={5}>
                    <Text type="body_500" children="Ещё" />
                    <Text type="body_500" children={arr.length - 2} />
                  </Box>
                </Box>
              );
            if (isLast) {
              return (
                <Box key={i} row gap={10} alignItems="center">
                  <Circle color="red" />
                  <Text type="body_500" children={arr[arr.length - 1].address} />
                </Box>
              );
            }
          })}
        </Box>
      </Box>

      <Box gap={4}>
        <Text color={colors.textSecondary} children={t('transportation-time')} />
        <Text type="body_500" children="12.07.2024-30.07.2024" />
      </Box>

      {isOrderAccepted ? (
        <Button
          children={t('to-be-executed')}
          icon={<RightArrowIcon color={colors.white} />}
          backgroundColor={'green'}
          onPress={goToOrderScreen}
        />
      ) : (
        <>
          <Button
            children={t('transportation-details')}
            onPress={openTransportationDetails}
            textColor="black"
            backgroundColor="grey"
            disabled={loadingAccept || loadingDecline}
            icon={<RightArrowIcon color={colors.textDefault} />}
          />

          <Box row w="full" gap={20} flexGrow={1}>
            <Button
              disabled={loadingAccept || loadingDecline}
              loading={loadingDecline}
              children={t('decline')}
              backgroundColor="red"
              wrapperStyle={{ flex: 1 }}
              onPress={handleDecline}
            />

            <Button
              disabled={loadingAccept || loadingDecline}
              loading={loadingAccept}
              children={t('accept')}
              backgroundColor="green"
              wrapperStyle={{ flex: 1 }}
              onPress={handleAccept}
            />
          </Box>
        </>
      )}
    </Box>
  );
};
