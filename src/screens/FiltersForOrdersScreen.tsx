import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';

import { ScreenProps } from '@src/navigation/types';
import { useFiltersForOrdersStore } from '@src/service/filters-for-order';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Checkbox,Input, Text } from '@src/ui';
import { wait } from '@src/utils';
import { handleCatchError } from '@src/utils/handleCatchError';

export const FiltersForOrdersScreen = ({
  navigation,
}: ScreenProps<'filters-for-orders'>) => {
  const { t } = useLocalization();
  const { colors, insets } = useAppTheme();

  const filter = useFiltersForOrdersStore();
  const { setFilter, resetFilters } = filter;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await wait(1000);
      navigation.goBack();
    } catch (error) {
      handleCatchError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenResetFiltersAlert = useCallback(() => {
    Alert.alert('Желаете сбросить фильтры?', undefined, [
      {
        onPress: () => null,
        text: 'Отмена',
      },
      {
        onPress: resetFilters,
        style: 'destructive',
        text: 'Сбросить',
      },
    ]);
  },[resetFilters])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Text children="Сбросить" onPress={handleOpenResetFiltersAlert} />
    })
  }, [navigation, handleOpenResetFiltersAlert])
  

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
            selected={filter.bulk_materials}
            onPress={() =>
              setFilter({
                bulk_materials: !filter.bulk_materials,
              })
            }
          />
          <Checkbox
            children={t('ftl-transportations')}
            selected={filter.ftl_transportations}
            onPress={() =>
              setFilter({
                ftl_transportations: !filter.ftl_transportations,
              })
            }
          />
          <Checkbox
            children="Перевозки по городу"
            selected={filter.city_transportations}
            onPress={() =>
              setFilter({
                city_transportations: !filter.city_transportations,
              })
            }
          />
          <Checkbox
            children={t('ltl-transportations')}
            selected={filter.ltl_transportations}
            onPress={() =>
              setFilter({
                ltl_transportations: !filter.ltl_transportations,
              })
            }
          />
        </Box>
      </Box>
  
      <Box gap={10}>
        <Text type="body_500" children={t('transportation-route')} />
        <Box gap={10}>
          <Input
            placeholder={t('from-where')}
            value={filter.route_from}
            onChangeText={(text) => setFilter({ route_from: text })}
          />
          <Input
            placeholder={t('to-where')}
            value={filter.route_to}
            onChangeText={(text) => setFilter({ route_to: text })}
          />
        </Box>
      </Box>
  
      <Box gap={10}>
        <Text type="body_500" children={t('payload-capacity')} />
        <Box gap={10}>
          <Input
            placeholder={t('from-where')}
            value={filter.load_capacity_from}
            onChangeText={(text) => {
              setFilter({
                load_capacity_from: text,
              });
            }}
          />
          <Input
            placeholder={t('to-where')}
            value={filter.load_capacity_to}
            onChangeText={(text) => setFilter({ load_capacity_to: text })}
          />
        </Box>
      </Box>
  
      <Box gap={10}>
        <Text type="body_500" children={t('cargo-type')} />
        <Box gap={10}>
          <Checkbox
            children={t('food-products')}
            selected={filter.food_products}
            onPress={() =>
              setFilter({
                food_products: !filter.food_products,
              })
            }
          />
          <Checkbox
            children={t('building-materials')}
            selected={filter.building_materials}
            onPress={() =>
              setFilter({
                building_materials: !filter.building_materials,
              })
            }
          />
          <Checkbox
            children={t('household-appliances')}
            selected={filter.household_appliances}
            onPress={() =>
              setFilter({
                household_appliances: !filter.household_appliances,
              })
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
            selected={filter.container}
            onPress={() =>
              setFilter({
                container: !filter.container,
              })
            }
          />
          <Checkbox
            children={t('isotherm')}
            selected={filter.isotherm}
            onPress={() =>
              setFilter({
                isotherm: !filter.isotherm,
              })
            }
          />
          <Checkbox
            children={t('refrigerator')}
            selected={filter.refrigerator}
            onPress={() =>
              setFilter({
                refrigerator: !filter.refrigerator,
              })
            }
          />
          <Checkbox
            children={t('tent')}
            selected={filter.tent}
            onPress={() => setFilter({ tent: !filter.tent })}
          />
          <Checkbox
            children={t('industrial')}
            selected={filter.industrial}
            onPress={() =>
              setFilter({
                industrial: !filter.industrial,
              })
            }
          />
          <Checkbox
            children={t('board')}
            selected={filter.board}
            onPress={() => setFilter({ board: !filter.board })}
          />
        </Box>
      </Box>
      <Box gap={10}>
        <Text type="body_500" children={t('cargo-weight')} />
        <Box gap={10}>
          <Input
            placeholder={t('from-where')}
            value={filter.cargo_weight_from}
            onChangeText={(text) => {
              setFilter({ cargo_weight_from: text });
            }}
          />
          <Input
            placeholder={t('to-where')}
            value={filter.cargo_weight_to}
            onChangeText={(text) => {
              setFilter({ cargo_weight_to: text });
            }}
          />
        </Box>
      </Box>
  
      <Box gap={10}>
        <Text type="body_500" children={t('price-of-delivery')} />
        <Box gap={10}>
          <Input
            placeholder={t('from-where')}
            value={filter.delivery_price_from}
            onChangeText={(text) => {
              setFilter({
                delivery_price_from: text,
              });
            }}
          />
          <Input
            placeholder={t('to-where')}
            value={filter.delivery_price_to}
            onChangeText={(text) => {
              setFilter({ delivery_price_to: text });
            }}
          />
        </Box>
      </Box>
  
      <Box gap={10}>
        <Text type="body_500" children={t('loading-method')} />
        <Box gap={10}>
          <Checkbox
            children={t('manual')}
            selected={filter.manual}
            onPress={() => setFilter({ manual: !filter.manual })}
          />
          <Checkbox
            children={t('upper')}
            selected={filter.upper}
            onPress={() => setFilter({ upper: !filter.upper })}
          />
          <Checkbox
            children={t('lateral')}
            selected={filter.lateral}
            onPress={() =>
              setFilter({
                lateral: !filter.lateral,
              })
            }
          />
          <Checkbox
            children={t('rear')}
            selected={filter.rear}
            onPress={() => setFilter({ rear: !filter.rear })}
          />
        </Box>
      </Box>
  
      <Box gap={10}>
        <Text type="body_500" children={t('outside-my-transport')} />
  
        <Box gap={10}>
          <Checkbox
            children={t('fawj7')}
            selected={filter.fawj7}
            onPress={() => setFilter({ fawj7: !filter.fawj7 })}
          />
          <Checkbox
            children={t('sanysyz320')}
            selected={filter.sany_syz_320}
            onPress={() =>
              setFilter({
                sany_syz_320: !filter.sany_syz_320,
              })
            }
          />
          <Checkbox
            children={t('gaz2310sobol')}
            selected={filter.gaz_2310_sobol}
            onPress={() =>
              setFilter({
                gaz_2310_sobol: !filter.gaz_2310_sobol,
              })
            }
          />
        </Box>
      </Box>
  
      <Box />
  
      <Button
        children={t('show')}
        onPress={handleSubmit}
        disabled={loading}
        loading={loading}
      />
    </ScrollView>
  );
};
