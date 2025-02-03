import { FC } from 'react';

import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Text } from '@src/ui';

interface PropsType {
	orderStatus: OrderStatusEnum
}

export enum OrderStatusEnum {
	new = 'new',
	pending = 'pending',
	loading = 'loading',
	processing = 'processing',
	unloading = 'unloading'
}

export const OrderStatus: FC<PropsType> = ({ orderStatus }) => {
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
		<Box backgroundColor={colorStatus[orderStatus]} p={3} borderRadius={8} >
			<Text color="white" children={t(statusToLocalizationKey[orderStatus])} />
		</Box>
	);
};