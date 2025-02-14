import React, { FC } from 'react';

import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { OrderStatusEnum } from '@src/types/order';
import { Box, Text } from '@src/ui';

interface PropsType {
	status: OrderStatusEnum
}

export const OrderStatusLabel: FC<PropsType> = ({ status }) => {
	const {colors} = useAppTheme()
	const { t } = useLocalization()

	const colorStatus: Record<OrderStatusEnum, string> = {
		[OrderStatusEnum.new]: colors.green,
		[OrderStatusEnum.pending]: colors.main,
		[OrderStatusEnum.loading]: colors.main,
		[OrderStatusEnum.processing]: colors.blue,
		[OrderStatusEnum.unloading]: colors.main,
	}

	const statusToLocalizationKey: Record<OrderStatusEnum, string> = {
		[OrderStatusEnum.new]: 'order_status.new',
		[OrderStatusEnum.pending]: 'order_status.pending',
		[OrderStatusEnum.loading]: 'order_status.loading',
		[OrderStatusEnum.processing]: 'order_status.processing',
		[OrderStatusEnum.unloading]: 'order_status.unloading',
	}

	return (
		<Box backgroundColor={colorStatus[status]} py={4} px={8} borderRadius={8} >
			<Text color="white" children={t(statusToLocalizationKey[status])} />
		</Box>
	);
};