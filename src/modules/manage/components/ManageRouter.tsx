import React from 'react';

import { useManageState } from '../provider';
import { ManagePage } from '../dictionaries';
import { Wrapper } from '../../shared/components/styled';

import Header from '../../shared/components/Header';
import VerifyIdentity from './VerifyIdentity';
import YourTestingInformation from './YourTestingInformation';
import Cancel from './Cancel';
import CancelConfirm from './CancelConfirm';
import Reschedule from './Reschedule';
import TestResults from './TestResults';
import RescheduleConfirm from './RescheduleConfirm';
import Footer from '../../shared/components/Footer';

const pages = {
  [ManagePage.VerifyIdentity]: VerifyIdentity,
  [ManagePage.TestingInfo]: YourTestingInformation,
  [ManagePage.Cancel]: Cancel,
  [ManagePage.CancelConfirm]: CancelConfirm,
  [ManagePage.Reschedule]: Reschedule,
  [ManagePage.TestResults]: TestResults,
  [ManagePage.RescheduleConfirm]: RescheduleConfirm,
};

function ManageRouter() {
  const { currentPage } = useManageState();

  const Page = pages[currentPage] || null;

  return (
    <Wrapper>
      <Header />
      <div>
        <Page />
      </div>
      <Footer />
    </Wrapper>
  );
}

export default ManageRouter;
