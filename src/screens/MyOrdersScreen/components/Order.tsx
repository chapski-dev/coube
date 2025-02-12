import React, { FC, useState } from 'react';
import { Image } from 'react-native';
import Circle from '@assets/svg/circle.svg';
import ThreeDots from '@assets/svg/three-dots.svg';
import { useNavigation } from '@react-navigation/native';

import { TransportationDetails } from '@src/screens/TransportationsDetailsScreen';
import geolocationService from '@src/service/geolocation-service';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Text } from '@src/ui';
import { wait } from '@src/utils';
import RightArrowIcon from '@assets/svg/arrow-right.svg';

import { OrderStatus, OrderStatusEnum } from './OrderStatus';
import { DriverStatue } from '../../OrderScreen';
import { handleCatchError } from '@src/utils/handleCatchError';

type OrderPropsTypes = TransportationDetails;

export const Order: FC<OrderPropsTypes> = (props) => {
  const { orderStatus, orderNumber, cargoName, distance, transportationRoute } =
    props;

  const { t } = useLocalization();
  const { colors } = useAppTheme();
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingDecline, setLoadingDecline] = useState(false);
  const [isOrderAccepted, setIsOrderAccepted] = useState(false);

  const navigation = useNavigation();

  const handleDecline = async () => {
    try {
      setLoadingDecline(true);
      await geolocationService.stopTracking();
      await wait(1000);
      setLoadingDecline(false);
    } catch (error) {
      handleCatchError(error);
    }
  };

  const handleAccept = async () => {
    setLoadingAccept(true);
    await wait(1000);
    setIsOrderAccepted(true),
      navigation.navigate('order-accepted', {
        driver_status: DriverStatue.accepted,
        order_status: OrderStatusEnum.loading,
        headerTitle: 'Завершить погрузку',
      });
    setLoadingAccept(false);
  };

  const openTransportationDetails = () =>
    navigation.navigate('transportation-details', props);

  return (
    <Box backgroundColor={colors.white} p={15} gap={7} flex={1}>
      <Box row w="full" justifyContent="space-between">
        <Box row gap={10}>
          <Text children="№" />
          <Text children={orderNumber} fontWeight={700} color="black" />
        </Box>
        <Box>
          <OrderStatus
            orderStatus={
              isOrderAccepted ? OrderStatusEnum.pending : orderStatus
            }
          />
        </Box>
      </Box>
      {!isOrderAccepted && (
        <>
          <Box w="full" alignItems="center">
            <Image
              source={require('@assets/png/map-orders-search-screen.png')}
            />
          </Box>
          <Box row w="full" justifyContent="flex-end">
            <Text children={t('distance')} />
            <Text children=": " />
            <Text fontWeight={500} children={distance} />
          </Box>
        </>
      )}

      <Text children={t('cargo-name')} />
      <Text type="body_500" children={cargoName} />

      <Box w="full" h={0.5} backgroundColor={colors.dark_grey} />

      <Text children={t('route')} />

      <Box row gap={10} alignItems="center">
        <Circle color="dark_grey" />
        <Text type="body_500" children={transportationRoute[0].loadingPoint} />
      </Box>
      <Box row gap={10} alignItems="center">
        {isOrderAccepted ? (
          <>
            <Box borderWidth={1} borderRadius={4} px={4} py={1}>
              <Text
                type="body_500"
                fontSize={10}
                children={transportationRoute.length - 2}
              />
            </Box>
            <Text
              type="body_500"
              children="г. Караганда, улица Шарипова, 11, "
            />
          </>
        ) : (
          <>
            <ThreeDots />
            <Box row gap={5}>
              <Text type="body_500" children="Ещё" />
              <Text type="body_500" children={transportationRoute.length - 2} />
            </Box>
          </>
        )}
      </Box>

      <Box row gap={10} alignItems="center">
        <Circle color="red" />
        <Text
          type="body_500"
          children={
            transportationRoute[transportationRoute.length - 1].loadingPoint
          }
        />
      </Box>

      {isOrderAccepted ? (
        <Button
          backgroundColor={'green'}
          onPress={() =>
            navigation.navigate('order-screen', {
              driver_status: DriverStatue.accepted,
              order_status: OrderStatusEnum.pending,
              headerTitle: 'Заказ № 15-020342',
            })
          }
        >
          <Box row alignItems={'center'} gap={10}>
            <Text
              type="body_500"
              color={colors.white}
              children={'К выполнению'}
            />
            <RightArrowIcon color={colors.white} />
          </Box>
        </Button>
      ) : (
        <>
          <Text children={t('transportation-time')} />

          <Text type="body_500" children="12.07.2024-30.07.2024" />
          <Button
            children={t('transportation-details')}
            onPress={openTransportationDetails}
            textColor="black"
            backgroundColor="grey"
            disabled={loadingAccept || loadingDecline}
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
