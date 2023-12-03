import { firebase } from '../../firebase';
import { AppointmentsListParams } from './models';

export const signIn = async (email: string, password: string) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const signOut = async () => firebase.auth().signOut();

export const getAppointmentsByDate = async (params: AppointmentsListParams) =>
  firebase.functions().httpsCallable('getAppointmentsByDate')(params);

export const sendConfirmationEmail = async (emails: string[]) =>
  firebase.functions().httpsCallable('sendConfirmationEmail')(emails);

export const downloadResultsPDF = async (sampleId: string) => {
  const { data } = await firebase
    .functions()
    .httpsCallable('getResultsPDFDownloadLink')(sampleId);

  if (data?.url) {
    window.open(data?.url, '_blank');
  }
};
