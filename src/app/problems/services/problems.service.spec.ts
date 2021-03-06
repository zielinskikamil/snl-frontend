import { ProblemsService } from './problems.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppConfig } from '../../app.config';

const mockedAppConfig = { getApiUrl: () => 'https://google.co.uk' };

let problemsService: ProblemsService;
let httpMock: HttpTestingController;

const getProblemsResponse = [
    {
        id: '20c5aeb8e0317abc02a3c4bde7f04cb2',
        type: 'Listing_policy_violation',
        message: 'Listing request target schedule to date is 4 weeks or nearer from today and it has not been listed yet',
        severity: 'Warn',
        references: [
            {
                id: null,
                entity: 'hearingpart',
                description: 'Duration: PT0S, Case type: FTRACK, Scheduled start: 28/06/2018 22:00, ' +
                'Scheduled end: 28/06/2018 22:00, Created at: 2018-06-29T13:58:10.859Z',
                entity_id: '77484e87-d0aa-4de5-82bd-5eb4de2b6983',
                problem_id: null
            }
        ]
    },
    {
        id: 'f25a6ec7-670a-4d89-ad46-567ef96425e3',
        type: 'Listing_policy_violation',
        message: 'Listing request target schedule to date is 4 weeks or nearer from today and it has not been listed yet',
        severity: 'Warn',
        references: [
            {
                id: null,
                entity: 'hearingpart',
                description: 'Duration: PT0S, Case type: FTRACK, Scheduled start: 28/06/2018 22:00, ' +
                'Scheduled end: 28/06/2018 22:00, Created at: 2018-06-29T13:58:10.859Z',
                entity_id: '77484e87-d0aa-4de5-82bd-5eb4de2b6983',
                problem_id: null
            }
        ]
    }
];

const normalizedGetProblemsResponse = {
    entities: {
        problems: {
            '20c5aeb8e0317abc02a3c4bde7f04cb2' : {
                id: '20c5aeb8e0317abc02a3c4bde7f04cb2',
                type: 'Listing_policy_violation',
                message: 'Listing request target schedule to date is 4 weeks or nearer from today and it has not been listed yet',
                severity: 'Warn',
                references: [{
                    id: null,
                    entity: 'hearingpart',
                    description: 'Duration: PT0S, Case type: FTRACK, Scheduled start: 28/06/2018 22:00, ' +
                    'Scheduled end: 28/06/2018 22:00, Created at: 2018-06-29T13:58:10.859Z',
                    entity_id: '77484e87-d0aa-4de5-82bd-5eb4de2b6983',
                    problem_id: null
                }]
            },
            'f25a6ec7-670a-4d89-ad46-567ef96425e3' : {
                id: 'f25a6ec7-670a-4d89-ad46-567ef96425e3',
                type: 'Listing_policy_violation',
                message: 'Listing request target schedule to date is 4 weeks or nearer from today and it has not been listed yet',
                severity: 'Warn',
                references: [
                    {
                        id: null,
                        entity: 'hearingpart',
                        description: 'Duration: PT0S, Case type: FTRACK, Scheduled start: 28/06/2018 22:00, ' +
                        'Scheduled end: 28/06/2018 22:00, Created at: 2018-06-29T13:58:10.859Z',
                        entity_id: '77484e87-d0aa-4de5-82bd-5eb4de2b6983',
                        problem_id: null
                    }
                ]
            }
        }
    },
    result: [
        '20c5aeb8e0317abc02a3c4bde7f04cb2',
        'f25a6ec7-670a-4d89-ad46-567ef96425e3'
    ]
};

describe('ProblemsService', () => {
    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ProblemsService,
                { provide: AppConfig, useValue: mockedAppConfig }
            ]
        });
        problemsService = TestBed.get(ProblemsService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('getProblems', () => {
        const expectedUrl = `${mockedAppConfig.getApiUrl()}/problems`;

        it('should call proper url', () => {
            problemsService.get().subscribe();
            httpMock.expectOne(expectedUrl).flush(getProblemsResponse);
        });

        it('should normalize data properly', () => {
            problemsService
                .get()
                .subscribe(data => {
                    expect(data).toEqual(normalizedGetProblemsResponse)
                });

            httpMock.expectOne(expectedUrl).flush(getProblemsResponse);
        });
    });

    describe('getForTransaction', () => {
        const expectedUrl = `${mockedAppConfig.getApiUrl()}/problems/by-user-transaction-id?id=1234`;

        it('should call proper url with id', () => {
            problemsService.getForTransaction('1234').subscribe();
            httpMock.expectOne(expectedUrl).flush(getProblemsResponse);
        });

        it('should normalize data properly', () => {
            problemsService
                .getForTransaction('1234')
                .subscribe(data => expect(data).toEqual(normalizedGetProblemsResponse));
            httpMock.expectOne(expectedUrl).flush(getProblemsResponse);
        });
    })
});
