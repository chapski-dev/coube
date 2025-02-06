import { TransportationDetailsParams } from '@src/screens/TransportationsDetailsScreen/TransportationDetailsScreen';

export const orderDetails: TransportationDetailsParams = {
	additionalCargoInformation: 'Транспортные средства, используемые для перевозки продуктов', 
	cargoName: 'Медицинское оборудование',
	cargoType: 'Деревянный короб',
	cargoVolume: '3000 м3',
	cargoWeight: '15 tonn',
	distance: '228 км',
	documents: '№2233411-Артем.pdf',
	movingService: '2',
	tareType: 'Продукты питания',
	transportationRoute: [
		{
			cargoVolume: '2000 м3',
			cargoWeight: '10 тонн',
			dateAndPlaceOfUnloading: '18.07.2024, 15:40',
			loadingMethod: 'Ручной',
			loadingPoint: 'г. Алматы, улица Желтоксан, 12А',
			placeType: 'load'
		},
		{
			cargoVolume: '500 м3',
			cargoWeight: '5 тонн',
			dateAndPlaceOfUnloading: '20.07.2024, 15:40',
			loadingMethod: 'Ручной',
			loadingPoint: 'г. Астана, улица Пушкина, 10',
			placeType: 'unload'
		},
		{
			cargoVolume: '300 м3',
			cargoWeight: '2 тонн',
			dateAndPlaceOfUnloading: '25.07.2024, 15:40',
			loadingMethod: 'Ручной',
			loadingPoint: 'г. Москва, улица Ленина, 10',
			placeType: 'unload'
		},
		{
			cargoVolume: '400 м3',
			cargoWeight: '3 тонн',
			dateAndPlaceOfUnloading: '27.07.2024, 15:40',
			loadingMethod: 'Ручной',
			loadingPoint: 'г. Минск, улица Ленина, 10',
			placeType: 'unload'
		}
	]
}