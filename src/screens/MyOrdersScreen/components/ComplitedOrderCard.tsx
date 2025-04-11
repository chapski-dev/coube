import React, { FC, useState } from 'react';
import RightArrowIcon from '@assets/svg/arrow-right.svg';
import { useNavigation } from '@react-navigation/native';

import { getOrderDetailById } from '@src/api';
import { ComplitedOrderDetails, TransportationStatusEnum } from '@src/api/types';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Text } from '@src/ui';
import { handleCatchError } from '@src/utils/handleCatchError';

import { OrderStatusLabel } from './OrderStatusLabel';

type ComplitedOrderCardPropsTypes = ComplitedOrderDetails;

export const ComplitedOrderCard: FC<ComplitedOrderCardPropsTypes> = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const { t } = useLocalization();
  const { colors } = useAppTheme();
  const openTransportationDetails = async () => {
    try {
      setLoading(true);
      const res = await getOrderDetailById(props.id);
      navigation.navigate('transportation-details', res);
    } catch (error) {
      handleCatchError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      backgroundColor={colors.white}
      p={15}
      gap={8}
      flex={1}
      borderColor={colors.border}
      style={{ borderBottomWidth: 1, borderTopWidth: 1 }}
    >
      <Box row w="full" justifyContent="space-between" alignItems="center">
        <Box row gap={10} alignItems="center">
          <Text fontSize={12} color={colors.textSecondary} children="№" />
          <Text color={colors.textDefault} fontWeight="bold" children={props.id} />
        </Box>
        <OrderStatusLabel status={TransportationStatusEnum.FINISHED} />
      </Box>
      <Box gap={4}>
        <Text color={colors.textSecondary} children={t('cargo-name')} />
        <Text type="body_500" children={props.cargoName} />
      </Box>

      <Box w="full" h={0.5} backgroundColor={colors.disabled} />

      <Box gap={4}>
        <Text color={colors.textSecondary} children={t('transportation-time')} />
        <Text type="body_500" children="12.07.2024-30.07.2024" />
      </Box>

      <Button
        children={t('transportation-details')}
        onPress={openTransportationDetails}
        textColor="black"
        backgroundColor="grey"
        disabled={loading}
        loading={loading}
        icon={<RightArrowIcon color={colors.textDefault} />}
      />
    </Box>
  );
};
