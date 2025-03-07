import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, Image, ScrollView } from 'react-native';
import YaMap, { Marker, Point, Polyline } from 'react-native-yamap';

import { TransportationRoute } from '@src/components/TransportationRoute';
import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Text } from '@src/ui';
import { Accordion } from '@src/ui/Accordion';
import { wait } from '@src/utils';
import { extractRouteCoordinates } from '@src/utils/yandex-maps';

import { OrderStatusLabel } from '../MyOrdersScreen/components/OrderStatusLabel';

export type RouteObjectType = {
  placeType: 'load' | 'unload';
  cargo_volume_gross: string;
  cargo_weight_gross: string;
  date_and_place_of_operation: string;
  loading_method: string;
  action_address: string;
  point: Point;
};

export const TransportationDetailsScreen = ({
  navigation,
  route,
}: ScreenProps<'transportation-details'>) => {
  const { t } = useLocalization();
  const { colors, insets } = useAppTheme();

  const {
    transportationMainInfoResponse: mainInfo,
    transportationCargoInfoResponse: cargoInfo,
    hasAlreadyApplied,
  } = route.params;

  const makeCounterOffer = () => {
    navigation.push('counter-offer');
  };

  const handleRespond = () =>
    Alert.alert(t('perfectly'), 'Вы отправили запрос на исполнение заказа');

  const mapRef = useRef<YaMap>(null);
  const [markersPoints, setMarkersPoints] = useState<Point[]>([]);
  const [routeCoordinates, setRouteCoordinates] = useState<Point[]>([]);
  const [distance, setDistance] = useState('0');

  const getPoints = useCallback(async () => {
    await wait(50);
    const points = cargoInfo.cargoLoadings.map(loading => ({
      lat: Number(loading.latitude),
      lon: Number(loading.longitude),
    }));
    setMarkersPoints(points);
  }, [cargoInfo.cargoLoadings]);

  useEffect(() => {
    getPoints();
  }, [getPoints]);

  useEffect(() => {
    if (markersPoints.length && mapRef?.current) {
      mapRef.current.fitAllMarkers();
      mapRef.current.findDrivingRoutes(markersPoints, routeData => {
        const result = extractRouteCoordinates(routeData);
        setRouteCoordinates(result ? result.routeCoordinates : []);
        setDistance(result ? result.routeDistance : '0');
      });
    }
  }, [markersPoints]);

  return (
    <>
      <Box alignItems="center" justifyContent="center" pt={10}>
        <Box
          row
          w="full"
          px={10}
          py={12}
          alignItems="center"
          justifyContent="space-between"
        >
          <Text>
            <Text fontSize={12} color={colors.textSecondary} children={'№ '} />
            <Text type="body_500" children={mainInfo.id} />
          </Text>
          <OrderStatusLabel status={mainInfo.status} />
        </Box>
        <YaMap
          ref={mapRef}
          showUserPosition
          userLocationIconScale={0.2}
          rotateGesturesEnabled={false}
          style={{ height: 182, width: Dimensions.get('screen').width }}
        >
          {markersPoints.map((el, i, arr) => (
            <Marker
              key={i}
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
          <Polyline
            points={routeCoordinates}
            strokeColor={colors.green}
            strokeWidth={1}
            zIndex={4}
          />
        </YaMap>
      </Box>
      <ScrollView
        contentContainerStyle={{
          gap: 5,
          paddingBottom: insets.bottom || 15,
          paddingTop: 10,
        }}
      >
        <Box justifyContent="flex-end" row px={20}>
          <Text children={t('distance')} />
          <Text children=": " />
          <Text type="body_500" children={`${distance} км.`} />
        </Box>

        <Accordion label={t('cargo-information')} open>
          <Box py={10} gap={10}>
            <Box gap={2}>
              <Text color={colors.textSecondary} children={t('cargo-name')} />
              <Text type="body_500" children={mainInfo.cargoName} />
            </Box>

            <Box gap={2}>
              <Text color={colors.textSecondary} children={t('cargo-type')} />
              <Text type="body_500" children={mainInfo.cargoType.nameRu} />
            </Box>

            <Box gap={2}>
              <Text
                color={colors.textSecondary}
                children={t('loading-container-type')}
              />
              <Text type="body_500" children={mainInfo.tareType.nameRu} />
            </Box>

            <Box row gap={16}>
              <Box gap={2}>
                <Text
                  color={colors.textSecondary}
                  children={t('cargo-weight-brutto')}
                />
                <Text 
                  type="body_500" 
                  children={`${mainInfo.cargoWeight} ${mainInfo.cargoWeightUnit.toLowerCase()}`} 
                />
              </Box>
              <Box gap={2}>
                <Text
                  color={colors.textSecondary}
                  children={t('cargo-volume-brutto')}
                />
                <Text type="body_500" children={mainInfo.cargoVolume} />
              </Box>
            </Box>

            <Box gap={2}>
              <Text
                color={colors.textSecondary}
                children={t('additional-cargo-info')}
              />
              <Text type="body_500" children={mainInfo.additionalInfo} />
            </Box>
          </Box>
        </Accordion>

        <Accordion label={t('route')}>
          <TransportationRoute cargoLoadings={cargoInfo.cargoLoadings} />
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
              <Text type="body_500" children={t('documents')} fontWeight={400} />
            </Box>
          </Box>
        </Accordion>

        <Box p={10} gap={10}>
          <Button 
            children={t('respond')} 
            onPress={handleRespond} 
            disabled={hasAlreadyApplied}
          />
          <Button
            children={t('make-counteroffer')}
            type="outline"
            borderColor="main"
            textColor="main"
            onPress={makeCounterOffer}
          />
        </Box>
      </ScrollView>
    </>
  );
};