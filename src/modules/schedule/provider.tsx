import React, {
  useCallback,
  useState,
  createContext,
  useMemo,
  useEffect,
} from 'react';
import { nanoid } from 'nanoid';

import { AnyObject } from '../shared/models';
import { ScheduleDispatch, ScheduleState } from './models';
import { steps } from './components/Steps';
import { getPrices } from './api';
import { config } from '../../config';

const initialFormState = {
  id: nanoid(),
  phone: '',
  sendMessagesAboutTestResults: false,
  location: null,
  date: null,
  slot: null,
  address: {
    zipCode: '',
    address: '',
    city: '',
    state: '',
  },
  firstName: '',
  lastName: '',
  birthDate: null,
  minors: [],
  hasSymptoms: null,
  symptoms: [],
  email: '',
  confirmEmail: '',
  hasConditions: null,
  hadContact: null,
  sex: null,
  gender: null,
  sexualOrientation: null,
  race: null,
  ethnicity: null,
  hipaaConfirmed: false,
  consentForTesting: false,
  commitToAttend: false,
  agreeToCancel: false,
  confirmationId: '',
  departureDateAndTime: null,
  isExpressSameDayTest: false,
};

export const newMinor = {
  firstName: '',
  lastName: '',
  birthDate: null,
  relationship: '',
};

export const StepsContext = createContext<ScheduleState>({
  form: initialFormState,
  step: 0,
  showChangeLocationModal: false,
  prices: {
    standard: 0,
    expedited: 0,
  },
  configured: false,
});

export const StepsDispatchContext = createContext<ScheduleDispatch>({
  goToNextStep() {},
  goToPrevStep() {},
  updateFormValues() {},
  toggleChangeLocationModal() {},
});

export const ScheduleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialFormState);
  const [showChangeLocationModal, setShowChangeLocationModal] = useState(false);
  const [prices, setPrices] = useState({
    standard: 0,
    expedited: 0,
  });
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    if (!configured) {
      getPrices().then((result) => {
        const newPrices = {
          ...prices,
        };

        result.data.data.forEach((price: any) => {
          if (price.product === config.products.standard) {
            newPrices.standard = price.unit_amount / 100;
          }

          if (price.product === config.products.expedited) {
            newPrices.expedited = price.unit_amount / 100;
          }
        });

        setConfigured(true);
        setPrices(newPrices);
      });
    }
  }, [prices]);

  const updateFormValues = useCallback(
    (update: AnyObject) => {
      setForm((f) => ({
        ...f,
        ...update,
      }));
    },
    [setForm]
  );

  const goToNextStep = useCallback(() => {
    setStep((s: number) => {
      if (s + 1 <= steps.length - 1) {
        return s + 1;
      }

      return s;
    });
  }, [setStep]);

  const goToPrevStep = useCallback(() => {
    setStep((s: number) => {
      if (s - 1 >= 0) {
        return s - 1;
      }

      return s;
    });
  }, [setStep]);

  const toggleChangeLocationModal = useCallback(
    (show) => setShowChangeLocationModal(show),
    [setShowChangeLocationModal]
  );

  const store = useMemo(
    () => ({
      form,
      step,
      showChangeLocationModal,
      prices,
      configured,
    }),
    [step, form, showChangeLocationModal, prices, configured]
  );

  const dispatch = useMemo(
    () => ({
      goToNextStep,
      goToPrevStep,
      updateFormValues,
      toggleChangeLocationModal,
    }),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <StepsContext.Provider value={store}>
      <StepsDispatchContext.Provider value={dispatch}>
        {children}
      </StepsDispatchContext.Provider>
    </StepsContext.Provider>
  );
};

export const useStepsState = () => {
  const context = React.useContext(StepsContext);

  if (typeof context === 'undefined') {
    throw new Error(
      '`useStepsState` hook must be used within a `Provider` component'
    );
  }

  return context;
};

export const useStepsDispatch = () => {
  const context = React.useContext(StepsDispatchContext);

  if (typeof context === 'undefined') {
    throw new Error(
      '`useStepsDispatch` hook must be used within a `Provider` component'
    );
  }

  return context;
};
