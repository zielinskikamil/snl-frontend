import * as moment from 'moment'
import { Session } from '../../sessions/models/session.model';

export interface HearingPartViewmodel {
    id: string;
    session: Session;
    caseNumber: string;
    caseTitle: string;
    caseType: string;
    hearingType: string
    duration: moment.Duration
    scheduleStart: Date;
    scheduleEnd: Date;
}
