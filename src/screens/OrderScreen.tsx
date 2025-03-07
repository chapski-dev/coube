import React, { useMemo, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import RhombusArrowIcon from '@assets/svg/arrow-in-a-rhombus.svg';
import Circle from '@assets/svg/circle.svg';

import { startDriverOrder } from '@src/api';
import MapWithDistance from '@src/components/MapWithDistance';
import SosModal from '@src/components/SosModal';
import SwipeButton from '@src/components/SwipeButton';
import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { DriverStatusEnum, OrderStatusEnum } from '@src/types/order';
import { Accordion, Box, Button, Text } from '@src/ui';
import { modal } from '@src/ui/Layouts/ModalLayout';
import { wait } from '@src/utils';
import { handleCatchError } from '@src/utils/handleCatchError';
import { openYandexMaps } from '@src/utils/yandex-maps';

import { OrderStatusLabel } from './MyOrdersScreen/components/OrderStatusLabel';

export const OrderScreen = ({ navigation, route }: ScreenProps<'order-screen'>) => {
  const { colors, insets } = useAppTheme();
  const { t } = useLocalization();

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
  }, [route.params?.driver_status, t]);

  const handleSubmit = async () => {
    try {
      switch (route.params?.driver_status) {
        case DriverStatusEnum.accepted:
          await startDriverOrder(route.params.transportationMainInfoResponse.id);

          navigation.navigate('order-screen', {
            ...route.params,
            driver_status: DriverStatusEnum.went_to_load,
            order_status: OrderStatusEnum.pending
          });
          break;
        case DriverStatusEnum.went_to_load:
          navigation.navigate('order-screen', {
            ...route.params,
            driver_status: DriverStatusEnum.arrived_for_loading,
            order_status: OrderStatusEnum.loading
          });

          break;
        case DriverStatusEnum.arrived_for_loading:
          navigation.navigate('upload-invoise-for-goods');
          break;
        default:
          break;
      }
    } catch (error) {
      handleCatchError(error, 'order-screen handleSubmit');
    }
  };

  const handleOpenYandexMaps = () => {
    const pointA = route.params.transportationCargoInfoResponse.cargoLoadings[0].point;
    const pointB =
      route.params.transportationCargoInfoResponse.cargoLoadings[
        route.params.transportationCargoInfoResponse.cargoLoadings.length - 1
      ].point;

    openYandexMaps(pointA, pointB);
  };

  const [loadingSos, setLoadingSos] = useState(false);
  const handleSwipeSos = async () => {
    try {
      setLoadingSos(true);
      await wait(1000);

      const Element = <SosModal />;

      modal().setupModal?.({
        element: Element,
        justifyContent: 'center',
        marginHorizontal: 20
      });
    } catch (error) {
      handleCatchError(error);
    } finally {
      setLoadingSos(false);
    }
  };

  const renderContent = () => {
    if (route.params?.driver_status === DriverStatusEnum.arrived_for_loading) {
      return (
        <>
          <Box row gap={8} alignItems="center">
            <Circle />
            <Text type="body_500" fontSize={18} children={t('order_status.loading')} />
          </Box>
          <Box>
            <Text children={t('loading-address')} />
            <Text type="body_500" children={'г. Алматы, ул. Абая 11, Сегодня, 15:40'} />
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
            <Button wrapperStyle={{ flex: 0.8 }} backgroundColor="blue" children={t('to-ring')} />
          </Box>
        </>
      );
    }

    return <MapWithDistance route={route.params.transportationCargoInfoResponse.cargoLoadings} />;
  };

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
              <OrderStatusLabel status={route.params.transportationMainInfoResponse.status} />
            </Box>
          </Box>
          {renderContent()}
          <Accordion label={t('cargo-information')} children={'Подробная информация о грузе...'} />
          <Accordion label={t('route')} children={'Подробная информация о маршруте...'} />
          <Accordion label={t('additional-info')} children={'Дополнительная информация...'} />
          <Accordion label={t('documents')} children={'Список документов...'} />
          {route.params?.driver_status === DriverStatusEnum.arrived_for_loading ? (
            <Button
              backgroundColor="light_red"
              textColor="red"
              children={t('report-carrgo-damage')}
              onPress={() => navigation.navigate('damage-to-cargo')}
            />
          ) : (
            <Box py={23} alignItems="center">
              <SwipeButton onSwipe={handleSwipeSos} loading={loadingSos} />
            </Box>
          )}
        </Box>
      </ScrollView>
      <Box
        w="full"
        py={12}
        pb={insets.bottom}
        px={16}
        gap={16}
        borderColor={colors.border}
        style={{ borderTopWidth: 1 }}
      >
        <Button children={btnText} onPress={handleSubmit} />
        <Button
          backgroundColor="grey"
          children={t('go-to-the-navigator')}
          textColor="dark_grey"
          icon={<RhombusArrowIcon />}
          onPress={handleOpenYandexMaps}
        />
      </Box>
    </Box>
  );
};
