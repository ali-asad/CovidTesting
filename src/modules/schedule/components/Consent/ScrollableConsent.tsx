import React from 'react';
import styled from 'styled-components';

import Scrollbar from '../../../shared/components/Scrollbar/Scrollbar';
import { Breakpoints } from '../../../../dictionaries';

const Container = styled.div`
  height: 300px;
  
  @media (min-width: ${Breakpoints.sm}px) {
    height: 250px;
  }
`;

const Subheader = styled.h4`
  margin-bottom: 15px;
`;

const Text = styled.p`
  padding-left: 16px;
  margin-bottom: 20px;

  ul {
    margin: 20px 0 0;
    list-style: disc;
    padding-left: 19px;
    
    li {
      margin-bottom: 20px;
    }
  }
`;

const Content = styled.div`
  padding-right: 15px;
`;

const ScrollableConsent: React.FC = () => {
  return (
    <Container>
      <Scrollbar>
        <Content>
          <Subheader>
            1. Authorization and Consent for COVID-19 Diagnostic Pre-Travel
            Testing:
          </Subheader>
          <Text>
            I voluntarily consent and authorize Worksite Labs, Inc. (“WSL”), a
            clinical laboratory certified under the Clinical Laboratory
            Improvement Amendments of 1988 (CLIA) and contracted by Hawaii
            Airlines to provide exclusive COVID-19 diagnostic testing services
            for passengers traveling to the State of Hawaii. I understand that
            this COVID-19 test, and is conducted solely for the purposes of the
            Pre-Travel Testing Program implemented by the State of Hawaii for
            out-of-state individuals traveling to Hawaii and is not performed
            for any other medical purpose. I acknowledge that neither Hawaii
            Airlines nor WSL are providing any form of medical treatment related
            to COVID-19, and that I am solely responsible for seeking
            appropriate medical attention as may be indicated by the test
            results.
          </Text>
          <Text>
            By signing or clicking on ACKNOWLEDGEMENT below, I hereby give my
            consent and authorize WSL to collect my sample using a
            nasopharyngeal swab, oral swab, or other recommended collection
            procedures, in conformity with the State of Hawaii Pre-Travel
            Testing Program, and to process and analyze my sample solely for the
            detection of the COVID-19 virus. WSL will report my test result to
            me alone, and to public health authorities only as may be required
            by law. I understand that there are risks to the collection
            procedure, such as nosebleed or nasal passage soreness. The testing
            process may be unpleasant and uncomfortable. As with any diagnostic
            test, I also understand that it is possible for a test result to be
            a false negative or a false positive result, and that I may contract
            the virus after receiving a negative test result (or contract the
            virus immediately prior to submitting a sample for the test and
            before the test can detect the COVID-19 virus and thus result in a
            false negative test result). I understand that improper sample
            collection may also result in a false negative or a false positive
            test result. I understand that there are asymptomatic carriers of
            the COVID-19 virus, so I may exhibit no symptoms and yet test
            positive for COVID-19 and therefore be unable to avoid a quarantine
            upon arrival in the State of Hawaii (or, may be required to
            reschedule my travel at my own cost and expense). I understand that
            I alone am responsible for accurately and completely reporting my
            test result to the State of Hawaii, as neither Hawaiian Airlines nor
            WSL will report or verify test results self-reported by passengers
            for the State of Hawaii Pre-Travel Testing Program. I further
            understand that if I do not take the test and secure a negative test
            result, I am subject to the State of Hawaii public health quarantine
            rules in effect when I travel to Hawaii, and neither Hawaiian
            Airlines nor WSL can provide any guarantee that I will avoid a
            quarantine in the State of Hawaii. I confirm that if I do not
            execute this authorization, I will not receive any testing services
            from WSL. I understand that I may obtain COVID-19 testing from
            another laboratory or healthcare provider and that I am not required
            to obtain a COVID-19 test from WSL for the purpose of flying with
            Hawaiian Airlines. Whether I use WSL or another lab for COVID-19
            testing, or whether I do any COVID-19 testing at all, will not
            impact my ability to fly with Hawaii Airlines or my flight
            reservation with Hawaii Airlines, unless required by law,
            regulations, or airline policies. But failing to arrive at the State
            of Hawaii with a negative COVID-19 test result that meets the State
            of Hawaii requirements will likely result in a 14-day quarantine
            upon my arrival in the State of Hawaii.
          </Text>
          <Text>
            I further understand and agree to the following:
            <ul>
              <li>
                Hawaiian Airlines has contracted with WSL to provide COVID-19
                testing services for the convenience of passengers of Hawaiian
                Airlines traveling to Hawaii who voluntarily elect to do the
                testing as part of the Pre-Travel Testing Program implemented by
                the State of Hawaii. Such testing services are only available
                while the Pre-Travel Testing Program remains in effect in the
                State of Hawaii.
              </li>
              <li>
                WSL will be solely responsible for all aspects of COVID-19
                testing, including sample collection, sample processing and
                analysis, and test result reporting. WSL will bill me directly
                for the cost of such testing, and I agree to pay the cost of the
                WSL COVID-19 test by the due date specified in my invoice.
              </li>
              <li>
                WSL will provide a state-licensed healthcare provider who will
                supervise the collection of my specimen or collect my specimen
                for COVID-19 testing. I hereby authorize WSL to perform testing
                on my specimen for the COVID-19 virus only. The exact test
                method used for COVID-19 testing may vary from time to time and
                may include a nasopharyngeal swab or another method, as required
                by the State of Hawaii. I understand and accept that I may
                experience some discomfort associated with sample collection
                using a swab.
              </li>
              <li>
                I understand that Hawaiian Airlines will not receive my test
                result and is not be responsible for any aspect of the COVID-19
                testing.
              </li>
              <li>
                I have read and understand the travel restrictions currently
                imposed by the State of Hawaii, including its Safe Travels
                Online Program (see{' '}
                <a
                  href="https://www.gohawaii.com/safe-travels"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  https://www.gohawaii.com/safe-travels
                </a>{' '}
                and{' '}
                <a
                  href="https://travel.hawaii.gov/#/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  https://travel.hawaii.gov/
                </a>
                ).
              </li>
              <li>
                I understand that I am solely responsible for complying with the
                travel restrictions imposed by the State of Hawaii, including
                the mandatory 14-day quarantine for all out-of-state travelers
                unless I present proof of a negative COVID-19 test result
                processed by a CLIA certified lab taken within 72 hours of
                arrival (or the Pre-Travel Testing Program). I understand that I
                am free to use any CLIA certified lab to meet this requirement
                of the Pre-Travel Testing Program, and that I am not required to
                use WSL.
              </li>
              <li>
                By giving my authorization and consent to be tested by WSL, I
                understand that WSL will only administer a one-time COVID-19
                test for the purposes of Pre-Travel Testing Program and will not
                provide any other healthcare or medical services or any medical
                advice to me. If I have a medical question, if my condition
                worsens, or if I test positive for COVID-19, I agree to consult
                with my personal healthcare provider. I assume complete and full
                responsibility for all the actions I take with regards to my
                test result.
              </li>
              <li>
                I understand that if I travel in the future and use WSL’s
                COVID-19 testing service, I may be required to sign another
                consent and authorization form at that time.
              </li>
              <li>
                I understand that the COVID-19 testing performed by WSL is not
                done for any other medical purpose other than to test for the
                COVID-19 virus, and neither the test results nor any information
                provided to me by WSL constitutes any form of medical advice. I
                understand and agree to not use or rely upon the COVID-19
                testing provided by WSL for any medical or healthcare decision
                without first consulting with a licensed professional healthcare
                provider who is authorized to provide me healthcare services.
              </li>
              <li>
                As with any laboratory testing, I understand and accept that
                there is a risk of receiving a false positive, false negative,
                or inconclusive test result, which may impact my ability to
                bypass the 14-day quarantine under the Pre-Travel Testing
                Program.
              </li>
              <li>
                While WSL will work diligently to return its test results within
                the 72-hour window, as required by the Pre-Travel Testing
                Program, and to promptly communicate with passengers of any
                unexpected delay, there is a chance that I may not receive my
                test result in time.
              </li>
              <li>
                Neither WSL nor Hawaiian Airlines will be responsible for any
                delays or failed receipt of a test result due to reasons that
                are not directly caused by WSL or Hawaiian Airlines, such as if
                I provided an erroneous contact information, if my cellular or
                internet service fails, or if my email service fails to function
                properly.{' '}
              </li>
              <li>
                Neither WSL nor Hawaiian Airlines guarantees that I will not be
                subject to the 14-day quarantine or other restrictions mandated
                by the State of Hawaii upon arrival.
              </li>
              <li>
                Even if my test result is negative, there is a chance that the
                State of Hawaii may require that I be subject to the 14-day
                quarantine despite a negative test result if I do not meet other
                requirements of the Pre-Travel Testing Program, such as any
                temperature checks upon my arrival or the exhibition of other
                symptoms suggesting the possibility of infection.{' '}
              </li>
              <li>
                If I test positive for COVID-19, I understand that I will be
                solely responsible for all medical expenses associated with any
                medical treatment and other healthcare services, including any
                confirmatory COVID-19 testing. If my test result is positive, I
                agree to consult with a licensed professional healthcare
                provider or other equivalent medical professional for further
                testing and/or treatment and will take fully responsibility for
                my actions thereafter, including complying with my medical
                professional’s advice and CDC guidelines.
              </li>
              <li>
                I understand that WSL will not share my test result with
                Hawaiian Airlines, and Hawaiian Airlines cannot access my test
                results. If I have any non-medical questions related to my test
                result, I agree to contact WSL.
              </li>
              <li>
                I understand and accept that under certain circumstances, and
                related to public health regulations, WSL may be required by law
                to report my test result to certain state and local public
                health authorities.
              </li>
              <li>
                While WSL will take reasonable measures to protect the
                confidentiality of my test result, I understand that any
                disclosure of information carries with it the potential for
                redisclosure, and once disclosed, the information I provide to
                WSL, including my test result, may not be protected by federal,
                state, or other applicable medical information privacy laws.{' '}
              </li>
            </ul>
          </Text>
          <Subheader>2. Patient Rights and Privacy Practices:</Subheader>
          <Text>
            a) Notice of Privacy Practices and Patient Rights: WSL’s Notice of
            Privacy Practices describes how it may use and disclose my protected
            health information in order to provide COVID-19 testing services,
            including sample collection, billing, and reporting test results, as
            permitted or required by law. To review a copy of my rights as a
            customer and WSL’s Notice of Privacy Practices, please click the
            “Privacy Policy” link at the bottom of the page. I acknowledge that
            Worksite Labs has provided me with a copy of Worksite Labs’ Notice
            of Privacy Practices.
          </Text>
          <Text>
            b) Disclosure to Government Authorities: I acknowledge and agree
            that WSL may be required by law to disclose my test results and
            related information to the appropriate federal, state, or local
            governmental and regulatory entities or public health authorities.
          </Text>
          <Subheader>3. Release</Subheader>
          <Text>
            To the fullest extent permitted by law, I hereby release, discharge
            and hold harmless, WSL and Hawaiian Airlines, including, without
            limitation, any each respective officers, directors, employees,
            representatives and agents from any and all claims, liability, and
            damages, of whatever kind or nature, directly arising out of or in
            connection with any act or omission relating to my COVID-19 test or
            the disclosure of my COVID-19 test results.
          </Text>
          <Text>
            By selecting the ACKNOWLEDGEMENT during the registration process for
            COVID-19 Diagnostic Testing at WSL, I acknowledge and agree that I
            have read, understand, and agreed to the statements contained within
            this form. I have been informed about the purpose of the COVID-19
            diagnostic test, procedures to be performed, potential risks and
            benefits, and associated costs. I have been provided an opportunity
            to ask questions before proceeding with a COVID-19 diagnostic test
            and I understand that if I do not wish to continue with the
            collection, testing, or analysis of a COVID-19 diagnostic test, I
            may decline to receive continued services. I have read the contents
            of this form in its entirety and voluntarily consent to undergo
            diagnostic testing for COVID-19.
          </Text>
          <Text>
            I understand that I may revoke this authorization at any time in
            writing by email to [EMAIL], except to the extent that action has
            been taken in reliance on this authorization.
          </Text>
          <Text>
            This consent will be effectively immediately once I select
            ACKNOWLEDGEMENT or sign electronically. If this authorization has
            not been revoked, it will remain in effect until my arrival in
            Hawaii, as designated in my flight reservation, or until the State
            of Hawaii terminates the Pre-Travel Testing Program, whichever is
            earlier. I understand that I have a right to receive a copy of this
            authorization at the email address I provided. I understand that if
            I use WSL for any future COVID-19 testing associated with another
            flight in the future, I may be required to sign a new consent and
            authorization form at that time.
          </Text>
          <Text>
            By selecting the ACKNOWLEDGEMENT during the registration process for
            COVID-19 Testing at WSL, I acknowledge and agree that I have read,
            understand, and agreed to the statements contained within this form.
            I have been informed about the purpose of the COVID-19 test,
            procedures to be performed, potential risks, and associated costs. I
            have been provided an opportunity to ask questions before proceeding
            with a COVID-19 test and I understand that if I do not wish to
            continue with the sample collection, testing, or analysis of my
            sample, I may decline to receive continued services. I have read the
            contents of this form in its entirety and voluntarily consent to
            undergo testing for COVID-19 with WSL.
          </Text>
          <Text>
            If I am registering a minor for COVID-19 testing with WSL, I confirm
            that I am the legal parent or legal guardian of the minor who is
            traveling to Hawaii with me and that I acknowledge and consent to
            all the information above with respect with to my minor child as the
            customer being tested by WSL for COVID-19, and I hereby authorize
            WSL to perform a COVID-19 test on my minor child, including sample
            collection and analysis. I agree to receive the COVID-19 test result
            and pay for the cost of the test for my minor child, and will take
            full responsibility for my own actions and the actions of my minor
            child after I receive the test result.
          </Text>
        </Content>
      </Scrollbar>
    </Container>
  );
};

export default ScrollableConsent;
