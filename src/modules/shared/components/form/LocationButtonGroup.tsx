import React from 'react';
import { Field, FieldProps } from 'formik';
import styled from 'styled-components';

import { ErrorText } from '../styled';
import { colors } from '../../../../styles/colors';
import { useStepsDispatch } from '../../../schedule/provider';
import { Location } from '../../models';
import { Breakpoints } from '../../../../dictionaries';
import { useSharedState } from '../../provider';

interface ButtonProps {
  selected: boolean;
}

const LocationButton = styled.button`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: start;
  border: 0;
  background: ${({ selected }: ButtonProps) =>
    selected ? colors.blue : colors.blue8};
  color: ${({ selected }: ButtonProps) =>
    selected ? colors.white : colors.black};
  transition: all 0.2s ease-in-out;
  padding: 18px 20px;
  cursor: pointer;
  margin-bottom: 4px;

  @media (min-width: ${Breakpoints.sm}px) {
    padding: 24px 33px;
  }
`;

const Info = styled.div`
  text-align: left;
`;

const Name = styled.div`
  font-weight: bold;
  margin-bottom: 2px;
`;

const LocationsContainer = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 45px;
`;

const Error = styled.div`
  position: absolute;
  bottom: -25px;
  left: 0;
`;

const LocationButtonGroup: React.FC = () => {
  const { updateFormValues } = useStepsDispatch();
  const { locations } = useSharedState();

  return (
    <>
      <Field
        name="location"
        validate={(value: Location | null) => {
          let error;

          if (!value) {
            error = 'Please choose location';
          }

          return error;
        }}
      >
        {({ form: { setFieldValue }, field, meta: { error } }: FieldProps) => (
          <LocationsContainer>
            {locations &&
              locations.map((loc) => (
                <LocationButton
                  key={loc.name}
                  type="button"
                  selected={field.value?.name === loc.name}
                  onClick={() => {
                    setFieldValue('location', loc);
                    updateFormValues({ location: loc });
                  }}
                >
                  <Info>
                    <Name>{loc.name}</Name>
                    {loc.address1}
                    <br />
                    {loc.address2}
                  </Info>
                </LocationButton>
              ))}
            <Error>
              <ErrorText hasError={error !== undefined}>{error}</ErrorText>
            </Error>
          </LocationsContainer>
        )}
      </Field>
    </>
  );
};

export default LocationButtonGroup;
