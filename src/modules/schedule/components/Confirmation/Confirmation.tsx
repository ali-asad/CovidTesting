import React, { useMemo, useRef } from 'react';
import styled from 'styled-components';
import { useReactToPrint } from 'react-to-print';
import { PDFDownloadLink } from '@react-pdf/renderer';

import {
  Container,
  Content,
  PageHeader,
  PageTitle,
  Button,
} from '../../../shared/components/styled';
import { useStepsState } from '../../provider';
import { Breakpoints } from '../../../../dictionaries';
import { colors } from '../../../../styles/colors';
import PrintableConfirmation from './PrintableConfirmation';
import DownloadableConfirmation from './DownloadableConfirmation';
import { getPeriodsFromSchedule } from '../../../../utils';
import { config } from '../../../../config';

const Wrap = styled.div`
  background: ${colors.blue8};
  margin-bottom: -15px 0 33px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  & > * {
    margin: 15px 0;
  }

  @media (min-width: ${Breakpoints.sm}px) {
    flex-direction: row;
    margin: -10px 0 30px;

    & > * {
      margin: 0 10px;
    }
  }

  @media (min-width: ${Breakpoints.md}px) {
    padding: 46px 34px;
  }
`;

export const ConfirmationNumber = styled.div`
  text-align: center;

  @media (min-width: ${Breakpoints.sm}px) {
    text-align: left;
  }
  
  @media print {
    text-align: left;    
  }

  strong {
    display: block;
    font-size: 28px;
    font-weight: bold;
    margin-top: 6px;

    @media (min-width: ${Breakpoints.md}px) {
      font-size: 30px;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  margin: -5px 0;

  & > * {
    margin: 5px 0;
  }
`;

const Text = styled.p``;

const Confirmation: React.FC = () => {
  const { form } = useStepsState();
  const printableRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printableRef.current,
  });
  const periods = useMemo(() => getPeriodsFromSchedule(config.schedule), []);

  return (
    <Container size="xl">
      <Content>
        <PageHeader>
          <PageTitle>
            Your appointment is confirmed.
            <br />
            Don’t forget to download your appointment details.
          </PageTitle>
        </PageHeader>
        <Wrap>
          <PrintableConfirmation
            ref={printableRef}
            form={form}
            periods={periods}
          />
          <Buttons>
            <PDFDownloadLink
              document={
                <DownloadableConfirmation form={form} periods={periods} />
              }
              fileName="worksite-labs-confirmation.pdf"
            >
              {({ loading }) => (
                <Button
                  type="button"
                  size="sm"
                  libraryType="default"
                  accentColor={colors.darkBlue}
                  disabled={loading}
                >
                  Download
                </Button>
              )}
            </PDFDownloadLink>
            <Button
              type="button"
              onClick={handlePrint}
              size="sm"
              libraryType="default"
              accentColor={colors.darkBlue}
            >
              Print
            </Button>
          </Buttons>
        </Wrap>
        <Text>
          Please remember to bring your ID and your confirmation number to your
          appointment.
        </Text>
      </Content>
    </Container>
  );
};

export default Confirmation;
