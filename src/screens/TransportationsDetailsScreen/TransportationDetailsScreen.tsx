import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, Image, ScrollView } from 'react-native';
import YaMap, { Marker, Point, Polyline } from 'react-native-yamap';
import Circle from '@assets/svg/circle.svg';

import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Text } from '@src/ui';
import { Accordion } from '@src/ui/Accordion';
import { wait } from '@src/utils';
import { extractRouteCoordinates } from '@src/utils/yandex-maps';

import { OrderStatusLabel } from '../MyOrdersScreen/components/OrderStatusLabel';

import { RoutePoint } from './components/RoutePoint';

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
    order_number,
    order_status,
    name_of_cargo,
    type_of_cargo,
    type_of_loading_container,
    cargo_weight_gross,
    cargo_volume_gross,
    additional_cargo_information,
    documents,
  } = route.params;

  const makeCounterOffe = () => {
    navigation.push('counter-offer');
  };

  const handleRespond = () =>
    Alert.alert('Отлично!', 'Вы отправили запрос на исполнение заказа');

  const mapRef = useRef<YaMap>(null);

  const [markersPints, setMarkersPints] = useState<Point[]>([]);

  const getPoints = useCallback(async () => {
    await wait(50);
    setMarkersPints(route.params.route.map((el) => el.point));
  }, [route.params.route]);

  useEffect(() => {
    getPoints();
  }, [getPoints]);

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
            <Text type="body_500" children={order_number} />
          </Text>
          <OrderStatusLabel status={order_status} />
        </Box>
        <YaMap
          ref={mapRef}
          showUserPosition
          userLocationIconScale={0.2}
          rotateGesturesEnabled={false}
          style={{ height: 182, width: Dimensions.get('screen').width }}
        >
          {markersPints.map((el, i, arr) => (
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
            <Box gap={2}>
              <Text color={colors.textSecondary} children={t('cargo-name')} />
              <Text type="body_500" children={name_of_cargo} />
            </Box>

            <Box gap={2}>
              <Text color={colors.textSecondary} children={t('cargo-type')} />
              <Text type="body_500" children={type_of_cargo} />
            </Box>

            <Box gap={2}>
              <Text
                color={colors.textSecondary}
                children={t('loading-container-type')}
              />
              <Text type="body_500" children={type_of_loading_container} />
            </Box>

            <Box row gap={16}>
              <Box gap={2}>
                <Text
                  color={colors.textSecondary}
                  children={t('cargo-weight-brutto')}
                />
                <Text type="body_500" children={cargo_weight_gross} />
              </Box>
              <Box gap={2}>
                <Text
                  color={colors.textSecondary}
                  children={t('cargo-volume-brutto')}
                />
                <Text type="body_500" children={cargo_volume_gross} />
              </Box>
            </Box>

            <Box gap={2}>
              <Text
                color={colors.textSecondary}
                children={t('additional-cargo-info')}
              />
              <Text type="body_500" children={additional_cargo_information} />
            </Box>
          </Box>
        </Accordion>
        <Accordion label={t('route')}>
          <Box>
            {route.params.route.map((data, index, arr) => {
              const lastElement = arr.length - 1;
              const isFirstElement = index === 0;
              return (
                <Box row gap={15} key={index}>
                  <Box alignItems="center">
                    {isFirstElement ? (
                      <Circle color={colors.dark_grey} />
                    ) : index === lastElement ? (
                      <Circle color={colors.red} />
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
              <Text type="body_500" children={2} />
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
          <Button children={t('respond')} onPress={handleRespond} />
          <Button
            children={t('make-counteroffer')}
            type="outline"
            borderColor="main"
            textColor="main"
            onPress={makeCounterOffe}
          />
        </Box>
      </ScrollView>
    </>
  );
};
