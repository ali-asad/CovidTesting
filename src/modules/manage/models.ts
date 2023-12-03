import { Appointment } from '../shared/models';
import { Result } from '../admin/models';
import { ManagePage } from './dictionaries';

export interface ManageState {
  currentPage: ManagePage;
  results: Result[] | null;
  appointment: Appointment | null;
}

export interface ManageDispatch {
  goToPage: (newPage: ManagePage) => void;
  updateAppointment: (appointment: Appointment) => void;
  updateResults: (results: Result[]) => void;
}
