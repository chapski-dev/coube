import React, { FC } from 'react';
import RightArrowIcon from '@assets/svg/arrow-right.svg';
import Circle from '@assets/svg/circle.svg';
import ThreeDots from '@assets/svg/three-dots.svg';
import { useNavigation } from '@react-navigation/native';

import { OrderDetails, TransportationStatusEnum } from '@src/api/types';
import { AcceptOrDeclineOrderButtons } from '@src/components/AcceptOrDeclineOrderButtons';
import MapWithDistance from '@src/components/MapWithDistance';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Text } from '@src/ui';

import { OrderStatusLabel } from './OrderStatusLabel';

type OrderCardPropsTypes = OrderDetails;

export const OrderCard: FC<OrderCardPropsTypes> = (props) => {
  const { transportationCargoInfoResponse, transportationMainInfoResponse } = props;

  const navigation = useNavigation();

  const { t } = useLocalization();
  const { colors } = useAppTheme();

  // const goToOrderScreen = () => geolocationService.start()
  // const goToOrderScreen = () => geolocationService.stop()
  // const goToOrderScreen = () => getOrderDetailById(12).then(res => console.log(res))
  // const goToOrderScreen = () => BackgroundGeolocation.getLog().then(log => {
  //   console.log('[Логи]', log);
  // });
  // const goToOrderScreen = () =>console.log('[Логи]', BackgroundGeolocation.logger.getLog());
  // const goToOrderScreen = () =>console.log('[Логи]', BackgroundGeolocation.logger.getLog());
  const goToOrderScreen = () => navigation.navigate('order-screen', props);

    // navigation.navigate('order-screen', props);

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
          status={transportationMainInfoResponse.status}
        />
      </Box>
      {transportationMainInfoResponse.status ===
        TransportationStatusEnum.WAITING_DRIVER_CONFIRMATION && (
          <Box ml={-15}>
            <MapWithDistance route={transportationCargoInfoResponse.cargoLoadings} />
          </Box>
      )}
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

      {props.transportationMainInfoResponse.status === TransportationStatusEnum.DRIVER_ACCEPTED || 
      props.transportationMainInfoResponse.status === TransportationStatusEnum.ON_THE_WAY ? (
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
            icon={<RightArrowIcon color={colors.textDefault} />}
          />
          <AcceptOrDeclineOrderButtons {...props} />
        </>
      )}
    </Box>
  );
};
