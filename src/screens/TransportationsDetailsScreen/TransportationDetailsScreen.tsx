import { Box, Button, Text } from "@src/ui";
import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from "@src/theme/theme";
import { Image } from "react-native";
import { RoutePoint } from "./components/RoutePoint";
import Circle from '@assets/svg/circle.svg'
import Arrow from '@assets/svg/arrow-right.svg'
import { useState } from "react";
import { useLocalization } from "@src/translations/i18n";

export type RouteObjectType = {
	placeType: 'load' | 'unload'
	loadingPoint: string
	dateAndPlaceOfUnloading: string
	cargoWeight: string
	cargoVolume: string
	loadingMethod: string
}

export type TransportationDetailsParams = {
	distance: string
	cargoName: string
	cargoType: string
	tareType: string
	cargoWeight: string
	cargoVolume: string
	additionalCargoInformation: string
	transportationRoute: RouteObjectType[]
	movingService: string
	documents: string
}

export const TransportationDetailsScreen = ({ navigation, route }: ScreenProps<'transportation-details'>) => {
	const { t } = useLocalization()
	const {colors} = useAppTheme()

	const { distance, cargoName, cargoType, tareType, cargoWeight, cargoVolume, additionalCargoInformation, transportationRoute, movingService, documents } = route.params

	const openTransportationDetails = () => {navigation.push('counter-offer')}

	const [unfoldCargo, setUnfoldCargo] = useState<boolean>(true)
	const [unfoldRoute, setUnfoldRoute] = useState<boolean>(true)
	const [unfoldAdditional, setUnfoldAdditional] = useState<boolean>(true)
	const [unfoldDocuments, setUnfoldDocuments] = useState<boolean>(true)

	return (
		<Box gap={5} >

			<Box alignItems="center" justifyContent="center" pt={10}>
				<Image source={require('@assets/png/map-for-transportation-details.png')} />
			</Box>
			
			<Box justifyContent="flex-end" row >
				<Text children={t('distance')} />
				<Text children={': '} />
				<Text type="body_500" children={distance} />
			</Box>

			<Box p={15} backgroundColor={colors.white}>
				<Box row justifyContent="space-between" alignItems="center" >
					<Text type="body_500" children={t('cargo-information')} fontSize={17} />
					<Arrow rotation={unfoldCargo ? -90 : 90} onPress={() => setUnfoldCargo((prev) => !prev)} />
				</Box>

				{
					unfoldCargo &&
					<Box py={10} gap={10}>
						<Box>
							<Text children={t('cargo-name')} />
							<Text type="body_500" children={cargoName} />
						</Box>

						<Box>
							<Text children={t('cargo-type')} />
							<Text type="body_500" children={cargoType} />
						</Box>

						<Box>
							<Text children={t('loading-container-type')} />
							<Text type="body_500" children={tareType} />
						</Box>

						<Box>
							<Box>
								<Text children={t('cargo-weight-brutto')} />
								<Text type="body_500" children={cargoWeight} />
							</Box>
							<Box>
								<Text children={t('cargo-volume-brutto')} />
								<Text type="body_500" children={cargoVolume} />
							</Box>
						</Box>

						<Box>
							<Text children={t('additional-cargo-info')} />
							<Text type="body_500" children={additionalCargoInformation} />
						</Box>
						
					</Box>
				}

				
			</Box>

			<Box p={15} backgroundColor={colors.white} gap={15}>
				<Box row justifyContent="space-between" alignItems="center" >
					<Text type="body_500" children={t('route')} fontSize={17} />
					<Arrow rotation={unfoldRoute ? -90 : 90} onPress={() => setUnfoldRoute((prev) => !prev)} />
				</Box>

				{
					unfoldRoute &&
					<Box>
						{
							transportationRoute.map((data, index) => {
								return (
									<Box row gap={15}>
										<Box alignItems="center"  >
											{
												index === 0 ?
												<Circle color='dark_grey' /> :
												index === transportationRoute.length -1 ?
												<Circle color='red' /> :
												<Box w={15} h={15} alignItems="center" justifyContent="center" borderColor={colors.dark_grey} borderWidth={1} borderRadius={5} >
													<Text fontSize={8} color="black" children={index} />
												</Box>
											}
											{index !== transportationRoute.length -1 && <Box flex={1} w={1} backgroundColor={colors.dark_grey} />}
										</Box>
										
										<RoutePoint key={index} {...data} />
									</Box>
								)
							} )
						}
					</Box>
				}

			</Box>

			<Box p={15} backgroundColor={colors.white} gap={8}>
				<Box row justifyContent="space-between" alignItems="center" >
					<Text type="body_500" children={t('additional-info')} fontSize={17} />
					<Arrow rotation={unfoldAdditional ? -90 : 90} onPress={() => setUnfoldAdditional((prev) => !prev)} />
				</Box>

				{
					unfoldAdditional &&
					<Box>
						<Text type="body_500" children={t('porter-service')} />
						<Box>
							<Box row>
								<Text children={t('number-of-people')} />
								<Text children=': ' />
							</Box>
							<Text type="body_500" children={movingService} />
						</Box>
					</Box>
				}
				
			</Box>

			<Box p={15} backgroundColor={colors.white} gap={15}>
				<Box row justifyContent="space-between" alignItems="center" >
					<Text type="body_500" children={t('documents')} fontSize={17} />
					<Arrow rotation={unfoldDocuments ? -90 : 90} onPress={() => setUnfoldDocuments((prev) => !prev)} />
				</Box>

				{
					unfoldDocuments &&
					<Box row gap={10} >
						<Image source={require('@assets/png/pdf-file.png')} />
						<Box>
							<Text type="body_500" children={t('waybill')} />
							<Text type="body_500" children={documents} fontWeight={400} />
						</Box>
					</Box>
				}
				
			</Box>

			<Box p={10} gap={10} >
				<Button children={t('respond')} />
				<Button children={t('make-counteroffer')} type="outline" borderColor="main" textColor="main" onPress={openTransportationDetails} />
			</Box>
		</Box>
	);
};