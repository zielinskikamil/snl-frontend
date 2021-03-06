import { CoreNotification } from '../../features/notification/model/core-notification';

export const SESSION_CREATED = {
    message: 'Session processing done!',
    duration: 3000
} as CoreNotification;

export const SESSION_CREATION_FAILED = {
    message: 'Session creation failed!',
    duration: 3000
} as CoreNotification;

export const SESSION_CREATION_IN_PROGRESS = {
    message: 'Creating the session...',
    duration: 5000
} as CoreNotification;

export const SESSION_CREATING_ACKNOWDLEDGE = {
    message: 'Creating session acknowledged. Processing...',
    duration: 5000
} as CoreNotification;

export const SESSION_UPDATED = {
    message: 'Session updated!',
    duration: 5000
} as CoreNotification;
