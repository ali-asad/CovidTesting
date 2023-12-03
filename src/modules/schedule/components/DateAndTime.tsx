import React from 'react';
import { format } from 'date-fns';

import { useStepsState, useStepsDispatch } from '../provider';
import { config } from '../../../config';

import Schedule from '../../shared/components/Schedule';

const DateAndTime: React.FC = () => {
  const { form } = useStepsState();
  const {
    toggleChangeLocationModal,
    updateFormValues,
    goToNextStep,
  } = useStepsDispatch();

  return (
    <Schedule
      appointment={form}
      title="Pick a date and time"
      onFieldUpdate={(update) => updateFormValues(update)}
      onSchedule={(values) => {
        updateFormValues({
          ...values,
          departureDateAndTime: format(
            values.departureDateAndTime,
            config.dateTimeFormat
          ),
        });
        goToNextStep();
      }}
      onLocationChange={() => toggleChangeLocationModal(true)}
    />
  );
};

export default DateAndTime;
