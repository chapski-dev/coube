import { Image } from 'react-native';
import Filter from '@assets/svg/filter.svg'
import MapPointer from '@assets/svg/map-pointer.svg'

import { orderDetails } from '@src/mocks/order-details';
import { ScreenProps } from '@src/navigation/types';
import { useLocalization } from '@src/translations/i18n';
import { Box, Text } from '@src/ui';

import { TransportationDetailsParams } from '../TransportationsDetailsScreen/TransportationDetailsScreen';

import { OrderForSearchForOrderScreen } from './components/Order';

export const SearchForNewOrder = ({ navigation }: ScreenProps<'search-for-new-order'>) => {
	const { t } = useLocalization()

	const openFilters = () => {navigation.push('filters-for-orders')}
	const openFromWhere = () => {navigation.push('from-where')}
	const openTransportationDetails = (details: TransportationDetailsParams) => {navigation.push('transportation-details', details)}

	return (
		<Box gap={10}>

			<Box row justifyContent="space-between" pt={15} px={15}>
				<Box row alignItems="center" gap={3} >
					<MapPointer />
					<Text children={t('whole-kazakstan')} onPress={openFromWhere} />
				</Box>
				<Box row alignItems="center" gap={3} >
					<Filter />
					<Text children={t('filters')} onPress={openFilters} />
				</Box>
				
			</Box>

			<Box alignItems="center">
				<Image source={require('@assets/png/map-for-new-order-search.png')} />
			</Box>

			<OrderForSearchForOrderScreen
				openTransportationDetails={() => openTransportationDetails(orderDetails)} 
				companyName='ТОО «FISO»'
				rating='4.9'
				cargoName='Медицинское оборудование'
				category={['Бытовая техника', '15 тонн', 'Полуприцеп', 'Полуприцеп', '12.07.2024-30.07.2024']}
				transportationRoute={orderDetails.transportationRoute}
				cargoWeight='1 000 000 T'
			/>

		</Box>
	);
};