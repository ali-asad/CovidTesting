import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { ReactComponent as LogoIcon } from '../../../../assets/logo-icon.svg';
import { useStepsState, useStepsDispatch } from '../../provider';
import { colors } from '../../../../styles/colors';
import { config } from '../../../../config';
import { Breakpoints } from '../../../../dictionaries';
import { createPaymentIntent, createAppointment } from '../../api';
import { ReactComponent as X } from '../../../../assets/x.svg';

import Modal from '../../../shared/components/Modal';
import PaymentDataInput from './PaymentDataInput';

const Container = styled.div`
  background: ${colors.darkBlue};
  padding: 30px 30px 80px;
  width: 100%;

  @media (min-width: ${Breakpoints.sm}px) {
    width: 500px;
    padding: 45px 30px 100px;
  }

  @media (min-width: ${Breakpoints.md}px) {
    width: 740px;
  }
`;

const Logo = styled(LogoIcon)`
  display: block;
  margin: 0 auto 35px;
`;

const InputGroup = styled.div`
  background: ${colors.white};
  padding: 14px 22px;
  border-radius: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  margin-bottom: 16px;
`;

const Button = styled.button`
  background: ${colors.green};
  width: 100%;
  border: 0;
  padding: 10px;
  font-size: 17px;
  line-height: 21px;
  letter-spacing: 1.7px;
  color: ${colors.white};
  font-weight: bold;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  text-align: center;
`;

const CardElementWrapper = styled.div`
  margin-bottom: 20px;
  padding: 9px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  background: ${colors.white};
`;

const Content = styled.div`
  position: relative;
  max-width: 470px;
  margin: 0 auto;
`;

const PaymentError = styled.div`
  position: absolute;
  font-size: 14px;
  color: ${colors.red};
  text-align: center;
  left: 0;
  bottom: -35px;
  width: 100%;
  opacity: ${({ error }: { error: string | null }) => (error ? 1 : 0)};
  transition: opacity 0.15s ease-in-out;
`;

const CloseModalButton = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  width: 24px;
  height: 24px;
  background: none;
  border: 0;
  cursor: pointer;

  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 22px;
    height: 22px;

    path {
      stroke: ${colors.white};
    }
  }
`;

interface Props {
  showModal: boolean;
  closeModal: () => void;
}

const PaymentModal: React.FC<Props> = ({ showModal, closeModal }) => {
  const { form, prices } = useStepsState();
  const { firstName, lastName, email, phone } = form;
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const { goToNextStep, updateFormValues } = useStepsDispatch();
  const [paymentIntent, setPaymentIntent] = useState<{
    id: string;
    client_secret: string;
  } | null>(null);

  const price = form.isExpressSameDayTest ? prices.expedited : prices.standard;
  const amount = price + price * form.minors.length;

  useEffect(() => {
    async function createIntent() {
      try {
        const result = await createPaymentIntent({
          amount: amount * 100,
          currency: config.currency,
        });

        setPaymentIntent({
          id: result.data.id,
          client_secret: result.data.client_secret,
        });
      } catch (e) {
        setError('Payment failed');

        console.error('[Payment Intent API error]', e);
      }
    }

    if (showModal) {
      createIntent();
    }
  }, [showModal, amount]);

  return (
    <Modal open={showModal} onClose={closeModal} noPadding maxWidth={740}>
      <Container>
        <CloseModalButton type="button" onClick={() => closeModal()}>
          <X />
        </CloseModalButton>
        <Content>
          <Logo />
          <Formik
            initialValues={{ name: `${firstName} ${lastName}`, email, phone }}
            onSubmit={async (values) => {
              if (!stripe || !elements) {
                return;
              }

              setProcessing(true);

              const cardElement = elements.getElement(CardElement);

              try {
                if (!cardElement || !paymentIntent) {
                  throw new Error('Payment failed');
                }

                const {
                  confirmationId,
                  agreeToCancel,
                  commitToAttend,
                  consentForTesting,
                  hipaaConfirmed,
                  confirmEmail,
                  ...appointment
                } = form;

                const payload = await stripe.confirmCardPayment(
                  paymentIntent.client_secret,
                  {
                    payment_method: {
                      card: cardElement,
                      billing_details: {
                        name: values.name,
                        phone: values.phone,
                        email: values.email,
                      },
                    },
                    receipt_email: values.email,
                  }
                );

                if (!payload.error) {
                  setError(null);

                  const result = await createAppointment({
                    ...appointment,
                    paymentIntentId: paymentIntent.id,
                  });

                  closeModal();

                  await new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                    }, 500);
                  });

                  updateFormValues({ confirmationId: result.data.id });
                  goToNextStep();

                  setProcessing(false);
                } else {
                  throw new Error(`Payment failed: ${payload.error.message}`);
                }
              } catch (e) {
                setError(e.message);
              }

              setProcessing(false);
            }}
          >
            {() => (
              <Form>
                <InputGroup>
                  <PaymentDataInput label="Name" name="name" />
                  <PaymentDataInput label="Email" name="email" />
                  <PaymentDataInput label="Phone" name="phone" />
                </InputGroup>
                <CardElementWrapper>
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: colors.black,
                          '::placeholder': {
                            color: colors.grey80,
                          },
                          backgroundColor: colors.white,
                          fontFamily: 'Inter, sand-serif',
                        },
                        invalid: {
                          color: colors.red,
                        },
                      },
                    }}
                  />
                </CardElementWrapper>
                <Button type="submit" disabled={processing}>
                  {processing ? 'Processing...' : `Pay $${amount}`}
                </Button>
                <PaymentError error={error}>{error}</PaymentError>
              </Form>
            )}
          </Formik>
        </Content>
      </Container>
    </Modal>
  );
};

export default PaymentModal;
