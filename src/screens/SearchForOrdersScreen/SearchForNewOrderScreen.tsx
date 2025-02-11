import React, { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import Filter from '@assets/svg/filter.svg';
import MapPointer from '@assets/svg/map-pointer.svg';

import { orderDetails } from '@src/mocks/order-details';
import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Text } from '@src/ui';
import { wait } from '@src/utils';
import { handleCatchError } from '@src/utils/handleCatchError';

import { RegionsValue } from '../FromWhereScreen';
import { TransportationDetails } from '../TransportationsDetailsScreen';

import { Order } from './components/Order';

export let setSearchingRegionRef: React.Dispatch<
  React.SetStateAction<RegionsValue>
> | null = null;

export const SearchForNewOrder = ({
  navigation,
}: ScreenProps<'search-for-new-order'>) => {
  const { t } = useLocalization();

  const { insets } = useAppTheme();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await wait(1000);
    } catch (e) {
      handleCatchError(e);
    } finally {
      setRefreshing(false);
    }
  };

  const openFilters = () => navigation.push('filters-for-orders');
  const openFromWhere = () => navigation.push('from-where');

  const openTransportationDetails = (details: TransportationDetails) =>
    navigation.push('transportation-details', details);

  const [searchingRegion, setSearchingRegion] = useState(
    RegionsValue.wholeKazakstan,
  );

  useEffect(() => {
    setSearchingRegionRef = setSearchingRegion;

    return () => {
      setSearchingRegionRef = null;
    };
  }, []);

  useEffect(() => {
    onRefresh();
  }, [searchingRegion]);

  return (
    <Box gap={10}>
      <Box row justifyContent="space-between" pt={15} px={15}>
        <Box row alignItems="center" gap={3} onPress={openFromWhere}>
          <MapPointer />
          <Text children={t(searchingRegion)} />
        </Box>
        <Box row alignItems="center" gap={3} onPress={openFilters}>
          <Filter />
          <Text children={t('filters')} />
        </Box>
      </Box>
      <FlatList
        ListHeaderComponent={
          <Box alignItems="center">
            <Image
              source={require('@assets/png/map-for-new-order-search.png')}
            />
          </Box>
        }
        contentContainerStyle={{ gap: 16, paddingBottom: insets.bottom + 30 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={() => (
          <Order
            openTransportationDetails={() =>
              openTransportationDetails(orderDetails)
            }
            companyName="ТОО «FISO»"
            rating="4.9"
            cargoName="Медицинское оборудование"
            category={[
              'Бытовая техника',
              '15 тонн',
              'Полуприцеп',
              '12.07.2024-30.07.2024',
            ]}
            transportationRoute={orderDetails.transportationRoute}
            cargoWeight="1 000 000 T"
          />
        )}
        data={Array.from({ length: 5 })}
      />
    </Box>
  );
};
