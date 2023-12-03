import { FieldType, TestState } from './dictionaries';

export interface AnyObject {
  [key: string]: any;
}

export interface Location {
  name: string;
  address1: string;
  address2: string;
  qbenchCustomerId: number;
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

export interface Period {
  label: string;
  startTime: Date;
  available: number;
  index: number;
}

export interface Slot {
  date: string;
  period: number;
  locationId: number;
}

export interface AppointmentsListParams {
  date: string;
  locationQbenchId: number;
}

export interface Minor {
  firstName: string;
  lastName: string;
  birthDate: string | null;
  relationship: string;
}

export interface StepsState {
  form: Form;
  showChangeLocationModal: boolean;
  prices: {
    standard: number;
    expedited: number;
  };
  step: number;
  configured: boolean;
}

export interface Value {
  value: string;
  label: string;
}

export interface Test {
  X_REVIEWED_BY: {
    id: string;
    text: string;
  };
  complete_date: string;
  start_date: string;
  results: 'DETECTED' | 'NOT DETECTED' | null;
  state: TestState;
  assay: {
    method: string;
  };
}

export interface Sample {
  id: string;
  X_ASSIGNING_AUTHORITY: string;
  X_EXTERNAL_ACCESSION_ID: string;
  X_PATIENT_FIRST_NAME: string;
  X_PATIENT_LAST_NAME: string;
  X_PATIENT_EXTERNAL_ID: string;
  X_PATIENT_DOB: string;
  accessioning_type: {
    id: number;
    value: string;
  };
  tests: Test[];
  time_of_collection: string;
}

export interface QbenchOrderResponse {
  id: number;
  custom_formatted_id: string;
  X_SPECIMEN_COUNT: string;
  samples: Sample[];
}

export interface Result {
  confirmationId: string;
  testResult: string;
  testMethod: string;
  sampleType: string;
  patientName: string;
  patientDOB: string;
  collectionDate: string;
  collectionLocation: Location | null;
  provider: string;
  reviewedBy: string;
  qbenchId: string;
  completeDate: string;
  specimenCount: string;
  patientId: string;
  sampleId: string;
  accessionId: string;
  technician: string;
}

export interface AppointmentListItem {
  id: string;
  period: number | null;
  firstName: string;
  lastName: string;
  birthDate: string | null;
  phone: string | null;
  departureDateAndTime: string | null;
  symptoms: string[];
  hadContact: boolean | null;
  results: string | null;
  confirmationId?: string;
  email: string;
  sampleId: string;
}

export interface Comparables {
  [name: string]: {
    type: FieldType;
    data?: AnyObject; // this potentially contain any data needed for comparison
  };
}
