import { NativeStackScreenProps } from '@react-navigation/native-stack';


export type RootStackParamList = {
  tabs: undefined
  Documents: { carModel: string }
  TechnicalPassport: undefined
  PowerOfAttorney: undefined
}

export type TabsParamList = {
  orders: undefined
  transport: undefined
  finance: undefined
  notifications: undefined
  profile: undefined
}

export type UnauthorizedStackParamList = {
  launch: undefined
  intro: undefined
  login: undefined
  registration: undefined
  'registration-user-data': {resident: boolean}
}

export type AllStackParamList = RootStackParamList & TabsParamList & UnauthorizedStackParamList

export type AvailableRoutes = keyof AllStackParamList

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AllStackParamList {}
  }
}

export type ScreenProps<Screen extends keyof AllStackParamList> = NativeStackScreenProps<AllStackParamList, Screen>
