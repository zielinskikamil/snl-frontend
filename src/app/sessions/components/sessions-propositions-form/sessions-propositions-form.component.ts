import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Judge } from '../../../judges/models/judge.model';
import { Room } from '../../../rooms/models/room.model';
import { SessionPropositionQuery } from '../../models/session-proposition-query.model';
import * as moment from 'moment'

@Component({
    selector: 'app-sessions-propositions-form',
    templateUrl: './sessions-propositions-form.component.html',
    styleUrls: ['./sessions-propositions-form.component.scss']
})
export class SessionsPropositionsFormComponent implements OnInit {

    searchParams = {
        from: moment(),
        to:  moment(),
        durationInMinutes: 1,
        roomId: null,
        judgeId: null
    } as SessionPropositionQuery;
    roomsPlaceholder: string;
    judgesPlaceholder: string;

    minStartDate =  moment();
    get minEndDate(): moment.Moment {
        if ( moment(this.searchParams.from).isAfter(moment(this.minStartDate)) ) {
            return this.searchParams.from;
        } else {
            return this.minStartDate;
        }
    }

    @Input() judges: Judge[];
    @Input() rooms: Room[];

    @Output() searchProposition = new EventEmitter();

    constructor() {
        this.roomsPlaceholder = 'No room';
        this.judgesPlaceholder = 'No judge';
    }

    ngOnInit() {
        this.search();
    }

    search() {
        this.searchProposition.emit(this.searchParams);
    }

}
