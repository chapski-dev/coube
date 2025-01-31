import { useAppTheme } from "@src/theme/theme";
import { Box, Button, Text } from "@src/ui";
import Circle from '@assets/svg/circle.svg'
import { FC } from "react";
import { useLocalization } from "@src/translations/i18n";
import { RouteObjectType } from "@src/screens/TransportationsDetailsScreen/TransportationDetailsScreen";

type OrderPropsTypes = {
	openTransportationDetails?: () => void
	companyName?: string
	rating?: string
	cargoName?: string
	category?: string[]
	transportationRoute: RouteObjectType[]
	cargoWeight?: string
}

export const OrderForSearchForOrderScreen: FC<OrderPropsTypes> = ({ openTransportationDetails, companyName, rating, cargoName, category, transportationRoute, cargoWeight }) => {
	const { t } = useLocalization()
	const {colors} = useAppTheme()

	return (
		<Box backgroundColor={colors.white} p={15} gap={5} >
			
			<Box row gap={5} >
				<Text type="body_500" children={companyName} />
				<Text type="body_500" color="green" children={rating} />
			</Box>

			<Text type="body_500" children={cargoName} />

			<Box row flexWrap="wrap" gap={8} >
				{
					category ? 
					category.map((el) => {
						return (
							<Box borderColor={colors.grey} borderWidth={1} px={10} borderRadius={21}>
								<Text children={el} />
							</Box>
						)
					})
					:''
				}
			
			</Box>

			
			<Box row gap={10} alignItems="center" >
				<Circle color='dark_grey' />
				<Text children={transportationRoute[0].loadingPoint} />
			</Box>

			<Box row gap={10} alignItems="center" >
				<Circle color='red' />
				<Text children={transportationRoute[transportationRoute.length-1].loadingPoint} />
			</Box>

			<Text color="black" fontSize={18} fontWeight={900} children={cargoWeight} />

			<Button backgroundColor='grey' textColor="black" children={t('transportation-details')} onPress={openTransportationDetails} />

		</Box>
	);
};