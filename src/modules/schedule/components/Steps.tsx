import React from 'react';

import { useStepsState } from '../provider';
import { useSharedState } from '../../shared/provider';
import { Wrapper } from '../../shared/components/styled';

import Loader from '../../shared/components/Loader';
import Header from '../../shared/components/Header';
import Start from './Start';
import Phone from './Phone';
import Email from './Email';
import Location from './Location';
import DateAndTime from './DateAndTime';
import Address from './Address/Address';
import PersonalInformation from './PersonalInformation/PersonalInformation';
import Symptoms from './Symptoms/Symptoms';
import Conditions from './Conditions';
import CovidContact from './CovidContact';
import Demographics from './Demographics';
import Consent from './Consent/Consent';
import ConfirmAndPay from './ConfirmAndPay/ConfirmAndPay';
import Confirmation from './Confirmation/Confirmation';
import Footer from '../../shared/components/Footer';

export const steps = [
  Start,
  Phone,
  Email,
  Location,
  PersonalInformation,
  Address,
  DateAndTime,
  Symptoms,
  Conditions,
  CovidContact,
  Demographics,
  Consent,
  ConfirmAndPay,
  Confirmation,
];

function Steps() {
  const { step, configured } = useStepsState();
  const { locations } = useSharedState();

  if (!configured || locations === null) {
    return <Loader />;
  }

  const CurrentStep = steps[step];

  return (
    <Wrapper>
      {step !== 0 && <Header />}
      <div>
        <CurrentStep />
      </div>
      <Footer />
    </Wrapper>
  );
}

export default Steps;
