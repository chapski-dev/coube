import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OrderStatusEnum } from '@src/screens/MyOrdersScreen/components/OrderStatus';
import { DriverStatue } from '@src/screens/OrderScreen';

import { TransportationDetails } from '@src/screens/TransportationsDetailsScreen';

export type RootStackParamList = {
  tabs: undefined
  profile: undefined
  'profile-data': undefined
  identity: undefined
  documents: { carModel: string }
  'technical-passport': undefined
  'power-of-attorney': undefined
  'search-for-new-order': undefined
  'filters-for-orders': undefined
  'from-where': undefined
  'transportation-details': TransportationDetails
  'counter-offer': undefined
  'upload-invoise-for-goods': undefined
  'invoice-sent': undefined
  'order-accepted': { onOrderAccepted: () => void }
  'order-screen': { 
    driver_status: DriverStatue
    order_status: OrderStatusEnum
    headerTitle: string
  }
  'company-configuration': undefined
  'bank-details': undefined
  'contact-details': undefined
}

export type TabsParamList = {
  orders: undefined;
  transport: undefined;
  finance: undefined;
  notifications: undefined;
  profile: undefined;
};

export type UnauthorizedStackParamList = {
  launch: undefined;
  intro: undefined;
  login: undefined;
  registration: { step: 'driver_performer_or_invaitetion' | 'residency' };
  'registration-user-data': undefined;
  'otp-verify': { 
    action: 'invite' | 'phone-verify' | 'login' | 'registration', 
    resident?: boolean 
  };
  'pick-country': { handlePick: (val: string) => void };
  'login-via-phone': undefined
  'settings-profile': undefined;
  'personal-identifier': undefined;
  'registration-finished': undefined
  'add-drivers-license': undefined;
  'performer-registration': undefined
};

export type AllStackParamList = RootStackParamList & TabsParamList & UnauthorizedStackParamList 

export type AvailableRoutes = keyof AllStackParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AllStackParamList {}
  }
}

export type ScreenProps<Screen extends keyof AllStackParamList> =
  NativeStackScreenProps<AllStackParamList, Screen>;