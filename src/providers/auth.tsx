import React, {
  createContext,
  Dispatch,
  ReactNode,
  ReducerAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useImmerReducer } from 'use-immer';

import { AppServiceStatus } from '@src/events';
import { AuthAction, authReducer } from '@src/providers/reducers/authReducer';
import app from '@src/service/app';

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
  ready = 'ready',
}

export interface IAuthProvider {
  authState: AuthState;
  user: null;
}

export const AuthContext = createContext<IAuthProvider>({
  authState: AuthState.checking,
  user: null,
});

export let dispatchAuth: Dispatch<ReducerAction<typeof authReducer>> | null =
  null;

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [authState, authDispatch] = useImmerReducer<AuthState, AuthAction>(
    authReducer,
    AuthState.checking,
  );

  const [user, setUser] = useState<null>(null);

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
    [authState, user],
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
    <AuthContext.Provider value={{ authState, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
