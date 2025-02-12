import { ScreenProps } from '@src/navigation/types';
import { Box, Button, Text } from '@src/ui';
import React, { useMemo } from 'react';
import {
  OrderStatus,
  OrderStatusEnum,
} from './MyOrdersScreen/components/OrderStatus';
import { useAppTheme } from '@src/theme/theme';
import { Image } from 'react-native';
import { useLocalization } from '@src/translations/i18n';
import SwipeButton from '@src/components/SwipeButton';
import RhombusArrowIcon from '@assets/svg/arrow-in-a-rhombus.svg';
import { ScrollView } from 'react-native-gesture-handler';
import Circle from '@assets/svg/circle.svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { InfoSection } from './MyOrdersScreen/components/InfoSection';

export enum DriverStatue {
  accepted = 'accepted',
  went_to_load = 'went_to_load',
  arrived_for_loading = 'arrived_for_loading',
  finish_loading = 'finish_loading',
  arrived_for_unloading = 'arrived_for_unloading',
  finish_unloading = 'finish_uoloading',
}

export const OrderScreen = ({
  navigation,
  route,
}: ScreenProps<'order-screen'>) => {
  const { colors } = useAppTheme();
  const { t } = useLocalization();

  const squarePosition = useSharedValue(0);

  const btnText = useMemo(() => {
    switch (route.params?.driver_status) {
      case DriverStatue.accepted:
        return 'Отправился на погрузку';
      case DriverStatue.went_to_load:
        return 'Прибыл на погрузку';
      case DriverStatue.arrived_for_loading:
        return 'Завершить погрузку';
      default:
        break;
    }
  }, [route.params?.driver_status]);

  const driverStatusNavigation = () => {
    switch (route.params?.driver_status) {
      case DriverStatue.accepted:
        navigation.navigate('order-screen', {
          driver_status: DriverStatue.went_to_load,
          order_status: OrderStatusEnum.pending,
          headerTitle: 'Заказ № 15-020342',
        });
        break;
      case DriverStatue.went_to_load:
        navigation.navigate('order-screen', {
          driver_status: DriverStatue.arrived_for_loading,
          order_status: OrderStatusEnum.loading,
          headerTitle: 'Заказ № 15-020342',
        });

        break;
      case DriverStatue.arrived_for_loading:
        navigation.navigate('upload-invoise-for-goods');
        break;
      default:
        break;
    }
  };

  const handleNavigatePress = () => {
    squarePosition.value = withTiming(100, { duration: 3000 });
  };

  const animatedSquareStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: squarePosition.value }],
  }));

  return (
    <Box justifyContent="space-between" flex={1}>
      <ScrollView>
        <Box p={12} gap={12}>
          <Box row w="full" justifyContent="space-between">
            <Box row gap={10}>
              <Text children="№" />
              <Text children={'15-020342'} fontWeight={700} color="black" />
            </Box>
            <Box>
              <OrderStatus orderStatus={route.params.order_status} />
            </Box>
          </Box>
          {route.params?.driver_status === DriverStatue.arrived_for_loading ? (
            <>
              <Box row gap={8} alignItems="center">
                <Circle />
                <Text
                  type="body_500"
                  fontSize={18}
                  children={'Погрузка груза..'}
                />
              </Box>
              <Box>
                <Text children={'Адрес погрузки'} />
                <Text
                  type="body_500"
                  children={'г. Алматы, ул. Абая 11, Сегодня, 15:40'}
                />
              </Box>
              <Box row gap={8}>
                <Box>
                  <Text children={'Вес погрузки'} />
                  <Text type="body_500" children={'15 тонн'} />
                </Box>
                <Box>
                  <Text children={'Объем погрузки'} />
                  <Text type="body_500" children={'3000 м3'} />
                </Box>
              </Box>
              <Box>
                <Text children={'Способ погрузки'} />
                <Text type="body_500" children={'Ручной'} />
              </Box>
              <Box row gap={8}>
                <Box>
                  <Text children={'Контактное лицо'} />
                  <Text type="body_500" children={'Ануар'} />
                </Box>
                <Box>
                  <Text children={'Телефон'} />
                  <Text type="body_500" children={'+7 777 777 77 77'} />
                </Box>
                <Box w={'32%'} justifyContent="center" alignItems="center">
                  <Button backgroundColor="blue" children={'Позвонить'} />
                </Box>
              </Box>
            </>
          ) : (
            <Box alignItems="center">
              <Image
                source={require('@assets/png/map-orders-search-screen.png')}
              />
              <Box row w="full" justifyContent="flex-end">
                <Text children={t('distance')} />
                <Text children=": " />
                <Text fontWeight={500} children={'844 км'} />
              </Box>
            </Box>
          )}
          {route.params?.driver_status === DriverStatue.went_to_load && (
            <Box gap={7}>
              <Box w="full" row alignItems="center">
                <Circle />
                <Box w={'90%'} height={8} backgroundColor={colors.disabled} />
                <Circle color={colors.red} />
                <Animated.View
                  style={[
                    {
                      width: 20,
                      height: 20,
                      borderWidth: 1.3,
                      borderRadius: 5,
                      borderColor: colors.dark_grey,
                      backgroundColor: 'white',
                      position: 'absolute',
                      left: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                    animatedSquareStyle,
                  ]}
                >
                  <Text
                    color={colors.dark_grey}
                    fontSize={9}
                    fontWeight={700}
                    children={'1'}
                  />
                </Animated.View>
              </Box>
              <Box>
                <Text children={'Адрес погрузки'} />
                <Text
                  type="body_500"
                  children={'г. Алматы, ул. Абая 11, Сегодня, 15:40'}
                />
              </Box>
            </Box>
          )}
          <InfoSection
            title="Информация о грузе"
            content={<Text children={'Подробная информация о грузе...'} />}
          />
          <InfoSection
            title="Маршрут"
            content={<Text children={'Подробная информация о маршруте...'} />}
          />
          <InfoSection
            title="Дополнительно"
            content={<Text children={'Дополнительная информация...'} />}
          />
          <InfoSection
            title="Документы"
            content={<Text children={'Список документов...'} />}
          />
          {route.params?.driver_status === DriverStatue.arrived_for_loading ? (
            <Button
              backgroundColor="light_red"
              textColor="red"
              children={'Сообщить о повреждении груза'}
            />
          ) : (
            <Box py={23} alignItems="center">
              <SwipeButton />
            </Box>
          )}
        </Box>
      </ScrollView>
      <Box
        w="full"
        py={12}
        px={16}
        gap={16}
        borderColor={colors.border}
        style={{ borderTopWidth: 1 }}
      >
        <Button children={btnText} onPress={driverStatusNavigation} />
        <Button
          backgroundColor="grey"
          children={'Перейти в навигатор'}
          textColor="dark_grey"
          icon={<RhombusArrowIcon />}
        />
      </Box>
    </Box>
  );
};
