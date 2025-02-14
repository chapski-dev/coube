import React, { FC, useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import YaMap, { Marker, Point, Polyline } from 'react-native-yamap';
import Circle from '@assets/svg/circle.svg';
import ThreeDots from '@assets/svg/three-dots.svg';
import { useNavigation } from '@react-navigation/native';

import { mapRoutes } from '@src/mocks/order-details';
import geolocationService from '@src/service/geolocation-service';
import useTransportationStore, {
  ITransportationOrderData,
} from '@src/service/transportation-service';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { OrderStatusEnum } from '@src/types/order';
import { Box, Button, Text } from '@src/ui';
import { wait } from '@src/utils';
import { handleCatchError } from '@src/utils/handleCatchError';
import { extractRouteCoordinates } from '@src/utils/yandex-maps';

import { OrderStatusLabel } from './OrderStatusLabel';

type OrderPropsTypes = ITransportationOrderData;

export const Order: FC<OrderPropsTypes> = (props) => {
  const { order_status, order_number, name_of_cargo, route } = props;

  const navigation = useNavigation();

  const { t } = useLocalization();
  const { colors } = useAppTheme();
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingDecline, setLoadingDecline] = useState(false);

  const mapRef = useRef<YaMap>(null);
  const { setOrderStatus } = useTransportationStore();
  const { navigate } = useNavigation();

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
    try {
      setLoadingAccept(true);
      await geolocationService.startTracking();
      setOrderStatus(OrderStatusEnum.pending);
      await wait(1000);
      navigate('order-accepted');
      setLoadingAccept(false);
    } catch (error) {
      handleCatchError(error);
    }
  };

  const openTransportationDetails = () =>
    navigation.navigate('transportation-details', props);

  const [markersPints, setMarkersPints] = useState<Point[]>([]);

  const getPoints = async () => {
    await wait(300);
    setMarkersPints(mapRoutes);
  };

  useEffect(() => {
    getPoints();
  }, []);

  const [routeCoordinates, setRouteCoordinates] = useState<Point[]>([]);
  const [distance, setDistance] = useState('0');

  useEffect(() => {
    if (markersPints.length && mapRef?.current) {
      mapRef?.current?.fitAllMarkers();
      mapRef?.current?.findDrivingRoutes(markersPints, (routeData) => {
        const result = extractRouteCoordinates(routeData);
        setRouteCoordinates((state) =>
          result ? result.routeCoordinates : state,
        );
        setDistance((state) => (result ? result.routeDistance : state));
      });
    }
  }, [markersPints]);

  return (
    <Box backgroundColor={colors.white} p={15} gap={8} flex={1}>
      <Box row w="full" justifyContent="space-between" alignItems='center'>
        <Box row gap={10} alignItems='center'>
          <Text fontSize={12} color={colors.textSecondary} children="№" />
          <Text color={colors.text} fontWeight="bold" children={order_number} />
        </Box>
        <OrderStatusLabel status={order_status} />
      </Box>

      <Box w="full" alignItems="center" flex={1}>
        <YaMap
          ref={mapRef}
          userLocationIconScale={0.2}
          rotateGesturesEnabled={false}
          zoomGesturesEnabled={false}
          tiltGesturesEnabled={false}
          scrollGesturesEnabled={false}
          initialRegion={{
            lat: 51.143964,
            lon: 71.435819,
            zoom: 3,
          }}
          style={{ height: 182, width: Dimensions.get('screen').width }}
        >
          {route.map((el, i, arr) => (
            <Marker
              key={el.action_address}
              point={el.point}
              source={
                i === 0
                  ? require('@assets/png/circle-red.png')
                  : i === arr.length - 1
                    ? require('@assets/png/circle-gray.png')
                    : require('@assets/png/stop-point.png')
              }
              scale={2}
            />
          ))}
          {routeCoordinates.length > 0 && (
            <Polyline
              points={routeCoordinates}
              strokeColor={colors.green}
              strokeWidth={1}
              zIndex={4}
            />
          )}
        </YaMap>
      </Box>

      <Text color={colors.dark_grey} right>
        <Text children={`${t('distance')}: `} />
        <Text type="body_500" children={`${distance} км.`} />
      </Text>
      <Box gap={4}>
        <Text color={colors.textSecondary} children={t('cargo-name')} />
        <Text type="body_500" children={name_of_cargo} />
      </Box>

      <Box w="full" h={0.5} backgroundColor={colors.disabled} />

      <Box gap={4}>
        <Text color={colors.textSecondary} children={t('route')} />
        <Box gap={8}>
          {route.map((el, i, arr) => {
            const isFirst = i === 0;
            const isLast = i === arr.length - 1;
            if (isFirst) {
              return (
                <Box key={i} row gap={10} alignItems="center">
                  <Circle color="dark_grey" />
                  <Text type="body_500" children={el.action_address} />
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
                  <Text
                    type="body_500"
                    children={route[route.length - 1].action_address}
                  />
                </Box>
              );
            }
          })}
        </Box>
      </Box>

      <Box gap={4}>
        <Text
          color={colors.textSecondary}
          children={t('transportation-time')}
        />
        <Text type="body_500" children="12.07.2024-30.07.2024" />
      </Box>

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
    </Box>
  );
};
