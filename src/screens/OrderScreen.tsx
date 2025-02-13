import { ScreenProps } from '@src/navigation/types';
import { Accordion, Box, Button, Text } from '@src/ui';
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

export enum DriverStatusEnum {
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
      case DriverStatusEnum.accepted:
        return t('went-to-load');
      case DriverStatusEnum.went_to_load:
        return t('arrived-for-loading');
      case DriverStatusEnum.arrived_for_loading:
        return t('finish-loading');
      default:
        break;
    }
  }, [route.params?.driver_status]);

  const driverStatusNavigation = () => {
    switch (route.params?.driver_status) {
      case DriverStatusEnum.accepted:
        navigation.navigate('order-screen', {
          driver_status: DriverStatusEnum.went_to_load,
          order_status: OrderStatusEnum.pending,
          headerTitle: `${t('order')} № ${'15-020342'}`,
        });
        break;
      case DriverStatusEnum.went_to_load:
        navigation.navigate('order-screen', {
          driver_status: DriverStatusEnum.arrived_for_loading,
          order_status: OrderStatusEnum.loading,
          headerTitle: `${t('order')} № ${'15-020342'}`,
        });

        break;
      case DriverStatusEnum.arrived_for_loading:
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
          {route.params?.driver_status ===
          DriverStatusEnum.arrived_for_loading ? (
            <>
              <Box row gap={8} alignItems="center">
                <Circle />
                <Text
                  type="body_500"
                  fontSize={18}
                  children={t('order_status.loading')}
                />
              </Box>
              <Box>
                <Text children={t('loading-address')} />
                <Text
                  type="body_500"
                  children={'г. Алматы, ул. Абая 11, Сегодня, 15:40'}
                />
              </Box>
              <Box row gap={8}>
                <Box>
                  <Text children={t('loading-weight')} />
                  <Text type="body_500" children={'15 тонн'} />
                </Box>
                <Box>
                  <Text children={t('loading-volume')} />
                  <Text type="body_500" children={'3000 м3'} />
                </Box>
              </Box>
              <Box>
                <Text children={t('loading-method')} />
                <Text type="body_500" children={'Ручной'} />
              </Box>
              <Box row gap={8}>
                <Box flex={1}>
                  <Text children={t('contact-person')} />
                  <Text type="body_500" children={'Ануар '} />
                </Box>
                <Box maxWidth={133}>
                  <Text children={t('phone')} />
                  <Text type="body_500" children={'+7 777 777 77 77'} />
                </Box>
                <Button
                  wrapperStyle={{
                    flex: 0.8,
                  }}
                  backgroundColor="blue"
                  children={t('to-ring')}
                />
              </Box>
            </>
          ) : (
            <Box alignItems="center">
              <Image
                source={require('@assets/png/map-orders-search-screen.png')}
              />
              <Box row w="full" justifyContent="flex-end">
                <Text children={`${t('distance')}: `} />
                <Text fontWeight={500} children={'844 км'} />
              </Box>
            </Box>
          )}
          {route.params?.driver_status === DriverStatusEnum.went_to_load && (
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
                <Text children={t('loading-address')} />
                <Text
                  type="body_500"
                  children={'г. Алматы, ул. Абая 11, Сегодня, 15:40'}
                />
              </Box>
            </Box>
          )}
          <Accordion
            label={t('cargo-information')}
            children={'Подробная информация о грузе...'}
          />
          <Accordion
            label={t('route')}
            children={'Подробная информация о маршруте...'}
          />
          <Accordion
            label={t('additional-info')}
            children={'Дополнительная информация...'}
          />
          <Accordion label={t('documents')} children={'Список документов...'} />
          {route.params?.driver_status ===
          DriverStatusEnum.arrived_for_loading ? (
            <Button
              backgroundColor="light_red"
              textColor="red"
              children={t('report-carrgo-damage')}
            />
          ) : (
            <Box py={23} alignItems="center">
              <SwipeButton onSwipe={() => null} loading={false} />
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
          children={t('go-to-the-navigator')}
          textColor="dark_grey"
          icon={<RhombusArrowIcon />}
        />
      </Box>
    </Box>
  );
};
