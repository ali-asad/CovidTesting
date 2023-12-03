import * as twilio from 'twilio';
import * as functions from 'firebase-functions';

function prepareNumber(number: string): string {
  return `+1${number.replace(/[^0-9]/g, '')}`;
}

const client = twilio(
  functions.config().twilio.sid,
  functions.config().twilio.token
);

const sendTextMessage = async (to: string, body: string) => {
  return client.messages.create({
    from: functions.config().twilio.messaging_service_sid,
    to: prepareNumber(to),
    body,
  });
};

export default { sendTextMessage };
