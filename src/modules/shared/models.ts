import { firebase } from '../../firebase';

export interface AnyObject {
  [key: string]: any;
}

export interface Slot {
  date: string;
  period: number;
  locationId: number;
}

export interface Minor {
  firstName: string;
  lastName: string;
  birthDate: string | null;
  relationship: string;
}

export interface Location {
  name: string;
  address1: string;
  address2: string;
  qbenchCustomerId: number;
  startDate: string;
  hasVipSlots: boolean;
}

export interface FirebaseLocation extends Omit<Location, 'startDate'> {
  startDate: firebase.firestore.Timestamp;
}

export interface Appointment {
  id: string;
  sendMessagesAboutTestResults: boolean;
  location: Location | null;
  date: string | null;
  slot: Slot | null;
  address: {
    zipCode: string;
    address: string;
    city: string;
    state: string;
  };
  firstName: string;
  lastName: string;
  birthDate: string | null;
  email: string;
  phone: string;
  minors: Minor[];
  hasSymptoms: boolean | null;
  symptoms: string[];
  hasConditions: boolean | null;
  hadContact: boolean | null;
  sex: string | null;
  race: string | null;
  ethnicity: string | null;
  departureDateAndTime: string | null;
  isExpressSameDayTest: boolean;
  paymentIntentId?: string;
  confirmationId?: string;
  qbenchId?: string;
}

export interface Form extends Appointment {
  hipaaConfirmed: boolean;
  consentForTesting: boolean;
  commitToAttend: boolean;
  agreeToCancel: boolean;
  confirmationId: string;
  confirmEmail: string;
}

export interface Value {
  value: string;
  label: string;
}

export interface SharedState {
  locations: Location[] | null;
}

export interface SharedDispatch {
  getLocations: () => void;
}
