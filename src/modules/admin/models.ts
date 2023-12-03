import { User } from 'firebase';
import { AnyObject, Location } from '../shared/models';

import { TestState, SortByDirection, FieldType } from './dictionaries';

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

export interface AppointmentsListParams {
  date: string;
  locationQbenchId: number;
}

export interface AppointmentsListSearch {
  firstName: string;
  lastName: string;
  confirmationId: string;
  phoneNumber: string;
  dateOfBirth: string;
  email: string;
}

export interface AdminState {
  params: AppointmentsListParams;
  appointments: AppointmentListItem[] | null;
  sortBy: string | null;
  sortByDirection: SortByDirection;
  user: User | null;
  configured: boolean;
  searchQuery: AppointmentsListSearch;
}

export interface AdminDispatch {
  updateParams: (params: Partial<AppointmentsListParams>) => void;
  sortTable: (sortBy: keyof AppointmentListItem) => void;
  setAppointments: (appointments: AppointmentListItem[]) => void;
  setUser: (user: User | null) => void;
  searchTable: (searchQuery: Partial<AppointmentsListSearch>) => void;
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
