import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ProblemsService } from '../services/problems.service';
import { Get, GetComplete, GetFailed, ProblemActionTypes } from '../actions/problem.action';

@Injectable()
export class ProblemEffects {
    @Effect()
    search$: Observable<Action> = this.actions$.pipe(
        ofType<Get>(ProblemActionTypes.Get),
        mergeMap(action =>
            this.problemsService.get().pipe(
                map(data => (new GetComplete(data))),
                catchError((err: HttpErrorResponse) => of(new GetFailed(err.error)))
            )
        )
    );

    constructor(private problemsService: ProblemsService, private actions$: Actions) {}
}