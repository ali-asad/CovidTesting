import { format } from 'date-fns';
import { config } from '../../config';
import { parseSnapshot } from '../../utils';
import { firebase } from '../../firebase';
import { Appointment } from '../shared/models';

export const getAppointmentByPhoneAndDate = (phone: string, date: Date) =>
  firebase
    .firestore()
    .collection(config.firestoreCollections.appointments)
    .where('phone', '==', phone.replace(/[^0-9]+/g, ''))
    .where('birthDate', '==', format(date, config.dateFormat))
    .get()
    .then(parseSnapshot);

export const getQbenchOrderById = async (id: string) =>
  firebase.functions().httpsCallable('getQbenchOrderById')(id);

export const rescheduleAppointment = async (appointment: Appointment) =>
  firebase.functions().httpsCallable('rescheduleAppointment')(appointment);
