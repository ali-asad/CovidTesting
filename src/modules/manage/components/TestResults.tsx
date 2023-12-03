import React, { useState } from 'react';
import styled from 'styled-components';

import {
  Container,
  Content,
  PageHeader,
  PageTitle,
} from '../../shared/components/styled';
import { useManageState } from '../provider';
import { colors } from '../../../styles/colors';
import { Button } from '../../shared/components/styled';
import { Breakpoints } from '../../../dictionaries';
import { downloadResultsPDF } from '../../admin/api';

const ResultWrapper = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const ConfirmationNumber = styled.p`
  display: block;
  text-align: center;
  margin: 10px 0 0;
`;

const ResultValue = styled.div`
  font-size: 45px;
  font-weight: 600;
  margin-bottom: 25px;
  text-transform: uppercase;
  text-align: center;
  color: ${({ value }: { value: string }) =>
    value === 'POSITIVE' ? colors.red : colors.green};
`;

const Disclaimer = styled.div`
  max-width: 540px;
  margin: 0 auto 55px;
`;

const Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 905px;
  margin: 0 -3px 60px;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  text-align: left;
  width: 100%;
  background: ${colors.blue8};
  margin: 2px;

  @media (min-width: ${Breakpoints.sm}px) {
    width: 49%;
  }

  strong {
    display: block;
  }
`;

const SaveAsPDFButton = styled(Button)`
  width: 100%;
  margin: 0 auto 25px;

  @media (min-width: ${Breakpoints.md}px) {
    width: 535px;
  }
`;

const TestResults: React.FC = () => {
  const { results } = useManageState();
  const [saving, setSaving] = useState(false);

  return (
    <Container size="md">
      <Content>
        {(results || []).map((result, i) => (
          <ResultWrapper key={i}>
            <PageHeader>
              <PageTitle textAlign="center">
                Your COVID-19 Test Result
              </PageTitle>
              <ConfirmationNumber>
                Order ID: {result.confirmationId}
              </ConfirmationNumber>
            </PageHeader>
            <ResultValue value={result.testResult}>
              {result.testResult}
            </ResultValue>
            <Disclaimer>
              A negative result for this test means that SARS-CoV-2 RNA (the
              cause of COVID-19) was not detected in the collected sample.
            </Disclaimer>
            <Details>
              <Detail>
                <strong>Patient’s Name</strong>
                {result.patientName}
              </Detail>
              <Detail>
                <strong>Collection Date</strong>
                {result.collectionDate}
              </Detail>
              <Detail>
                <strong>Patient’s Date of Birth</strong>
                {result.patientDOB}
              </Detail>
              {result.collectionLocation && (
                <Detail>
                  <strong>Collection Location</strong>
                  {result.collectionLocation.address1}{' '}
                  {result.collectionLocation.address2}
                </Detail>
              )}
              <Detail>
                <strong>Test Type</strong>
                {result.testMethod}
              </Detail>
              <Detail>
                <strong>Provider</strong>
                {result.provider}
                <br />
                <br />
                <strong>Reviewed by</strong>
                {result.reviewedBy}
              </Detail>
            </Details>
            <SaveAsPDFButton
              type="button"
              libraryType="primary"
              onClick={async () => {
                setSaving(true);

                try {
                  await downloadResultsPDF(result.sampleId);
                } catch (e) {
                  console.error(e);
                }

                setSaving(false);
              }}
            >
              {saving ? 'Saving...' : 'Save as PDF'}
            </SaveAsPDFButton>
            <p>Download as PDF now to save a copy of your test result.</p>
          </ResultWrapper>
        ))}
      </Content>
    </Container>
  );
};

export default TestResults;
