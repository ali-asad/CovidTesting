import React from 'react';

import { ScheduleProvider } from '../provider';
import Steps from './Steps';

function Schedule() {
  return (
    <ScheduleProvider>
      <Steps />
    </ScheduleProvider>
  );
}

export default Schedule;
