import React, { useEffect, useMemo, useState } from 'react';
import { Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RhombusArrowIcon from '@assets/svg/arrow-in-a-rhombus.svg';
import Circle from '@assets/svg/circle.svg';

import {
  arrivalDriverOrder,
  departureDriverOrder,
  startDriverOrder,
} from '@src/api';
import { OrderDetails, TransportationStatusEnum } from '@src/api/types';
import MapWithDistance from '@src/components/MapWithDistance';
import SosModal from '@src/components/SosModal';
import SwipeButton from '@src/components/SwipeButton';
import { TransportationRoute } from '@src/components/TransportationRoute';
import { EventBusEvents } from '@src/events';
import { ScreenProps } from '@src/navigation/types';
// import geolocationService from '@src/service/geolocation-service';
import ordersService from '@src/service/orders';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Accordion, Box, Button, Text } from '@src/ui';
import { modal } from '@src/ui/Layouts/ModalLayout';
import { wait } from '@src/utils';
import { dateFormat } from '@src/utils/date-format';
import { getHighAccuracyPosition } from '@src/utils/get-current-geo-position';
import { handleCatchError } from '@src/utils/handleCatchError';
import { openYandexMaps } from '@src/utils/yandex-maps';

import { OrderStatusLabel } from './MyOrdersScreen/components/OrderStatusLabel';

export const OrderScreen = ({
  navigation,
  route,
}: ScreenProps<'order-screen'>) => {
  const { colors, insets } = useAppTheme();
  const { t } = useLocalization();

  const [order, setOrder] = useState<OrderDetails | undefined>(() =>
    ordersService.orders.find(
      (el) =>
        el.transportationMainInfoResponse.id ===
        route.params.transportationMainInfoResponse.id,
    ),
  );

  useEffect(() => {
    const unsubscribe = ordersService.subscribe<OrderDetails[]>(
      EventBusEvents.getOrders,
      ({ payload }) => {
        const currentOrder = payload?.find(
          (el) =>
            el.transportationMainInfoResponse.id ===
            route.params.transportationMainInfoResponse.id,
        );
        setOrder(currentOrder);
      },
    );

    return () => unsubscribe.unsubscribe();
  }, [route.params.transportationMainInfoResponse.id]);

  const btnText = useMemo(() => {
    if (!order) return '';

    if (
      order.transportationMainInfoResponse.status !==
      TransportationStatusEnum.ON_THE_WAY
    ) {
      return t('start_trip');
    }

    const atLocation = order.transportationCargoInfoResponse.cargoLoadings.find(
      (el) => el.isDriverAtLocation,
    );
    console.log('--->', order.transportationCargoInfoResponse.cargoLoadings);

    console.log(atLocation);

    if (atLocation?.loadingType.code === 'LOADING') {
      return t('complete_loading');
    }

    if (atLocation?.loadingType.code === 'UNLOADING') {
      return t('complete_unloading');
    }

    const activeLoading =
      order.transportationCargoInfoResponse.cargoLoadings.find(
        (el) => el.isActive,
      );

    if (activeLoading?.loadingType.code === 'LOADING') {
      return t('arrived_to_unloading');
    }

    if (activeLoading?.loadingType.code === 'UNLOADING') {
      return t('arrived_to_unloading');
    }

    return '';
  }, [order, t]);

  const [loading, setLoading] = useState(false);

  const orderIsActive =
    order?.transportationCargoInfoResponse.cargoLoadings.find(
      (el) => el.isActive,
    );

  
  const handleSubmit = async () => {
    if (!order) return;

    try {
      setLoading(true);
      const {
        transportationMainInfoResponse,
        transportationCargoInfoResponse,
      } = order;
      const activeLoading = transportationCargoInfoResponse.cargoLoadings.find(
        (el) => el.isActive,
      );
      const atLocation = transportationCargoInfoResponse.cargoLoadings.find(
        (el) => el.isDriverAtLocation,
      );

      let apiCall;

      if (
        transportationMainInfoResponse.status !==
        TransportationStatusEnum.ON_THE_WAY
      ) {
        // Начало поездки
        apiCall = startDriverOrder(transportationMainInfoResponse.id);
      } else if (atLocation) {
        // Завершение операции в точке
        const currentPoint = await getHighAccuracyPosition();
        apiCall = departureDriverOrder({
          cargoLoadingId: orderIsActive?.id,
          point: currentPoint,
          transportationId: transportationMainInfoResponse.id,
        });
      } else if (activeLoading) {
        // Прибытие на точку
        const currentPoint = await getHighAccuracyPosition();

        apiCall = arrivalDriverOrder({
          cargoLoadingId: orderIsActive?.id,
          point: currentPoint,
          transportationId: transportationMainInfoResponse.id,
        });
      } else {
        throw new Error(t('errors.unknown_error'));
      }

      const updatedOrder = await apiCall;
      ordersService.updateOrder(updatedOrder);

      if (
        updatedOrder.transportationMainInfoResponse.status ===
        TransportationStatusEnum.FINISHED
      ) {
        // geolocationService.stopTracking()
        navigation.replace('order-action-success', {
          action: 'complite',
          order_number: updatedOrder.transportationMainInfoResponse.id,
        });
      }
    } catch (error) {
      handleCatchError(error, 'order-screen handleSubmit');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenYandexMaps = () => {
    if (!order) return;

    const points = order.transportationCargoInfoResponse.cargoLoadings;
    const pointA = points[0].point;
    const pointB = points[points.length - 1].point;

    openYandexMaps(pointA, pointB);
  };

  const [loadingSos, setLoadingSos] = useState(false);

  const handleSwipeSos = async () => {
    try {
      setLoadingSos(true);
      await wait(1000);

      const Element = <SosModal />;

      modal().setupModal?.({
        element: Element,
        justifyContent: 'center',
        marginHorizontal: 20,
      });
    } catch (error) {
      handleCatchError(error);
    } finally {
      setLoadingSos(false);
    }
  };

  const orderAtLocation =
    order?.transportationCargoInfoResponse.cargoLoadings.find(
      (el) => el.isDriverAtLocation,
    );
  const renderContent = () => {
    if (!order) return null;

    if (orderAtLocation) {
      return (
        <>
          <Box row gap={8} alignItems="center">
            <Circle />
            <Text
              type="body_500"
              fontSize={18}
              children={t(
                `order_status.${orderAtLocation.loadingType.code.toLowerCase()}`,
              )}
            />
          </Box>
          <Box>
            <Text children={t('loading-address')} />
            <Text
              type="body_500"
              children={`${orderAtLocation.address}, ${dateFormat('DD.MM.yyyy HH:mm', orderAtLocation.loadingDateTime)}`}
            />
          </Box>
          <Box row gap={8}>
            <Box>
              <Text children={t('loading-weight')} />
              <Text
                type="body_500"
                children={`${orderAtLocation.weight} ${orderAtLocation.weightUnit.nameRu}'`}
              />
            </Box>
            <Box>
              <Text children={t('loading-volume')} />
              <Text type="body_500" children={`${orderAtLocation.volume}`} />
            </Box>
          </Box>
          <Box>
            <Text children={t('loading-method')} />
            <Text
              type="body_500"
              children={orderAtLocation.loadingMethod.nameRu}
            />
          </Box>
          <Box row gap={8}>
            <Box flex={1}>
              <Text children={t('contact-person')} />
              <Text type="body_500" children={orderAtLocation.contactName} />
            </Box>
            <Box maxWidth={133}>
              <Text children={t('phone')} />
              <Text type="body_500" children={orderAtLocation.contactNumber} />
            </Box>
            <Button wrapperStyle={{ flex: 0.8 }} children={t('to-ring')} />
          </Box>
        </>
      );
    }
    // const orderIsActive =
    //   order.transportationCargoInfoResponse.cargoLoadings.find(
    //     (el) => el.isActive,
    //   );
    // return (
    //   <Box gap={10}>
    //     <MapWithDistance
    //       route={order.transportationCargoInfoResponse.cargoLoadings}
    //     />
    //     <Box
    //       p={12}
    //       borderWidth={1}
    //       borderRadius={10}
    //       gap={10}
    //       borderColor={colors.disabled}
    //       backgroundColor={colors.main_light}
    //     >
    //       <Text children="Следующая точка вашего маршрута:" fontWeight="500" />
    //       <Text
    //         children={`${orderIsActive?.address}, ${dateFormat('DD.MM.yyyy HH:mm', orderIsActive?.loadingDateTime)} `}
    //       />
    //     </Box>
    //   </Box>
    // );
  };
  if (!order) return null;

  return (
    <>
      <Box p={12} row w="full" justifyContent="space-between">
        <Box row gap={10}>
          <Text children="№" />
          <Text
            children={order.transportationMainInfoResponse.id}
            fontWeight={700}
            color="black"
          />
        </Box>
        <Box>
          <OrderStatusLabel
            status={order.transportationMainInfoResponse.status}
          />
        </Box>
      </Box>
      {!orderAtLocation && (
        <Box gap={10}>
          <MapWithDistance
            zoomGesturesEnabled
            tiltGesturesEnabled
            scrollGesturesEnabled
            route={order.transportationCargoInfoResponse.cargoLoadings}
          />
          <Box
            p={12}
            mx={15}
            borderWidth={1}
            borderRadius={10}
            gap={10}
            borderColor={colors.disabled}
            backgroundColor={colors.main_light}
          >
            <Text
              children="Следующая точка вашего маршрута:"
              fontWeight="500"
            />
            <Text
              children={`${orderIsActive?.address}, ${dateFormat('DD.MM.yyyy HH:mm', orderIsActive?.loadingDateTime)} `}
            />
          </Box>
        </Box>
      )}
      <ScrollView
        contentContainerStyle={{
          gap: 5,
          paddingBottom: insets.bottom || 15,
          paddingTop: 10,
        }}
      >
        <Box p={12} gap={12}>
          {renderContent()}
          <Accordion label={t('cargo-information')} open>
            <Box py={10} gap={10}>
              <Box gap={2}>
                <Text color={colors.textSecondary} children={t('cargo-name')} />
                <Text
                  type="body_500"
                  children={order.transportationMainInfoResponse.cargoName}
                />
              </Box>

              <Box gap={2}>
                <Text color={colors.textSecondary} children={t('cargo-type')} />
                <Text
                  type="body_500"
                  children={
                    order.transportationMainInfoResponse.cargoType.nameRu
                  }
                />
              </Box>

              <Box gap={2}>
                <Text
                  color={colors.textSecondary}
                  children={t('loading-container-type')}
                />
                <Text
                  type="body_500"
                  children={
                    order.transportationMainInfoResponse.tareType.nameRu
                  }
                />
              </Box>

              <Box row gap={16}>
                <Box gap={2}>
                  <Text
                    color={colors.textSecondary}
                    children={t('cargo-weight-brutto')}
                  />
                  <Text
                    type="body_500"
                    children={`${order.transportationMainInfoResponse.cargoWeight} ${order.transportationMainInfoResponse?.cargoWeightUnit?.nameRu}`}
                  />
                </Box>
                <Box gap={2}>
                  <Text
                    color={colors.textSecondary}
                    children={t('cargo-volume-brutto')}
                  />
                  <Text
                    type="body_500"
                    children={order.transportationMainInfoResponse.cargoVolume}
                  />
                </Box>
              </Box>

              <Box gap={2}>
                <Text
                  color={colors.textSecondary}
                  children={t('additional-cargo-info')}
                />
                <Text
                  type="body_500"
                  children={order.transportationMainInfoResponse.additionalInfo}
                />
              </Box>
            </Box>
          </Accordion>

          <Accordion label={t('route')}>
            <TransportationRoute
              transportation_route={
                order.transportationCargoInfoResponse.cargoLoadings
              }
            />
          </Accordion>

          <Accordion label={t('additional-info')}>
            <Box>
              <Text type="body_500" children={t('porter-service')} />
              <Box>
                <Box row>
                  <Text children={t('number-of-people')} />
                  <Text children=": " />
                </Box>
                <Text type="body_500" children={2} />
              </Box>
            </Box>
          </Accordion>
          <Accordion label={t('documents')}>
            <Box row gap={10}>
              <Image source={require('@assets/png/pdf-file.png')} />
              <Box>
                <Text type="body_500" children={t('waybill')} />
                <Text
                  type="body_500"
                  children={t('documents')}
                  fontWeight={400}
                />
              </Box>
            </Box>
          </Accordion>
          <Box py={23} alignItems="center">
            <SwipeButton onSwipe={handleSwipeSos} loading={loadingSos} />
          </Box>
        </Box>
      </ScrollView>
      <Box
        w="full"
        py={12}
        pb={insets.bottom}
        px={16}
        gap={16}
        borderColor={colors.border}
        style={{ borderTopWidth: 1 }}
      >
        <SwipeButton
          onSwipe={handleSubmit}
          loading={loading}
          text={'→'}
          placeholder={btnText}
          activeBtnColor={colors.main}
          backgroundColor={colors.main_light}
        />

        <Button
          backgroundColor="grey"
          children={t('go-to-the-navigator')}
          textColor="dark_grey"
          icon={<RhombusArrowIcon />}
          onPress={handleOpenYandexMaps}
        />
      </Box>
    </>
  );
};
