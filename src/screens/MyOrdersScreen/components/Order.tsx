import { useAppTheme } from "@src/theme/theme";
import { Box, Button, Text } from "@src/ui";
import { Image } from "react-native";
import DarkCircle from '@assets/svg/dark-circle.svg'
import RedCircle from '@assets/svg/red-circle.svg'
import ThreeDots from '@assets/svg/three-dots.svg'
import { ScreenProps } from '@src/navigation/types';
import { FC } from "react";
import { OrderStatus,OrderStatusEnum } from "./OrderStatus";
import { useLocalization } from "@src/translations/i18n";
import { RouteObjectType } from "@src/screens/TransportationsDetailsScreen/TransportationDetailsScreen";

type OrderPropsTypes = {
	openTransportationDetails: () => void
	orderStatus: OrderStatusEnum
	orderNumber?: string
	distance?: string
	cargoName?: string
	routeInfromation: RouteObjectType[]
	transportationPeriod: string
}

export const Order: FC<OrderPropsTypes> = ({ openTransportationDetails, orderStatus, orderNumber, cargoName, distance, routeInfromation }) => {
	const { t } = useLocalization()
	const {colors} = useAppTheme()

	return (
		<Box backgroundColor={colors.white} minHeight={523} p={15} gap={7} flex={1} >
			<Box row w='full' justifyContent="space-between" >
				<Box row gap={10} >
					<Text children='№' />
					<Text children={orderNumber} fontWeight={700} color="black" />
				</Box>
				<Box>
					<OrderStatus orderStatus={orderStatus} />
				</Box>
			</Box>
			
			<Box w='full' alignItems="center" >
				<Image source={require('@assets/png/map-orders-search-screen.png')} />
			</Box>

			<Box row w='full' justifyContent="flex-end" >
				<Text children={t('distance')} />
				<Text children=': ' />
				<Text fontWeight={500} children={distance} />
			</Box>

			<Text children={t('cargo-name')} />
			<Text type="body_500" children={cargoName} />

			<Box w='full' h={0.5} backgroundColor={colors.dark_grey} ></Box>

			<Text children={t('route')} />

			<Box row gap={10} alignItems="center" >
				<DarkCircle />
				<Text type="body_500" children={routeInfromation[0].loadingPoint} />
			</Box>

			<Box row gap={10} alignItems="center" >
				<ThreeDots />
				<Box row gap={5}>
					<Text type="body_500" children={'Ещё'}  />
					<Text type="body_500" children={routeInfromation.length-2}  />
				</Box>
			</Box>

			<Box row gap={10} alignItems="center" >
				<RedCircle />
				<Text type="body_500" children={routeInfromation[routeInfromation.length-1].loadingPoint}  />
			</Box>

			<Text children={t('transportation-time')} />

			<Text type="body_500" children='12.07.2024-30.07.2024' />

			<Button children={t('transportation-details')} onPress={openTransportationDetails} textColor="black" backgroundColor='grey' />

			<Box row w='full' gap={20} flexGrow={1} >
				<Button children={t('decline')} backgroundColor='red' wrapperStyle={{flex: 1}} />
				<Button children={t('accept')} backgroundColor='green' wrapperStyle={{flex: 1}} />
			</Box>
			
		</Box>
	);
};