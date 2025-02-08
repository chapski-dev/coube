import { ScreenProps } from '@src/navigation/types';
import { Box, Button, Text } from '@src/ui';
import React, { useState } from 'react';
import { OrderStatus, OrderStatusEnum } from './components/OrderStatus';
import { useAppTheme } from '@src/theme/theme';
import { Image } from 'react-native';
import { useLocalization } from '@src/translations/i18n';
import SwipeButton from '@src/components/SwipeButton';
import RhombusArrowIcon from '@assets/svg/arrow-in-a-rhombus.svg';
import DownArrowIcon from '@assets/svg/down-arrow.svg';
import { ScrollView } from 'react-native-gesture-handler';
import Circle from '@assets/svg/circle.svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const StartOfExecutionScreen = ({
  navigation,
}: ScreenProps<'start-of-execution'>) => {
  const { colors } = useAppTheme();
  const { t } = useLocalization();

  const [isCargoInfoVisible, setCargoInfoVisible] = useState(false);
  const [isRouteVisible, setRouteVisible] = useState(false);
  const [isAdditionalVisible, setAdditionalVisible] = useState(false);
  const [isDocumentsVisible, setDocumentsVisible] = useState(false);
  const [isRouteLineVisible, setRouteLineVisible] = useState(false);
  const [buttonText, setButtonText] = useState('Отправился на погрузку');
  const [isMapVisible, setIsMapVisible] = useState(true);
  const [isSosVisible, setIsSosVisible] = useState(true);

  const squarePosition = useSharedValue(0);

  const toggleCargoInfo = () => setCargoInfoVisible(!isCargoInfoVisible);
  const toggleRoute = () => setRouteVisible(!isRouteVisible);
  const toggleAdditional = () => setAdditionalVisible(!isAdditionalVisible);
  const toggleDocuments = () => setDocumentsVisible(!isDocumentsVisible);

  const handleRouteButtonPress = () => {
    if (buttonText === 'Отправился на погрузку') {
      setRouteLineVisible(true);
      setButtonText('Прибыл на погрузку');
    } else if (buttonText === 'Прибыл на погрузку') {
      setButtonText('Завершить погрузку');
      setRouteLineVisible(false);
      setIsMapVisible(false);
      setIsSosVisible(false);
    } else if (buttonText === 'Завершить погрузку') {
      navigation.navigate('upload-invoise-for-goods');
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
              <OrderStatus orderStatus={OrderStatusEnum.pending} />
            </Box>
          </Box>
          {isMapVisible ? (
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
          ) : (
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
          )}
          {isRouteLineVisible && (
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
          <Box gap={5}>
            <Box
              py={12}
              row
              alignItems="center"
              justifyContent="space-between"
              onPress={toggleCargoInfo}
            >
              <Text type="body_500" children={'Информация о грузе'} />
              <DownArrowIcon />
            </Box>
            {isCargoInfoVisible && (
              <Box>
                <Text>Подробная информация о грузе...</Text>
              </Box>
            )}
            <Box
              py={12}
              row
              alignItems="center"
              justifyContent="space-between"
              onPress={toggleRoute}
            >
              <Text type="body_500" children={'Маршрут'} />
              <DownArrowIcon />
            </Box>
            {isRouteVisible && (
              <Box>
                <Text>Подробная информация о маршруте...</Text>
              </Box>
            )}
            <Box
              py={12}
              row
              alignItems="center"
              justifyContent="space-between"
              onPress={toggleAdditional}
            >
              <Text type="body_500" children={'Дополнительно'} />
              <DownArrowIcon />
            </Box>
            {isAdditionalVisible && (
              <Box>
                <Text>Дополнительная информация...</Text>
              </Box>
            )}
            <Box
              py={12}
              row
              alignItems="center"
              justifyContent="space-between"
              onPress={toggleDocuments}
            >
              <Text type="body_500" children={'Документы'} />
              <DownArrowIcon />
            </Box>
            {isDocumentsVisible && (
              <Box>
                <Text>Список документов...</Text>
              </Box>
            )}
          </Box>
          {isSosVisible ? (
            <Box py={23} alignItems="center">
              <SwipeButton />
            </Box>
          ) : (
            <Box
              borderRadius={10}
              style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)' }}
            >
              <Button
                backgroundColor="transparent"
                textColor="red"
                children={'Сообщить о повреждении груза'}
              />
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
        <Button children={buttonText} onPress={handleRouteButtonPress} />
        <Button backgroundColor="grey">
          <Box alignItems="center" justifyContent="center" row gap={10}>
            <Text type="body_500" children="Перейти в навигатор" />
            <RhombusArrowIcon />
          </Box>
        </Button>
      </Box>
    </Box>
  );
};
