import React from 'react';
import { useFormikContext } from 'formik';
import styled from 'styled-components';

import { useStepsDispatch } from '../../provider';
import { colors } from '../../../../styles/colors';

import { NonFormikCheckbox as Checkbox } from '../../../shared/components/form/Checkbox';

const Container = styled.div`
  margin-bottom: 15px;
`;

const CheckboxWrapper = styled.div`
  background: ${colors.blue8};
  padding: 18px 20px 6px 20px;
  margin-bottom: 4px;
`;

const symptomsCheckboxes = [
  'Fever',
  'Cough',
  'Shortness of breath or difficulty breathing',
  'New Loss of Taste or Smell',
  'Chills',
  'Muscle or Body Aches',
  'Headache',
  'Sore Throat',
  'New Fatigue',
  'Nausea or Vomiting',
  'Congestion or Runny Nose'
];

const Symptoms: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<{
    symptoms: string[];
    hasSymptoms: boolean | null;
  }>();
  const { updateFormValues } = useStepsDispatch();

  return (
    <Container>
      {symptomsCheckboxes.map((symptom, index) => (
        <CheckboxWrapper key={symptom}>
          <Checkbox
            name={''}
            onChange={(checked) => {
              const newSymptoms = checked
                ? [...values.symptoms, symptom]
                : values.symptoms.filter((s) => s !== symptom);

              setFieldValue('symptoms', newSymptoms);
              updateFormValues({ symptoms: newSymptoms });
            }}
            checked={values.symptoms.includes(symptom)}
            disabled={!values.hasSymptoms}
          >
            {symptom}
          </Checkbox>
        </CheckboxWrapper>
      ))}
    </Container>
  );
};

export default Symptoms;
