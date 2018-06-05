import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from 'ng-fullcalendar';
import { CalendarContainerComponent } from './callendar/containers/calendar-container.component';
import { CallendarComponent } from './callendar/components/callendar.component';
import { DurationAsMinutesPipe } from './pipes/duration-as-minutes.pipe';

export const COMPONENTS = [
    CalendarContainerComponent,
    CallendarComponent,
    DurationAsMinutesPipe
];

@NgModule({
    imports: [
        CommonModule,
        FullCalendarModule,

    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
    providers: []
})
export class CoreModule {
}