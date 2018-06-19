import { Injectable } from '@angular/core';
import { SessionCreate } from '../models/session-create.model';
import * as SessionCreationActions from '../actions/session-transaction.action';
import { SessionTransaction } from '../models/session-transaction-status.model';
import * as SessionActions from '../actions/session.action';
import * as ProblemsActions from '../../problems/actions/problem.action';
import { Store } from '@ngrx/store';
import { State } from '../../app.state';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SessionsCreationService {
    constructor(private store: Store<State>) {
    }

    create(session: SessionCreate) {
        let transactionId = uuid();

        session.userTransactionId = transactionId;
        let transaction = this.createTransaction(session.id, transactionId);

        this.store.dispatch(new SessionCreationActions.InitializeTransaction(transaction));
        this.store.dispatch(new SessionActions.Create(session));
        this.store.dispatch(new ProblemsActions.RemoveAll());
    }

    update(session: any) {
        let transactionId = uuid();

        session.userTransactionId = transactionId;
        let transaction = this.createTransaction(session.id, transactionId);

        this.store.dispatch(new SessionCreationActions.InitializeTransaction(transaction));
        this.store.dispatch(new SessionActions.Update(session));
        this.store.dispatch(new ProblemsActions.RemoveAll());
    }

    private createTransaction(sessionId, transactionId): SessionTransaction {
        return {
            entityId: sessionId,
            id: transactionId
        } as SessionTransaction;
    }
}
