import { TransportationDetailsParams } from "@src/screens/TransportationsDetailsScreen/TransportationDetailsScreen";

export const orderDetails: TransportationDetailsParams = {
	distance: '228 км', 
	cargoName: 'Медицинское оборудование',
	cargoType: 'Деревянный короб',
	tareType: 'Продукты питания',
	cargoWeight: '15 tonn',
	cargoVolume: '3000 м3',
	additionalCargoInformation: 'Транспортные средства, используемые для перевозки продуктов',
	transportationRoute: [
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
}