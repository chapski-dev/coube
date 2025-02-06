import { useState } from 'react';
import { ScrollView } from 'react-native';

import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Input, Text } from '@src/ui';
import Checkbox from '@src/ui/Checkbox';

const initialFiltersState = {
  FAWJ7: false,
  FTLTransportations: false,
  Gaz2310Sobol: false,
  LTLTransportations: false,
  SanySYZ320: false,
  board: false,
  buildingMaterials: false,
  bulkMaterials: false,
  cargoWeightFrom: '',
  cargoWeightTo: '',
  cityTransportations: false,
  container: false,
  deliveryPriceFrom: '',
  deliveryPriceTo: '',
  foodProducts: false,
  householdAppliances: false,
  industrial: false,
  isotherm: false,
  lateral: false,
  loadCapacityFrom: '',
  loadCapacityTo: '',
  manual: false,
  rear: false,
  refrigerator: false,
  routeFrom: '',
  routeTo: '',
  tent: false,
  upper: false,
};

export const FiltersForOrdersScreen = ({
  navigation,
}: ScreenProps<'filters-for-orders'>) => {
  const { t } = useLocalization();
  const { colors, insets } = useAppTheme();

  const [statesObject, setStatesObject] = useState(initialFiltersState);

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 15,
        padding: 15,
        paddingBottom: insets.bottom,
      }}
    >
      <Box gap={10}>
        <Text type="body_500" children={t('type-of-transportation')} />
        <Box gap={10}>
          <Checkbox
            children={t('bulk-materials')}
            selected={statesObject.bulkMaterials}
            onPress={() =>
              setStatesObject((state) => ({
                ...state,
                bulkMaterials: !state.bulkMaterials,
              }))
            }
          />
          <Checkbox
            children={t('ftl-transportations')}
            selected={statesObject.FTLTransportations}
            onPress={() =>
              setStatesObject((state) => ({
                ...state,
                FTLTransportations: !state.FTLTransportations,
              }))
            }
          />
          <Checkbox
            children="БоковПеревозки по городу"
            selected={statesObject.cityTransportations}
            onPress={() =>
              setStatesObject((state) => ({
                ...state,
                cityTransportations: !state.cityTransportations,
              }))
            }
          />
          <Checkbox
            children={t('ltl-transportations')}
            selected={statesObject.LTLTransportations}
            onPress={() =>
              setStatesObject((state) => ({
                ...state,
                LTLTransportations: !state.LTLTransportations,
              }))
            }
          />
        </Box>
      </Box>

      <Box gap={10}>
        <Text type="body_500" children={t('transportation-route')} />
        <Box gap={10}>
          <Input
            placeholder={t('from-where')}
            value={statesObject.routeFrom}
            onChangeText={(text) => {
              setStatesObject((state) => ({ ...state, routeFrom: text }));
            }}
          />
          <Input
            placeholder={t('to-where')}
            value={statesObject.routeTo}
            onChangeText={(text) => {
              setStatesObject((state) => ({ ...state, routeTo: text }));
            }}
          />
        </Box>
      </Box>

      <Box gap={10}>
        <Text type="body_500" children={t('payload-capacity')} />
        <Box gap={10}>
          <Input
            placeholder={t('from-where')}
            value={statesObject.loadCapacityFrom}
            onChangeText={(text) => {
              setStatesObject((state) => ({
                ...state,
                loadCapacityFrom: text,
              }));
            }}
          />
          <Input
            placeholder={t('to-where')}
            value={statesObject.loadCapacityTo}
            onChangeText={(text) => {
              setStatesObject((state) => ({ ...state, loadCapacityTo: text }));
            }}
          />
        </Box>
      </Box>

      <Box gap={10}>
        <Text type="body_500" children={t('cargo-type')} />
        <Box gap={10}>
          <Checkbox
            children={t('food-products')}
            selected={statesObject.foodProducts}
            onPress={() =>
              setStatesObject((state) => ({
                ...state,
                foodProducts: !state.foodProducts,
              }))
            }
          />
          <Checkbox
            children={t('building-materials')}
            selected={statesObject.buildingMaterials}
            onPress={() =>
              setStatesObject((state) => ({
                ...state,
                buildingMaterials: !state.buildingMaterials,
              }))
            }
          />
          <Checkbox
            children={t('household-appliances')}
            selected={statesObject.householdAppliances}
            onPress={() =>
              setStatesObject((state) => ({
                ...state,
                householdAppliances: !state.householdAppliances,
              }))
            }
          />
          <Text type="body_500" color={colors.main} children={t('load-more')} />
        </Box>
      </Box>

      <Box gap={10}>
        <Text type="body_500" children={t('vehicle-body-type')} pt={20} />
        <Box gap={10}>
          <Checkbox
            children={t('container')}
            selected={statesObject.container}
            onPress={() =>
              setStatesObject((state) => ({
                ...state,
                container: !state.container,
              }))
            }
          />
          <Checkbox
            children={t('isotherm')}
            selected={statesObject.isotherm}
            onPress={() =>
              setStatesObject((state) => ({
                ...state,
                isotherm: !state.isotherm,
              }))
            }
          />
          <Checkbox
            children={t('refrigerator')}
            selected={statesObject.refrigerator}
            onPress={() =>
              setStatesObject((state) => ({
                ...state,
                refrigerator: !state.refrigerator,
              }))
            }
          />
          <Checkbox
            children={t('tent')}
            selected={statesObject.tent}
            onPress={() =>
              setStatesObject((state) => ({ ...state, tent: !state.tent }))
            }
          />
          <Checkbox
            children={t('industrial')}
            selected={statesObject.industrial}
            onPress={() =>
              setStatesObject((state) => ({
                ...state,
                industrial: !state.industrial,
              }))
            }
          />
          <Checkbox
            children={t('board')}
            selected={statesObject.board}
            onPress={() =>
              setStatesObject((state) => ({ ...state, board: !state.board }))
            }
          />
        </Box>
      </Box>
      <Box gap={10}>
        <Text type="body_500" children={t('cargo-weight')} />
        <Box gap={10}>
          <Input
            placeholder={t('from-where')}
            value={statesObject.cargoWeightFrom}
            onChangeText={(text) => {
              setStatesObject((state) => ({ ...state, cargoWeightFrom: text }));
            }}
          />
          <Input
            placeholder={t('to-where')}
            value={statesObject.cargoWeightTo}
            onChangeText={(text) => {
              setStatesObject((state) => ({ ...state, cargoWeightTo: text }));
            }}
          />
        </Box>
      </Box>

      <Box gap={10}>
        <Text type="body_500" children={t('price-of-delivery')} />
        <Box gap={10}>
          <Input
            placeholder={t('from-where')}
            value={statesObject.deliveryPriceFrom}
            onChangeText={(text) => {
              setStatesObject((state) => ({
                ...state,
                deliveryPriceFrom: text,
              }));
            }}
          />
          <Input
            placeholder={t('to-where')}
            value={statesObject.deliveryPriceTo}
            onChangeText={(text) => {
              setStatesObject((state) => ({ ...state, deliveryPriceTo: text }));
            }}
          />
        </Box>
      </Box>

      <Box gap={10}>
        <Text type="body_500" children={t('loading-method')} />
        <Box gap={10}>
          <Checkbox
            children={t('manual')}
            selected={statesObject.manual}
            onPress={() =>
              setStatesObject((state) => ({ ...state, manual: !state.manual }))
            }
          />
          <Checkbox
            children={t('upper')}
            selected={statesObject.upper}
            onPress={() =>
              setStatesObject((state) => ({ ...state, upper: !state.upper }))
            }
          />
          <Checkbox
            children={t('lateral')}
            selected={statesObject.lateral}
            onPress={() =>
              setStatesObject((state) => ({
                ...state,
                lateral: !state.lateral,
              }))
            }
          />
          <Checkbox
            children={t('rear')}
            selected={statesObject.rear}
            onPress={() =>
              setStatesObject((state) => ({ ...state, rear: !state.rear }))
            }
          />
        </Box>
      </Box>

      <Box gap={10}>
        <Text type="body_500" children={t('outside-my-transport')} />

        <Box gap={10}>
          <Checkbox
            children={t('fawj7')}
            selected={statesObject.FAWJ7}
            onPress={() =>
              setStatesObject((state) => ({ ...state, FAWJ7: !state.FAWJ7 }))
            }
          />
          <Checkbox
            children={t('sanysyz320')}
            selected={statesObject.SanySYZ320}
            onPress={() =>
              setStatesObject((state) => ({
                ...state,
                SanySYZ320: !state.SanySYZ320,
              }))
            }
          />
          <Checkbox
            children={t('gaz2310sobol')}
            selected={statesObject.Gaz2310Sobol}
            onPress={() =>
              setStatesObject((state) => ({
                ...state,
                Gaz2310Sobol: !state.Gaz2310Sobol,
              }))
            }
          />
        </Box>
      </Box>

      <Box />

      <Button children={t('show')} />
    </ScrollView>
  );
};
