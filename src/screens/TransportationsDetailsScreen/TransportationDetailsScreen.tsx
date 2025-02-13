import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, ScrollView } from 'react-native';
import YaMap, { Marker, Point, Polyline } from 'react-native-yamap';
import Circle from '@assets/svg/circle.svg';

import { mapRoutes } from '@src/mocks/order-details';
import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Text } from '@src/ui';
import { Accordion } from '@src/ui/Accordion';
import { wait } from '@src/utils';
import { extractRouteCoordinates } from '@src/utils/yandex-maps';

import { OrderStatusEnum } from '../MyOrdersScreen/components/OrderStatus';

import { RoutePoint } from './components/RoutePoint';

export type RouteObjectType = {
  placeType: 'load' | 'unload';
  loadingPoint: string;
  dateAndPlaceOfUnloading: string;
  cargoWeight: string;
  cargoVolume: string;
  loadingMethod: string;
};

export type TransportationDetails = {
  orderStatus: OrderStatusEnum;
  cargoName: string;
  cargoType: string;
  tareType: string;
  cargoWeight: string;
  cargoVolume: string;
  additionalCargoInformation: string;
  transportationRoute: RouteObjectType[];
  movingService: string;
  documents: string;
  orderNumber: string;
  transportationPeriod?: string;
};

export const TransportationDetailsScreen = ({
  navigation,
  route,
}: ScreenProps<'transportation-details'>) => {
  const { t } = useLocalization();
  const { colors, insets } = useAppTheme();

  const {
    cargoName,
    cargoType,
    tareType,
    cargoWeight,
    cargoVolume,
    additionalCargoInformation,
    transportationRoute,
    movingService,
    documents,
  } = route.params;

  const openTransportationDetails = () => {
    navigation.push('counter-offer');
  };

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
      <Box alignItems="center" justifyContent="center" pt={10}>
        <YaMap
          ref={mapRef}
          showUserPosition
          userLocationIconScale={0.2}
          rotateGesturesEnabled={false}
          style={{ height: 182, width: Dimensions.get('screen').width }}
        >
          {mapRoutes.map((el, i, arr) => (
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
          paddingBottom: insets.bottom,
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
            <Box>
              <Text children={t('cargo-name')} />
              <Text type="body_500" children={cargoName} />
            </Box>

            <Box>
              <Text children={t('cargo-type')} />
              <Text type="body_500" children={cargoType} />
            </Box>

            <Box>
              <Text children={t('loading-container-type')} />
              <Text type="body_500" children={tareType} />
            </Box>

            <Box>
              <Box>
                <Text children={t('cargo-weight-brutto')} />
                <Text type="body_500" children={cargoWeight} />
              </Box>
              <Box>
                <Text children={t('cargo-volume-brutto')} />
                <Text type="body_500" children={cargoVolume} />
              </Box>
            </Box>

            <Box>
              <Text children={t('additional-cargo-info')} />
              <Text type="body_500" children={additionalCargoInformation} />
            </Box>
          </Box>
        </Accordion>
        <Accordion label={t('route')}>
          <Box>
            {transportationRoute.map((data, index) => {
              const lastElement = transportationRoute.length - 1;
              const isFirstElement = index === 0;
              return (
                <Box row gap={15} key={index}>
                  <Box alignItems="center">
                    {isFirstElement ? (
                      <Circle color="dark_grey" />
                    ) : index === lastElement ? (
                      <Circle color="red" />
                    ) : (
                      <Box
                        w={15}
                        h={15}
                        alignItems="center"
                        justifyContent="center"
                        borderColor={colors.dark_grey}
                        borderWidth={1}
                        borderRadius={5}
                      >
                        <Text fontSize={8} color="black" children={index} />
                      </Box>
                    )}
                    {index !== lastElement && (
                      <Box flex={1} w={1} backgroundColor={colors.dark_grey} />
                    )}
                  </Box>

                  <RoutePoint key={index} {...data} />
                </Box>
              );
            })}
          </Box>
        </Accordion>

        <Accordion label={t('additional-info')}>
          <Box>
            <Text type="body_500" children={t('porter-service')} />
            <Box>
              <Box row>
                <Text children={t('number-of-people')} />
                <Text children=": " />
              </Box>
              <Text type="body_500" children={movingService} />
            </Box>
          </Box>
        </Accordion>

        <Accordion label={t('documents')}>
          <Box row gap={10}>
            <Image source={require('@assets/png/pdf-file.png')} />
            <Box>
              <Text type="body_500" children={t('waybill')} />
              <Text type="body_500" children={documents} fontWeight={400} />
            </Box>
          </Box>
        </Accordion>

        <Box p={10} gap={10}>
          <Button children={t('respond')} />
          <Button
            children={t('make-counteroffer')}
            type="outline"
            borderColor="main"
            textColor="main"
            onPress={openTransportationDetails}
          />
        </Box>
      </ScrollView>
    </>
  );
};
