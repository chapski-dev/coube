import { OrderStatusEnum } from '@src/screens/MyOrdersScreen/components/OrderStatus';
import { SigningTransportationDetails } from '@src/screens/SigningOrderDetailsScreen';

export const extendedOrderDetails: SigningTransportationDetails = {
	performer: 'TOO ASTRA',
	bin: '153255366844',
	company_name: 'TOO NOMADTRANZIT',
	general_director_name: 'Костин Макар Дамирович',
	general_director_email: 'Testemail@mail.ru',
	legal_adress: 'Алматы мкр. Кайрат 13, офис 103 ',
	actual_adress: 'Алматы мкр. Кайрат 13, офис 103 ',
	phone: 'TOO NOMADTRANZIT',
	email: '+ 7 777 777 77 77',
	account_number: 'KZ12345677889965',
	bank: 'AO «KaspiBank»',
	bik: '153255366844',
  additional_cargo_information: 'Транспортные средства, используемые для перевозки продуктов',
  cargo_name: 'Медицинское оборудование',
  cargo_type: 'Деревянный короб',
	cargo_volume: '3000 м3', 
	cargo_weight: '15 tonn',
	distance: '228 км',
	documents: '№2233411-Артем.pdf',
	moving_service: '2',
	order_number: '15-020342',
	order_status: OrderStatusEnum.new,
	tare_type: 'Продукты питания',
	transportation_period:'12.07.2024-30.07.2024',
	transportation_route: [
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