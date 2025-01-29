import { Draft } from 'immer'

import { AuthState } from '../auth'

export enum AuthActionType {
  setCheking = 'SET_IS_CHECKING',
  setEmpty = 'SET_IS_EMPTY',
  setFilled = 'SET_IS_FILLED',
  setConnecting = 'SET_IS_CONNECTING',
  setReady = 'SET_IS_ACCOUNT_READY',
}

export type AuthAction = { type: AuthActionType }

export function authReducer(draft: Draft<AuthState>, action: AuthAction) {
  switch (action.type) {
    case AuthActionType.setReady: {
      draft = AuthState.ready
      break
    }
    case AuthActionType.setConnecting: {
      draft = AuthState.connecting
      break
    }
    case AuthActionType.setEmpty: {
      draft = AuthState.empty
      break
    }
    case AuthActionType.setFilled: {
      draft = AuthState.filled
      break
    }
    case AuthActionType.setCheking: {
      draft = AuthState.checking
      break
    }
  }
  return draft
}
