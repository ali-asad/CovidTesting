import React, { useState } from 'react';

import { useManageDispatch, useManageState } from '../provider';
import { rescheduleAppointment } from '../api';

import Schedule from '../../shared/components/Schedule';
import { ManagePage } from '../dictionaries';

const Reschedule: React.FC = () => {
  const { appointment } = useManageState();
  const { updateAppointment, goToPage } = useManageDispatch();
  const [loading, setLoading] = useState();

  if (!appointment) {
    return null;
  }

  return (
    <Schedule
      title="Reschedule Your Appointment: Pick a date and time"
      onSchedule={async () => {
        setLoading(true);

        try {
          await rescheduleAppointment(appointment);
          goToPage(ManagePage.RescheduleConfirm);
        } catch (e) {
          setLoading(false);
        }
      }}
      onFieldUpdate={(update) =>
        updateAppointment({ ...appointment, ...update })
      }
      appointment={appointment}
      confirmBtnText="Confirm Reschedule"
      loading={loading}
    />
  );
};

export default Reschedule;
