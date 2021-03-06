import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Judge } from '../../../judges/models/judge.model';
import { Room } from '../../../rooms/models/room.model';
import { SessionFilters } from '../../models/session-filter.model';
import * as moment from 'moment'

@Component({
  selector: 'app-sessions-filter',
  templateUrl: './sessions-filter.component.html',
  styleUrls: ['./sessions-filter.component.scss']
})
export class SessionsFilterComponent implements OnInit {

  @Output() filter = new EventEmitter();

  @Input() rooms: Room[];
  @Input() judges: Judge[];
  @Input() startDate: moment.Moment;
  @Input() endDate: moment.Moment;
  roomsPlaceholder: string;
  judgesPlaceholder: string;
  filters: SessionFilters;
  caseTypes;

  constructor() {
      this.caseTypes = ['SCLAIMS', 'FTRACK', 'MTRACK'];
      this.roomsPlaceholder = 'Select the room';
      this.judgesPlaceholder = 'Select the judge';
  }

  ngOnInit() {
      this.filters = {
          caseTypes: [],
          rooms: [],
          judges: [],
          startDate: this.startDate,
          endDate: this.endDate,
          utilization: {
              unlisted: {
                  active: false,
                  from: 0,
                  to: 0
              },
              partListed: {
                  active: false,
                  from: 1,
                  to: 99
              },
              fullyListed: {
                  active: false,
                  from: 100,
                  to: 100
              },
              overListed: {
                  active: false,
                  from: 101,
                  to: Infinity
              },
              custom: {
                  active: false,
                  from: 0,
                  to: 0
              }
          }
      } as SessionFilters;
  }

  sendFilter() {
    this.filter.emit(this.filters);
  }
}
