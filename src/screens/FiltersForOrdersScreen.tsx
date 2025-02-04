import { Box, Button, Input, Text } from "@src/ui";
import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from "@src/theme/theme";
import Checkbox from "@src/ui/Checkbox";
import { useState } from "react";
import { useLocalization } from "@src/translations/i18n";

export const FiltersForOrdersScreen = ({ navigation }: ScreenProps<'filters-for-orders'>) => {
	const { t } = useLocalization()
	const {colors} = useAppTheme()

	const [statesObject, setStatesObject] = useState({
		bulkMaterials: false,
		FTLTransportations: false,
		cityTransportations: false,
		LTLTransportations: false,
		routeFrom: '',
		routeTo: '',
		loadCapacityFrom: '',
		loadCapacityTo: '',
		foodProducts: false,
		buildingMaterials: false,
		householdAppliances: false,
		container: false,
		isotherm: false,
		refrigerator: false,
		tent:false,
		industrial: false,
		board: false,
		cargoWeightFrom: '',
		cargoWeightTo: '',
		deliveryPriceFrom: '',
		deliveryPriceTo: '',
		manual: false,
		upper: false,
		lateral: false,
		rear: false,
		FAWJ7: false,
		SanySYZ320: false,
		Gaz2310Sobol: false,
	})

	return (
		<Box p={15}>

			<Text type="body_500" children={t('type-of-transportation')}  />

			<Box gap={10} py={10}>
				<Checkbox children={t('bulk-materials')} selected={statesObject.bulkMaterials} onPress={() => setStatesObject(state => ({...state, bulkMaterials: !state.bulkMaterials}))} />
				<Checkbox children={t('ftl-transportations')} selected={statesObject.FTLTransportations} onPress={() => setStatesObject(state => ({...state, FTLTransportations: !state.FTLTransportations}))} />
				<Checkbox children='БоковПеревозки по городу' selected={statesObject.cityTransportations} onPress={() => setStatesObject(state => ({...state, cityTransportations: !state.cityTransportations}))} />
				<Checkbox children={t('ltl-transportations')} selected={statesObject.LTLTransportations} onPress={() => setStatesObject(state => ({...state, LTLTransportations: !state.LTLTransportations}))} />
			</Box>

			<Text type="body_500" children={t('transportation-route')}  />

			<Box gap={10} py={10} >
				<Input placeholder={t('from-where')} value={statesObject.routeFrom} onChangeText={(text) => {setStatesObject(state => ({...state, routeFrom: text}))}} />
				<Input placeholder={t('to-where')} value={statesObject.routeTo} onChangeText={(text) => {setStatesObject(state => ({...state, routeTo: text}))}} />
			</Box>

			<Text type="body_500" children={t('payload-capacity')}  />

			<Box gap={10} py={10} >
				<Input placeholder={t('from-where')} value={statesObject.loadCapacityFrom} onChangeText={(text) => {setStatesObject(state => ({...state, loadCapacityFrom: text}))}} />
				<Input placeholder={t('to-where')} value={statesObject.loadCapacityTo} onChangeText={(text) => {setStatesObject(state => ({...state, loadCapacityTo: text}))}} />
			</Box>

			<Text type="body_500" children={t('cargo-type')}   />

			<Box gap={10} py={10} >
				<Checkbox children={t('food-products')} selected={statesObject.foodProducts} onPress={() => setStatesObject(state => ({...state, foodProducts: !state.foodProducts}))} />
				<Checkbox children={t('building-materials')} selected={statesObject.buildingMaterials} onPress={() => setStatesObject(state => ({...state, buildingMaterials: !state.buildingMaterials}))} />
				<Checkbox children={t('household-appliances')} selected={statesObject.householdAppliances} onPress={() => setStatesObject(state => ({...state, householdAppliances: !state.householdAppliances}))} />
			</Box>

			<Text type="body_500" color={colors.main} children={t('load-more')}  />
			<Text type="body_500" children={t('vehicle-body-type')} pt={20} />

			<Box gap={10} py={10}>
				<Checkbox children={t('container')} selected={statesObject.container} onPress={() => setStatesObject(state => ({...state, container: !state.container}))} />
				<Checkbox children={t('isotherm')} selected={statesObject.isotherm} onPress={() => setStatesObject(state => ({...state, isotherm: !state.isotherm}))} />
				<Checkbox children={t('refrigerator')} selected={statesObject.refrigerator} onPress={() => setStatesObject(state => ({...state, refrigerator: !state.refrigerator}))} />
				<Checkbox children={t('tent')} selected={statesObject.tent} onPress={() => setStatesObject(state => ({...state, tent: !state.tent}))} />
				<Checkbox children={t('industrial')} selected={statesObject.industrial} onPress={() => setStatesObject(state => ({...state, industrial: !state.industrial}))} />
				<Checkbox children={t('board')} selected={statesObject.board} onPress={() => setStatesObject(state => ({...state, board: !state.board}))} />
			</Box>

			<Text type="body_500" children={t('cargo-weight')} />

			<Box gap={10} py={10}>
				<Input placeholder={t('from-where')} value={statesObject.cargoWeightFrom} onChangeText={(text) => {setStatesObject(state => ({...state, cargoWeightFrom: text}))}} />
				<Input placeholder={t('to-where')}  value={statesObject.cargoWeightTo} onChangeText={(text) => {setStatesObject(state => ({...state, cargoWeightTo: text}))}} />
			</Box>

			<Text type="body_500" children={t('price-of-delivery')} />

			<Box gap={10} py={10}>
				<Input placeholder={t('from-where')} value={statesObject.deliveryPriceFrom} onChangeText={(text) => {setStatesObject(state => ({...state, deliveryPriceFrom: text}))}} />
				<Input placeholder={t('to-where')}  value={statesObject.deliveryPriceTo} onChangeText={(text) => {setStatesObject(state => ({...state, deliveryPriceTo: text}))}} />
			</Box>

			<Text type="body_500" children={t('loading-method')} />

			<Box gap={10} py={10} >
				<Checkbox children={t('manual')} selected={statesObject.manual} onPress={() => setStatesObject(state => ({...state, manual: !state.manual}))} />
				<Checkbox children={t('upper')} selected={statesObject.upper} onPress={() => setStatesObject(state => ({...state, upper: !state.upper}))} />
				<Checkbox children={t('lateral')} selected={statesObject.lateral} onPress={() =>  setStatesObject(state => ({...state, lateral: !state.lateral}))} />
				<Checkbox children={t('rear')} selected={statesObject.rear} onPress={() => setStatesObject(state => ({...state, rear: !state.rear}))} />
			</Box>

			<Text type="body_500" children={t('outside-my-transport')} />

			<Box gap={10} py={10} >
				<Checkbox children={t('fawj7')}  selected={statesObject.FAWJ7} onPress={() => setStatesObject(state => ({...state, FAWJ7: !state.FAWJ7}))} />
				<Checkbox children={t('sanysyz320')}  selected={statesObject.SanySYZ320} onPress={() => setStatesObject(state => ({...state, SanySYZ320: !state.SanySYZ320}))} />
				<Checkbox children={t('gaz2310sobol')}  selected={statesObject.Gaz2310Sobol} onPress={() => setStatesObject(state => ({...state, Gaz2310Sobol: !state.Gaz2310Sobol}))} />
			</Box>

			<Button children={t('show')} />

		</Box>
	);
};