import { Box, Text } from "@src/ui";
import { Order } from "./components/Order";
import { useAppTheme } from "@src/theme/theme";
import Magnifier from '@assets/svg/magnifier.svg'
import Arrow from '@assets/svg/arrow-right.svg'
import { ScreenProps } from '@src/navigation/types';
import { useState } from "react"
import {OrderStatusEnum} from './components/OrderStatus'
import { TransportationDetailsParams } from "../TransportationsDetailsScreen/TransportationDetailsScreen";
import { useLocalization } from "@src/translations/i18n";

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
				<Box row gap={10} >
					<Magnifier />
					<Text type="body_500" children={t('new-orders-search')} />
				</Box>
				<Arrow onPress={openSearchForNewOrder} />
			</Box>

			<Box py={20} >
				<Order
					openTransportationDetails={() => openTransportationDetails({
						distance: '228 км', 
						cargoName: 'Медицинское оборудование',
						cargoType: 'Деревянный короб',
						tareType: 'Продукты питания',
						cargoWeight: '15 tonn',
						cargoVolume: '3000 м3',
						additionalCargoInformation: 'Транспортные средства, используемые для перевозки продуктов',
						routeInfromation: [
							{
								placeType: 'load',
								loadingPoint: 'г. Алматы, улица Желтоксан, 12А',
								dateAndPlaceOfUnloading: '18.07.2024, 15:40',
								cargoWeight: '10 тонн',
								cargoVolume: '2000 м3',
								loadingMethod: 'Ручной'
							},
							{
								placeType: 'unload',
								loadingPoint: 'г. Астана, улица Пушкина, 10',
								dateAndPlaceOfUnloading: '20.07.2024, 15:40',
								cargoWeight: '5 тонн',
								cargoVolume: '500 м3',
								loadingMethod: 'Ручной'
							},
							{
								placeType: 'unload',
								loadingPoint: 'г. Москва, улица Ленина, 10',
								dateAndPlaceOfUnloading: '25.07.2024, 15:40',
								cargoWeight: '2 тонн',
								cargoVolume: '300 м3',
								loadingMethod: 'Ручной'
							},
							{
								placeType: 'unload',
								loadingPoint: 'г. Минск, улица Ленина, 10',
								dateAndPlaceOfUnloading: '27.07.2024, 15:40',
								cargoWeight: '3 тонн',
								cargoVolume: '400 м3',
								loadingMethod: 'Ручной'
							}
						],
						movingService: '2',
						documents: '№2233411-Артем.pdf'
					})} 
					orderStatus={OrderStatusEnum.new}
					orderNumber='15-020342'
					distance='884 км'
					cargoName='Медицинское оборудование'
					routeInfromation={[
						{
							placeType: 'load',
							loadingPoint: 'г. Алматы, улица Желтоксан, 12А',
							dateAndPlaceOfUnloading: '18.07.2024, 15:40',
							cargoWeight: '10 тонн',
							cargoVolume: '2000 м3',
							loadingMethod: 'Ручной'
						},
						{
							placeType: 'unload',
							loadingPoint: 'г. Астана, улица Пушкина, 10',
							dateAndPlaceOfUnloading: '20.07.2024, 15:40',
							cargoWeight: '5 тонн',
							cargoVolume: '500 м3',
							loadingMethod: 'Ручной'
						},
						{
							placeType: 'unload',
							loadingPoint: 'г. Москва, улица Ленина, 10',
							dateAndPlaceOfUnloading: '25.07.2024, 15:40',
							cargoWeight: '2 тонн',
							cargoVolume: '300 м3',
							loadingMethod: 'Ручной'
						},
						{
							placeType: 'unload',
							loadingPoint: 'г. Минск, улица Ленина, 10',
							dateAndPlaceOfUnloading: '27.07.2024, 15:40',
							cargoWeight: '3 тонн',
							cargoVolume: '400 м3',
							loadingMethod: 'Ручной'
						}
					]}
					transportationPeriod='12.07.2024-30.07.2024'
				/>
			</Box>

		</Box>
	)
}