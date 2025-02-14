import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
} from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import YaMap, {
  CameraPosition,
  Geocoder,
  Marker,
  Point,
} from 'react-native-yamap';
import Filter from '@assets/svg/filter.svg';
import MapPointerIcon from '@assets/svg/map-pointer.svg';

import { mapRoutes } from '@src/mocks/order-details';
import { ScreenProps } from '@src/navigation/types';
import {
  ITransportationOrderData,
  STATE_MOCK,
} from '@src/service/transportation-service';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Text } from '@src/ui';
import { wait } from '@src/utils';
import { handleCatchError } from '@src/utils/handleCatchError';

import { RegionsValue } from '../FromWhereScreen';

import { Order } from './components/Order';

export let setSearchingRegionRef: React.Dispatch<
  React.SetStateAction<{
    point: Point;
    title: string;
    value: RegionsValue;
    zoom: number;
  } | null>
> | null = null;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

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

  const openTransportationDetails = (details: ITransportationOrderData) =>
    navigation.push('transportation-details', details);

  const [searchingRegion, setSearchingRegion] = useState<{
    point: Point;
    title: string;
    value: RegionsValue;
    zoom: number;
  } | null>(null);

  useEffect(() => {
    setSearchingRegionRef = setSearchingRegion;

    return () => {
      setSearchingRegionRef = null;
    };
  }, []);

  const zoomDown = useCallback(async (zoom: number) => {
    const position = await getCurrentPosition();
    await wait(300);

    if (mapRef.current) {
      mapRef.current.setZoom(position.zoom * (zoom / 10), 0.3);
    }
  }, []);

  useEffect(() => {
    if (searchingRegion) {
      onRefresh();
      mapRef.current?.fitMarkers([searchingRegion.point]);
      zoomDown(searchingRegion.zoom);
    }
  }, [searchingRegion, zoomDown]);

  function getCurrentPosition() {
    return new Promise<CameraPosition>((resolve) => {
      if (mapRef.current) {
        mapRef.current.getCameraPosition((position) => {
          resolve(position);
        });
      }
    });
  }

  const mapRef = useRef<YaMap>(null);

  const [markersPints, setMarkersPints] = useState<Point[]>([]);

  const getPoints = async () => {
    await wait(300);
    setMarkersPints([...mapRoutes, { lat: 50.300498, lon: 57.153653 }]);
  };

  useEffect(() => {
    getPoints();
  }, []);

  useEffect(() => {
    if (markersPints.length && mapRef?.current) {
      mapRef.current.fitAllMarkers();
    }
  }, [markersPints]);

  const offset = useRef(new Animated.Value(0)).current;
  const mapHeight = useRef(new Animated.Value(300)).current;

  const currentHeightRef = useRef(300);
  useEffect(() => {
    const id = mapHeight.addListener(({ value }) => {
      currentHeightRef.current = value;
    });
    return () => {
      mapHeight.removeListener(id);
    };
  }, [mapHeight]);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: offset } } }],
    {
      listener: (event) => {
        const y = event.nativeEvent.contentOffset.y;
        const newHeight = Math.max(100, Math.min(300, 300 - y));
        if (Math.abs(currentHeightRef.current - newHeight) > 5) {
          mapHeight.stopAnimation(() => {
            Animated.timing(mapHeight, {
              duration: 35,
              toValue: newHeight, // более быстрая анимация
              useNativeDriver: false,
            }).start();
          });
        }
      },
      useNativeDriver: false,
    },
  );

  const handleMapPress = () => {
    Animated.timing(mapHeight, {
      duration: 300,
      toValue: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleMapLongPress = (point: NativeSyntheticEvent<Point>) =>
    Geocoder.geoToAddress(point.nativeEvent).then(
      (res) => res?.formatted && Alert.alert(res?.formatted),
    );

  return (
    <Box gap={10} pt={15}>
      <Box row justifyContent="space-between" px={15}>
        <Box row alignItems="center" gap={3} onPress={openFromWhere}>
          <MapPointerIcon />
          <Text children={t(searchingRegion?.title || 'whole-kazakstan')} />
        </Box>
        <Box row alignItems="center" gap={3} onPress={openFilters}>
          <Filter />
          <Text children={t('filters')} />
        </Box>
      </Box>
      <Animated.View style={{ height: mapHeight, overflow: 'hidden' }}>
        <YaMap
          ref={mapRef}
          userLocationIconScale={0.2}
          rotateGesturesEnabled={false}
          initialRegion={{
            lat: 51.143964,
            lon: 71.435819,
            zoom: 3,
          }}
          onMapPress={handleMapPress}
          onMapLongPress={handleMapLongPress}
          style={{ height: 300, width: Dimensions.get('screen').width }}
        >
          {markersPints.map((el) => (
            <Marker
              key={el.lat + el.lon}
              point={el}
              source={require('@assets/png/circle-blue.png')}
              scale={2.5}
            />
          ))}
        </YaMap>
      </Animated.View>
      <AnimatedFlatList
        onScroll={onScroll}
        bounces={false}
        overScrollMode="never"
        scrollEventThrottle={16}
        contentContainerStyle={{ gap: 16, paddingBottom: insets.bottom + 30 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={() => (
          <Order
            openTransportationDetails={() =>
              openTransportationDetails(STATE_MOCK)
            }
            company_name="ТОО «FISO»"
            rating="4.9"
            category={[
              'Бытовая техника',
              '15 тонн',
              'Полуприцеп',
              '12.07.2024-30.07.2024',
            ]}
            price="1 000 000 ₸"
            {...STATE_MOCK}
          />
        )}
        data={Array.from({ length: 5 })}
        ListFooterComponent={<Animated.View style={{ height: mapHeight }} />}
      />
    </Box>
  );
};
