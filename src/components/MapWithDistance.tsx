import React, { useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import YaMap, { Marker,Point, Polyline } from 'react-native-yamap';

import { CargoLoadings } from '@src/api/types';
import { mapRoutes } from '@src/mocks/order-details';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Text } from '@src/ui';
import { wait } from '@src/utils';
import { extractRouteCoordinates } from '@src/utils/yandex-maps';

const MapWithDistance = ({ route }: { route: CargoLoadings[] }) => {
  const { t } = useLocalization();
  const { colors } = useAppTheme();
  const mapRef = useRef<YaMap>(null);

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
    <>
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
              key={el.id}
              point={{
                lat: Number(el.latitude),
                lon: Number(el.longitude)
              }}
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
    </>
  );
};

export default MapWithDistance;
