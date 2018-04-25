import { SessionActionTypes } from '../actions/session.action';
import { Session } from '../models/session.model';

import * as fromRoot from '../../app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface SessionsState {
    readonly entities: Session[];
    readonly loading: boolean;
    readonly error: string;
}

export interface State extends fromRoot.State {
    sessions: SessionsState;
}

export const getRootSessionsState = createFeatureSelector<State>('sessions');
export const getSessionsState = createSelector(getRootSessionsState, state => state.sessions);
export const getSessionsEntitiesState = createSelector(getSessionsState, state => state.entities);

export function reducer(state = [], action) {
  switch (action.type) {
    case SessionActionTypes.Search: {
      return {...state, loading: true};
    }
    case SessionActionTypes.SearchFailed: {
      return {...state, loading: false, error: action.payload};
    }
    case SessionActionTypes.SearchComplete: {
      return {entities: action.payload, loading: false};
    }
    default:
      return state;
  }
}
