import React, {
  createContext,
  Dispatch,
  ReactNode,
  ReducerAction,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useImmerReducer } from 'use-immer';

import { postSigIn } from '@src/api';
import { AppServiceStatus } from '@src/events';
import { AuthAction, AuthActionType, authReducer } from '@src/providers/reducers/authReducer';
import app from '@src/service/app';
import { ASYNC_STORAGE_KEYS } from '@src/vars/async_storage_keys';

export enum AuthState {
  // app transmission
  // default app state, starts seeking previous data if user has something to restore
  checking = 'checking',
  // user not logged in, or just logged out, displaying intro screeen after what user
  // can create account or be logged in through onboarding
  empty = 'empty',
  // user has login before & data to restore with lock screen using keychain and encryption,
  // displaying recover screen with availability to register or recover accounts
  filled = 'filled',
  connecting = 'connecting',
  // authorized and successfully logged in user
  ready = 'ready'
}

export interface IAuthProvider {
  authState: AuthState;
  user: null;
  onSignin: (data: { phone: string; otp: string }) => Promise<void>;
}

export const AuthContext = createContext<IAuthProvider>({
  authState: AuthState.checking,
  onSignin: () => new Promise((resolve) => resolve),
  user: null
});

export let dispatchAuth: Dispatch<ReducerAction<typeof authReducer>> | null = null;

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [authState, authDispatch] = useImmerReducer<AuthState, AuthAction>(
    authReducer,
    AuthState.checking
  );

  const [user, setUser] = useState<null>(null);

  const onSignin = async (data: { phone: string; otp: string }) => {
    const res = await postSigIn(data);
    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.ASSECC_TOKEN, res.access_token);
    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.REFRESH_TOKEN, res.refresh_token);
    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.AUTH_STATE, AuthActionType.setReady)
    dispatchAuth?.({ type: AuthActionType.setReady })
  };

  const onAuthStateChanged = useCallback(
    (_user: null) => {
      if (authState === AuthState.ready) {
        app.isFirebaseAuthorized = AppServiceStatus.on;
      }
      if (!user && !_user) {
        return;
      }
      setUser(_user);
      // app.isFirebaseAuthorized = _user ? AppServiceStatus.on : AppServiceStatus.off
    },
    [authState, user]
  );

  useEffect(() => {
    // make request to get user data
    // const getUserData = async (data) => onAuthStateChanged(data)
    onAuthStateChanged(null);
  }, [onAuthStateChanged]);

  useEffect(() => {
    dispatchAuth = authDispatch;
  }, [authDispatch]);

  return (
    <AuthContext.Provider value={{ authState, onSignin, user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
