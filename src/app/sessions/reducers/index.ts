import * as fromRooms from '../../rooms/reducers/room.reducer'
import * as fromJudges from '../../judges/reducers/judge.reducer';
import * as fromJudgesIndex from '../../judges/reducers/index';
import * as fromHearingPartIndex from '../../hearing-part/reducers/index';
import * as fromSessions from './session.reducer'
import * as fromSessionTransaction from './session-transaction.reducer'
import * as fromRoot from '../../app.state';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { SessionViewModel } from '../models/session.viewmodel';
import { SessionProposition } from '../models/session-proposition.model';
import { SessionPropositionView } from '../models/session-proposition-view.model';
import * as moment from 'moment';

export interface SessionsState {
    readonly sessions: fromSessions.State;
    readonly rooms: fromRooms.State;
    readonly sessionTransaction: fromSessionTransaction.State;
}

export interface State extends fromRoot.State {
    sessions: SessionsState;
}

export const reducers: ActionReducerMap<SessionsState> = {
    sessions: fromSessions.reducer,
    rooms: fromRooms.reducer,
    sessionTransaction: fromSessionTransaction.reducer
};

export const getSessionsState = createFeatureSelector<SessionsState>('sessions');
export const getRoomsEntitiesState = createSelector(
    getSessionsState,
    state => state.rooms
);

export const getRooms = createSelector(
    getRoomsEntitiesState,
    state => state.entities
);

export const getSessionsEntitiesState = createSelector(
    getSessionsState,
    state => state.sessions
);

export const getSessionTransactionState = createSelector(
    getSessionsState,
    state => state.sessionTransaction
);

export const getSessionTransactionEntitiesState = createSelector(
    getSessionTransactionState,
    state => state.entities
);

export const getRecentlyCreatedTransactionId = createSelector(
    getSessionTransactionState,
    fromSessionTransaction.getRecent,
);

export const getRecentlyCreatedSessionId = createSelector(
    getRecentlyCreatedTransactionId,
    getSessionTransactionEntitiesState,
    (transactionId, transactions) => {
        return transactions[transactionId].sessionId;
    }
);

export const getRecentlyCreatedSessionStatus = createSelector(
    getSessionTransactionEntitiesState,
    getRecentlyCreatedTransactionId,
    (sessionCreationEntities, recentlyCreatedSessionId) => {
        console.log(sessionCreationEntities[recentlyCreatedSessionId]);
        return sessionCreationEntities[recentlyCreatedSessionId];
    }
);

export const getSessionsLoading = createSelector(
    getSessionsEntitiesState,
    state => state.loading
);

export const getSessionsError = createSelector(
    getSessionsEntitiesState,
    state => state.error
);

export const getSessionsPropositions = createSelector(
    getSessionsEntitiesState,
    state => state.sessionPropositions
);

export const {
    selectIds: getSessionIds,
    selectEntities: getSessionEntities,
    selectAll: getAllSessions,
    selectTotal: getTotalSessions,
} = fromSessions.adapter.getSelectors(getSessionsEntitiesState);

export const getFullSessions = createSelector(getAllSessions, getRooms, fromJudgesIndex.getJudges, fromHearingPartIndex.getHearingParts,
    (sessions, rooms, judges, hearingParts) => {
        let finalSessions: SessionViewModel[];
        if (sessions === undefined) {return []};
        finalSessions = Object.keys(sessions).map(sessionKey => {
            let sessionData = sessions[sessionKey];
            return {
                id: sessionData.id,
                start: sessionData.start,
                duration: sessionData.duration,
                room: rooms[sessionData.room],
                person: judges[sessionData.person],
                caseType: sessionData.caseType,
                hearingParts: Object.values(hearingParts).filter(hearingPart => hearingPart.session === sessionData.id)
            } as SessionViewModel;
        });
        return Object.values(finalSessions);
    });

export const getFullSessionPropositions = createSelector(getSessionsPropositions, getRooms, fromJudgesIndex.getJudges,
    (sessions, rooms, judges) => {
        let finalSessions: SessionPropositionView[];
        if (sessions === undefined) { return []; }
        finalSessions = sessions.map((sessionProposition: SessionProposition) => {
            return {
                startTime: moment(sessionProposition.start).format('HH:mm'),
                endTime: moment(sessionProposition.end).format('HH:mm'),
                date: moment(sessionProposition.start).format('DD MMM YYYY'),
                availibility: moment.duration(moment(sessionProposition.end).diff(moment(sessionProposition.start))).humanize(),
                room: rooms[sessionProposition.roomId],
                judge: judges[sessionProposition.judgeId],
            } as SessionPropositionView;
        });
        return finalSessions;
    });

export const getSessionById = (id: string) => createSelector(getFullSessions, (svm: SessionViewModel[]) => {
    return svm.find(s => s.id === id);
});

export const getRecentlyCreatedSession = createSelector(
    getAllSessions,
    fromSessionTransaction.getRecent,
    (sessions, recentlyCreatedSessionId) => {
        return sessions[recentlyCreatedSessionId];
    }
);
