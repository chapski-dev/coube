/* eslint-disable sort-keys-fix/sort-keys-fix */
import { create } from 'zustand';

import {
  OrderDetails,
  TransportationCargoInfoResponse,
  TransportationMainInfoResponse,
} from '@src/api/types';
import { RouteObjectType } from '@src/screens/TransportationsDetailsScreen';
import { DriverStatusEnum, OrderStatusEnum } from '@src/types/order';

interface ITransportationOrderState extends OrderDetails {
  setOrderStatus: (status: OrderStatusEnum) => void;
  setDriverStatus: (status: DriverStatusEnum) => void;
  setRoute: (route: RouteObjectType[]) => void;
}

const initialMainInfo: TransportationMainInfoResponse = {
  status: 'FORMING',
  id: 0,
  contact: {
    id: 0,
    name: '',
    email: '',
    phoneNumber: '',
  },
  cargoName: '',
  cargoType: { id: 0, nameKk: '', nameRu: '' },
  tareType: { id: 0, nameKk: '', nameRu: '' },
  cargoPrice: 0,
  cargoPriceCurrency: { code: 'KZT', nameKk: 'Теңге', nameRu: 'Тенге' },
  cargoWeight: 0,
  cargoWeightUnit: 'TONS',
  cargoVolume: 0,
  vehicleBodyType: { id: 0, nameKk: '', nameRu: '' },
  capacityValue: { id: 0, capacityValue: 0 },
  capacityUnit: 'TONS',
  additionalInfo: '',
};

const initialCargoInfo: TransportationCargoInfoResponse = {
  vehicleBodyType: { id: 0, nameKk: '', nameRu: '' },
  cargoLoadings: [],
};

const initialState: OrderDetails = {
  transportationMainInfoResponse: initialMainInfo,
  transportationCargoInfoResponse: initialCargoInfo,
  hasAlreadyApplied: false,
};

const useTransportationStore = create<ITransportationOrderState>((set) => ({
  ...initialState,
  ...STATE_MOCK,

  setOrderStatus: (status: OrderStatusEnum) =>
    set((state) => ({ ...state, order_status: status })),

  setDriverStatus: (status: DriverStatusEnum) =>
    set((state) => ({ ...state, driver_status: status })),

  setRoute: (route: RouteObjectType[]) => set((state) => ({ ...state, route })),
}));

export default useTransportationStore;

export const STATE_MOCK: OrderDetails = {
  transportationMainInfoResponse: {
    status: 'FORMING',
    id: 15_020_342,
    contact: {
      id: 1,
      name: 'Анна',
      email: 'anna@example.com',
      phoneNumber: '+7 777 77 77 77',
    },
    cargoName: 'Медицинское оборудование',
    cargoType: {
      id: 1,
      nameKk: '',
      nameRu: 'Деревянный короб',
    },
    tareType: {
      id: 2,
      nameKk: '',
      nameRu: 'Продукты питания',
    },
    cargoPrice: 0,
    cargoPriceCurrency: {
      code: 'KZT',
      nameKk: 'Теңге',
      nameRu: 'Тенге',
    },
    cargoWeight: 15,
    cargoWeightUnit: 'TONS',
    cargoVolume: 3000,
    vehicleBodyType: {
      id: 3,
      nameKk: '',
      nameRu: 'Ручной',
    },
    capacityValue: {
      id: 1,
      capacityValue: 15,
    },
    capacityUnit: 'TONS',
    additionalInfo:
      'Транспортные средства, используемые для перевозки продуктов',
  },
  transportationCargoInfoResponse: {
    vehicleBodyType: {
      id: 3,
      nameKk: '',
      nameRu: 'Ручной',
    },
    cargoLoadings: [
      {
        id: 1,
        loadingType: 'LOADING',
        orderNum: 1,
        binShipper: '',
        loadingDateTime: '2024-07-18T15:40:00Z',
        address: 'г. Алматы, улица Желтоксан, 12А',
        longitude: '76.91486',
        latitude: '43.273564',
        commentary: '',
        weight: 10,
        weightUnit: 'TONS',
        volume: 2000,
        loadingMethod: {
          id: 4,
          nameKk: '',
          nameRu: 'Ручной',
        },
        loadingOperation: {
          id: 5,
          nameKk: '',
          nameRu: 'Стандартная операция',
        },
        loadingTimeHours: 1,
        contactNumber: '+7 777 77 77 77',
        contactName: 'Анна',
      },
      {
        id: 2,
        loadingType: 'UNLOADING',
        orderNum: 2,
        binShipper: '',
        loadingDateTime: '2024-07-20T15:40:00Z',
        address: 'г. Астана, улица Пушкина, 10',
        longitude: '73.674814',
        latitude: '48.866597',
        commentary: '',
        weight: 5,
        weightUnit: 'TONS',
        volume: 500,
        loadingMethod: {
          id: 4,
          nameKk: '',
          nameRu: 'Ручной',
        },
        loadingOperation: {
          id: 5,
          nameKk: '',
          nameRu: 'Стандартная операция',
        },
        loadingTimeHours: 1,
        contactNumber: '+7 777 77 77 77',
        contactName: 'Анна',
      },
      {
        id: 3,
        loadingType: 'UNLOADING',
        orderNum: 3,
        binShipper: '',
        loadingDateTime: '2024-07-25T15:40:00Z',
        address: 'г. Москва, улица Ленина, 10',
        longitude: '71.430429',
        latitude: '51.128201',
        commentary: '',
        weight: 2,
        weightUnit: 'TONS',
        volume: 300,
        loadingMethod: {
          id: 4,
          nameKk: '',
          nameRu: 'Ручной',
        },
        loadingOperation: {
          id: 5,
          nameKk: '',
          nameRu: 'Стандартная операция',
        },
        loadingTimeHours: 1,
        contactNumber: '+7 777 77 77 77',
        contactName: 'Анна',
      },
    ],
  },
  hasAlreadyApplied: false,
};
