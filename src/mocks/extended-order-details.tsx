import { SigningTransportationDetails } from '@src/screens/SigningOrderDetailsScreen';
import { OrderStatusEnum } from '@src/types/order';

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
  additional_cargo_information:
    'Транспортные средства, используемые для перевозки продуктов',
  cargo_name: 'Медицинское оборудование',
  cargo_type: 'Деревянный короб',
  cargo_volume_gross: '3000 м3',
  cargo_weight_gross: '15 tonn',
  distance: '228 км',
  documents: '№2233411-Артем.pdf',
  moving_service: '2',
  order_number: '15-020342',
  order_status: OrderStatusEnum.new,
  tare_type: 'Продукты питания',
  transportation_period: '12.07.2024-30.07.2024',
  transportation_route: [
    {
      cargo_volume_gross: '2000 м3',
      cargo_weight_gross: '10 тонн',
      date_and_place_of_operation: '18.07.2024, 15:40',
      loading_method: 'Ручной',
      action_address: 'г. Алматы, улица Желтоксан, 12А',
      point: {
        lat: 43.273564,
        lon: 76.91486,
      },
      placeType: 'load',
    },
    {
      cargo_volume_gross: '500 м3',
      cargo_weight_gross: '5 тонн',
      date_and_place_of_operation: '20.07.2024, 15:40',
      loading_method: 'Ручной',
      action_address: 'г. Астана, улица Пушкина, 10',
      point: {
        lat: 48.866597,
        lon: 73.674814,
      },
      placeType: 'unload',
    },
    {
      cargo_volume_gross: '300 м3',
      cargo_weight_gross: '2 тонн',
      date_and_place_of_operation: '25.07.2024, 15:40',
      loading_method: 'Ручной',
      action_address: 'г. Москва, улица Ленина, 10',
      point: {
        lat: 51.128201,
        lon: 71.430429,
      },
      placeType: 'unload',
    },
  ],
};
