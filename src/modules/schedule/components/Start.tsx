import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/colors';
import { useStepsDispatch, useStepsState } from '../provider';
import { Breakpoints } from '../../../dictionaries';
import { Container, Content, PageTitle, PageHeader } from '../../shared/components/styled';
import step1HeaderBG from '../../../assets/step-1-header-bg.jpg';

import Header from '../../shared/components/Header';
import Collapsible from '../../shared/components/Collapsible';

const ExtendedHeaderWrapper = styled.div`
  background-image: linear-gradient(
      90.13deg,
      rgba(24, 106, 157, 0.7) 0.18%,
      rgba(25, 148, 217, 0.7) 99.96%
    ),
    url(${step1HeaderBG});
  background-size: cover, cover;
`;

const ExtendedHeaderContent = styled.div`
  color: ${colors.white};
  padding: 30px 0 60px;

  @media (min-width: ${Breakpoints.md}px) {
    padding: 55px 0 78px;
  }
`;

const Headline = styled.h1`
  font-size: 36px;
  line-height: 44px;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 14px;
`;

const Disclaimer = styled.div`
  font-size: 14px;
  margin-bottom: 35px;
  font-style: italic;
`;

const AdditionalContent = styled.div`
  margin-bottom: 40px;

  ul {
    margin-top: 10px;
  }
`;

const CTAButton = styled.button`
  display: block;
  width: 100%;
  color: ${colors.white};
  text-align: center;
  padding: 15px;
  background: ${colors.green};
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
  border: 0;
  font-size: 20px;
  line-height: 36px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
`;

const Start: React.FC = () => {
  const { goToNextStep } = useStepsDispatch();
  const { prices } = useStepsState();

  return (
    <>
      <ExtendedHeaderWrapper>
        <Header withoutBg />
        <Container size="md">
          <ExtendedHeaderContent>
            <Headline>Get COVID-19 Testing</Headline>
            <Description>
              Worksite Labs is providing COVID-19 testing at multiple locations.
              The tests provided through this program are polymerase chain
              reaction (PCR) nasal swab tests that do not require assistance.
              All customers must be scheduled no later than 72 hours before the
              departure of the last leg of the journey. Testing is available to
              all customers, regardless of symptoms. The price per test is $
              {prices.standard}*.
            </Description>
            <Disclaimer>
              * For an extra fee there are limited number of VIP slots available
              to test the same day as the flight and receive results within a
              day.
            </Disclaimer>
            <CTAButton
              type="button"
              onClick={() => {
                goToNextStep();
              }}
            >
              Book Appointment Now
            </CTAButton>
          </ExtendedHeaderContent>
        </Container>
      </ExtendedHeaderWrapper>
      <Container size="md">
        <Content>
          <AdditionalContent>
            The State of Hawaii Pre-Travel Testing Program requires passengers
            five and older to take a Nucleic Acid Amplification Test (NAAT) from
            a Clinical Laboratory Improvement Amendments (CLIA) certified
            laboratory within 72 hours from the final leg of departure and
            produce a negative result in order to proceed without the state’s
            14-day mandatory quarantine. A trained professional must observe all
            tests. The tests provided by Worksite Labs, in partnership with
            Hawaiian Airlines meet these requirements and are an accepted
            Trusted Testing and Travel Partner from the State of Hawaii.
            <br />
            <br />
            Please see the following links for more information:
            <ul>
              <li>
                <a
                  href="https://www.cdc.gov/coronavirus/2019-ncov/travelers/travel-during-covid19.html"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Travel During the COVID-19 Pandemic
                </a>
              </li>
              <li>
                <a
                  href="https://www.cdc.gov/coronavirus/2019-ncov/travelers/faqs.html"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Travel: Frequently Asked Questions and Answers
                </a>
              </li>
            </ul>
          </AdditionalContent>
          <PageHeader>
            <PageTitle>Frequently Asked Questions</PageTitle>
          </PageHeader>
          <Collapsible
            title=" What kind of test is being offered?"
            content={
              <>
                We use an optimized droplet digital PCR (ddPCR) test for
                detection of SARS-CoV-2, the virus that causes COVID-19, for the
                purposes of meeting the requirements of the State of Hawaii’s
                Pre-Travel Testing Program. The test is a self-administered
                nasal swab test that can be completed in as little as 30
                seconds. Collection of mid-turbinate swabs are less invasive and
                generally more comfortable for customers, can be self-collected
                by customers and they can decrease the risk of exposure to
                health care providers by (1) reducing the duration of the
                procedure, and (2) allowing the passenger to perform
                self-collection while under supervision. Here is a short video
                to help you prepare for how to collect the sample:{' '}
                <a
                  href="https://www.youtube.com/watch?v=jIPRH-_KRDQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Youtube Link Here
                </a>
                .
                <br />
                <br />
                Please see the links for more information:
                <ul>
                  <li>
                    <a
                      href="https://www.fda.gov/medical-devices/letters-health-care-providers/recommendations-providing-clear-instructions-patients-who-self-collect-anterior-nares-nasal-sample"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      FDA Self-Collection Fact Sheet
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://static1.squarespace.com/static/5e5bf0ddcfcf1b485aebbaf6/t/5f4fbf2a3fcde16f12054b1d/1599061822831/Lowernasalswab.pdf"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      FDA Approved Instruction for Use for Self-Collection
                    </a>
                  </li>
                </ul>
              </>
            }
          />
          <Collapsible
            title="When and how will I receive my test results?"
            content={
              <>
                It is very important that you provide accurate and complete
                information when registering, because this is what is used to
                contact you for your results. Results will be sent to the email
                you provide followed by a text notification to let you know that
                your results were emailed. Test results will arrive within 36
                hours from the time Worksite Labs receives your sample.
              </>
            }
          />
          <Collapsible
            title="How far in advance should I get tested?"
            content={
              <>
                Under the State of Hawaii Pre-Travel Testing Program travelers
                will have to test negative for COVID-19 no more than 72 hours
                before arrival in Hawaii to qualify for the quarantine
                exemption. Therefore, you need to schedule a test no sooner than
                3 days prior to your arrival in Hawaii to be within the 72-hour
                window. We recommend scheduling your test between 1-2 days in
                advance of the arrival time of your flight. There is also a
                same-day express option for an extra cost, but spaces are
                limited and restrictions apply.
                <br />
                <br />
                Follow these links for more details on the pre-testing rules:
                <ul>
                  <li>
                    <a
                      href="https://governor.hawaii.gov/wp-content/uploads/2020/09/Pre-Travel-Test-or-Quarantine-Flowchart.pdf"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Pre-Travel-Test-or-Quarantine-Flowchart
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.hawaiitourismauthority.org/covid-19-updates/"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Hawaii Tourism Authority COVID-19 Updates
                    </a>
                  </li>
                </ul>
              </>
            }
          />
          <Collapsible
            title="Can children be tested?"
            content={
              <>
                All travelers <strong>five and older</strong> are subject to the
                pre-test requirement. All of our testing sites listed offer
                testing for adults and children. A parent or guardian may
                schedule a traveler test for their child. Testing site staff may
                ask that a parent or guardian help their loved one perform the
                swabbing procedure if the child is younger than 12. Anyone age
                18 or older can create their own account and schedule their own
                appointment..
              </>
            }
          />
          <Collapsible
            title="Where are your testing locations?"
            content={
              <>
                We currently have location in San Francisco (near SFO) with
                plans to expand to additional west coast airports in the near
                future.
              </>
            }
          />
        </Content>
      </Container>
    </>
  );
};

export default Start;
