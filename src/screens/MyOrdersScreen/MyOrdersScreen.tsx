import { Box, Text } from "@src/ui";
import { Order } from "./components/Order";
import { useAppTheme } from "@src/theme/theme";
import Search from '@assets/svg/search.svg'
import Arrow from '@assets/svg/arrow-right.svg'
import { ScreenProps } from '@src/navigation/types';
import { useState } from "react"
import {OrderStatusEnum} from './components/OrderStatus'
import { TransportationDetailsParams } from "../TransportationsDetailsScreen/TransportationDetailsScreen";
import { useLocalization } from "@src/translations/i18n";
import { orderDetails } from "@src/mocks/order-details";

export const MyOrdersScreen = ({ navigation }: ScreenProps<'my-orders-screen'>) => {
	const { t } = useLocalization()
	const {colors} = useAppTheme()

	const openSearchForNewOrder = () => {navigation.push('search-for-new-order')}
	const openTransportationDetails = (details: TransportationDetailsParams) => {navigation.push('transportation-details', details)}

	return (
		<Box>

			<Box row w='full' backgroundColor={colors.white}>
				<Box justifyContent="center" py={7} style={{ width: '50%', borderBottomWidth: 5, borderBottomColor: colors.main }} row >
					<Text type="body_500" children={t('active')} />
					<Text type="body_500" children='(1)' />
				</Box>
				<Box justifyContent="center" py={7} style={{ width: '50%' }} row >
					<Text type="body_500" children={t('archived')} />
					<Text type="body_500" children='(1)' />
				</Box>
			</Box>

			<Box row justifyContent="space-between" px={10} py={20} alignItems="center" backgroundColor={colors.white} >
				<Box row gap={10} alignItems="center" >
					<Search />
					<Text type="body_500" children={t('new-orders-search')} />
				</Box>
				<Arrow onPress={openSearchForNewOrder} />
			</Box>

			<Box py={20} >
				<Order
					openTransportationDetails={() => openTransportationDetails(orderDetails)} 
					orderStatus={OrderStatusEnum.new}
					orderNumber='15-020342'
					distance='884 км'
					cargoName='Медицинское оборудование'
					transportationRoute={orderDetails.transportationRoute}
					transportationPeriod='12.07.2024-30.07.2024'
				/>
			</Box>

		</Box>
	)
}