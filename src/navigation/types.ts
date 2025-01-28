import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  tabs: undefined
  profile: undefined
  'profile-data': undefined
  identity: undefined
  documents: { carModel: string }
  'technical-passport': undefined
  'power-of-attorney': undefined
  InvoiceForGoods: undefined
  InvoiceSent: undefined
  OrderAccepted: undefined
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
  'registration-user-data': { resident: boolean };
  'otp-verify': { action: 'invite' | 'phone-verify' | 'login' | 'registration' };
  'pick-country': { handlePick: (val: string) => void };
  'login-via-phone': undefined
  'settings-profile': { resident: boolean };
  'personal-identifier': { resident: boolean };
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
