import * as functions from 'firebase-functions';

const config = {
  qbenchUrl: functions.config().qbench.url,
  collections: {
    appointments: 'appointments'
  },
  fromEmail: 'test@schedulecovidtesting.com',
  schedule: {
    startTime: '6:00a',
    endTime: '2:00p',
    periodDuration: 30,
  },
  dateFormat: 'LL/dd/yyyy',
  dateTimeFormat: 'LL/dd/yyyy hh:mm a',
};

export { config };