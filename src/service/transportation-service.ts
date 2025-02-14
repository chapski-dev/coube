/* eslint-disable sort-keys-fix/sort-keys-fix */
import { create } from 'zustand';

import { RouteObjectType } from '@src/screens/TransportationsDetailsScreen';
import { OrderStatusEnum } from '@src/types/order';

export interface ITransportationOrderData {
  order_number: string | undefined;
  driver_status: null;
  order_status: OrderStatusEnum;
  name_of_cargo: string;
  type_of_cargo: string;
  type_of_loading_container: string;
  cargo_weight_gross: string;
  cargo_volume_gross: string;
  additional_information: string;
  action_address: string;
  loading_method: string;
  customer_contact_name: string;
  customer_contact_phone: string;
  route: RouteObjectType[];
  additional_cargo_information: string;
  documents: string[];
}

interface ITransportationOrderState extends ITransportationOrderData {
  setOrderStatus: (status: OrderStatusEnum) => void;
  setDriverStatus: (status: null) => void;
  setRoute: (route: RouteObjectType[]) => void;
}

const initialState: ITransportationOrderData = {
  order_number: '0',
  driver_status: null,
  order_status: OrderStatusEnum.new,
  name_of_cargo: '',
  type_of_cargo: '',
  type_of_loading_container: '',
  cargo_weight_gross: '',
  cargo_volume_gross: '',
  additional_information: '',
  action_address: '',
  loading_method: '',
  customer_contact_name: '',
  customer_contact_phone: '',
  route: [],
  additional_cargo_information: '',
  documents: [],
}

const useTransportationStore = create<ITransportationOrderState>((set) => ({
  ...initialState,
  ...STATE_MOCK,

  setOrderStatus: (status: OrderStatusEnum) =>
    set((state) => ({ ...state, order_status: status })),

  setDriverStatus: (status: null) =>
    set((state) => ({ ...state, driver_status: status })),

  setRoute: (route: RouteObjectType[]) =>
    set((state) => ({ ...state, route })),
}));

export default useTransportationStore;

export const STATE_MOCK: ITransportationOrderData = {
  order_number: '15-020342',
  driver_status: null,
  order_status: OrderStatusEnum.new,
  name_of_cargo: 'Медицинское оборудование',
  type_of_cargo: 'Деревянный короб',
  type_of_loading_container: 'Продукты питания',
  cargo_weight_gross: '15 тонн',
  cargo_volume_gross: '3000 м3',
  additional_information: '12.07.2024-30.07.2024',
  action_address: 'г. Алматы, улица Желтоксан, 12А',
  loading_method: 'Ручной',
  customer_contact_name: 'Анна',
  customer_contact_phone: '+7 777 77 77 77',
  route: [
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
      placeType: 'load'
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
      placeType: 'unload'
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
  additional_cargo_information: 'Транспортные средства, используемые для перевозки продуктов',
  documents: [ '№2233411-Артем.pdf' ]
}