import { AnyObject, Form } from '../shared/models';

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

export interface Minor {
  firstName: string;
  lastName: string;
  birthDate: string | null;
  relationship: string;
}

export interface Period {
  label: string;
  startTime: Date;
  available: number;
  index: number;
}

export interface ScheduleState {
  form: Form;
  showChangeLocationModal: boolean;
  prices: {
    standard: number;
    expedited: number;
  };
  step: number;
  configured: boolean;
}

export interface ScheduleDispatch {
  goToNextStep: () => void;
  goToPrevStep: () => void;
  updateFormValues: (update: AnyObject) => void;
  toggleChangeLocationModal: (show: boolean) => void;
}