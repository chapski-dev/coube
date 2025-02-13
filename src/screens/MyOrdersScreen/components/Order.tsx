import React, { FC, useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import YaMap, { Marker, Point, Polyline } from 'react-native-yamap';
import Circle from '@assets/svg/circle.svg';
import ThreeDots from '@assets/svg/three-dots.svg';
import { useNavigation } from '@react-navigation/native';

import { mapRoutes } from '@src/mocks/order-details';
import { TransportationDetails } from '@src/screens/TransportationsDetailsScreen';
import geolocationService from '@src/service/geolocation-service';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Text } from '@src/ui';
import { wait } from '@src/utils';
import { handleCatchError } from '@src/utils/handleCatchError';
import { extractRouteCoordinates } from '@src/utils/yandex-maps';

import { OrderStatus } from './OrderStatus';

type OrderPropsTypes = TransportationDetails;

export const Order: FC<OrderPropsTypes> = (props) => {
  const { orderStatus, orderNumber, cargoName, transportationRoute } = props;

  const navigation = useNavigation();

  const { t } = useLocalization();
  const { colors } = useAppTheme();
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingDecline, setLoadingDecline] = useState(false);

  const mapRef = useRef<YaMap>(null);

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
    <Box backgroundColor={colors.white} p={15} gap={7} flex={1}>
      <Box row w="full" justifyContent="space-between">
        <Box row gap={10}>
          <Text children="№" />
          <Text children={orderNumber} fontWeight={700} color="black" />
        </Box>
        <Box>
          <OrderStatus orderStatus={orderStatus} />
        </Box>
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
          {markersPints.map((el, i, arr) => (
            <Marker
              key={el.lat + el.lon}
              point={el}
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

      <Box row w="full" justifyContent="flex-end">
        <Text children={t('distance')} />
        <Text children=": " />
        <Text fontWeight={500} children={`${distance} км.`} />
      </Box>

      <Text children={t('cargo-name')} />
      <Text type="body_500" children={cargoName} />

      <Box w="full" h={0.5} backgroundColor={colors.dark_grey} />

      <Text children={t('route')} />

      <Box row gap={10} alignItems="center">
        <Circle color="dark_grey" />
        <Text type="body_500" children={transportationRoute[0].loadingPoint} />
      </Box>

      <Box row gap={10} alignItems="center">
        <ThreeDots />
        <Box row gap={5}>
          <Text type="body_500" children="Ещё" />
          <Text type="body_500" children={transportationRoute.length - 2} />
        </Box>
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
    </Box>
  );
};
