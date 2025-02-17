import React from 'react';
import { Image, ScrollView } from 'react-native';

import { TransportationRoute } from '@src/components/TransportationRoute';
import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Text } from '@src/ui';
import { Accordion } from '@src/ui/Accordion';

import { OrderStatusEnum } from '../MyOrdersScreen/components/OrderStatus';

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
  distance: string;
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
    distance,
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

  return (
    <ScrollView
      contentContainerStyle={{ gap: 5, paddingBottom: insets.bottom }}
    >
      <Box alignItems="center" justifyContent="center" pt={10}>
        <Image
          source={require('@assets/png/map-for-transportation-details.png')}
        />
      </Box>

      <Box justifyContent="flex-end" row px={20}>
        <Text children={t('distance')} />
        <Text children=": " />
        <Text type="body_500" children={distance} />
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
        <TransportationRoute transportation_route={transportationRoute} />
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
  );
};
