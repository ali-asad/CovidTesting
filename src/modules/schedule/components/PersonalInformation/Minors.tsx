import React from 'react';
import styled from 'styled-components';
import { FieldArray, useFormikContext } from 'formik';

import { Minor as IMinor } from '../../models';
import { colors } from '../../../../styles/colors';
import { ReactComponent as PlusIcon } from '../../../../assets/plus.svg';
import { useStepsDispatch } from '../../provider';
import { Breakpoints } from '../../../../dictionaries';

import { DatepickerField } from '../../../shared/components/Datepicker';
import Input from '../../../shared/components/form/Input';
import FormLabel from '../../../shared/components/form/FormLabel';
import { differenceInYears } from 'date-fns';

const Container = styled.div`
  margin-top: 40px;
`;

const Title = styled.h4`
  font-size: 20px;
  line-height: 22px;
  margin: 0 0 23px 0;
`;

const MinorsListWrapper = styled.div``;

const Minor = styled.div`
  padding: 25px 15px 20px;
  background: ${colors.blue8};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;

  & > * {
    width: 100%;
  }

  @media (min-width: ${Breakpoints.sm}px) {
    flex-direction: row;
    margin: 0 -8px;
    padding: 25px 15px 5px;

    & > * {
      margin: 0 8px;

      &:nth-child(1),
      &:nth-child(2) {
        flex-basis: 27%;
      }

      &:nth-child(3) {
        flex-basis: 24%;
      }

      &:nth-child(4) {
        flex-basis: 20%;
      }

      &:nth-child(5) {
        flex-basis: 3%;
      }
    }
  }

  @media (min-width: ${Breakpoints.md}px) {
    padding: 25px 40px 5px;
    margin: 0 -15px;

    & > * {
      margin: 0 15px;
    }
  }
`;

const RemoveMinor = styled.button`
  background: #1a96db;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  font-weight: 600;
  font-size: 21px;
  line-height: 20px;
  color: #ffffff;
  border: 0;
  float: right;
`;

const AddMinor = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: none;
  padding: 20px;
  margin-top: 30px;
  border: 2px dashed ${colors.grey};
  border-radius: 10px;
  color: ${colors.blue};
  margin-bottom: 20px;

  & > * {
    margin: 0 5px;
  }
`;

const Minors: React.FC = () => {
  const { values } = useFormikContext();
  const { updateFormValues } = useStepsDispatch();

  const saveMinorDetails = (
    fieldName: string,
    index: number,
    newValue: string | Date | null
  ) => {
    const newMinors = [...values.minors];
    newMinors[index][fieldName] = newValue;

    updateFormValues({
      minors: newMinors,
    });
  };

  return (
    <Container>
      <Title>Minor Information</Title>
      <FieldArray
        name="minors"
        render={(arrayHelpers) => (
          <MinorsListWrapper>
            {values.minors.map((minor: IMinor, index: number) => (
              <Minor key={index}>
                <FormLabel label="First Name">
                  <Input
                    name={`minors.${index}.firstName`}
                    isRequired
                    onChange={(value) =>
                      saveMinorDetails('firstName', index, value)
                    }
                  />
                </FormLabel>
                <FormLabel label="Last Name">
                  <Input
                    name={`minors.${index}.lastName`}
                    isRequired
                    onChange={(value) =>
                      saveMinorDetails('lastName', index, value)
                    }
                  />
                </FormLabel>
                <FormLabel label="Date of Birth">
                  <DatepickerField
                    name={`minors.${index}.birthDate`}
                    inputPlaceholder="MM/DD/YYYY"
                    maxDate={new Date()}
                    validate={(value) => {
                      let error;

                      if (differenceInYears(new Date(), value) > 18) {
                        error = 'Minor must be under 18 years old';
                      }

                      return error;
                    }}
                    onChange={(value: Date | null) =>
                      saveMinorDetails('birthDate', index, value)
                    }
                  />
                </FormLabel>
                <FormLabel label="Relationship">
                  <Input
                    name={`minors.${index}.relationship`}
                    isRequired
                    onChange={(value) =>
                      saveMinorDetails('relationship', index, value)
                    }
                  />
                </FormLabel>
                <div>
                  <RemoveMinor
                    type="button"
                    onClick={() => {
                      arrayHelpers.remove(index);
                      updateFormValues({
                        minors: values.minors.filter(
                          (minor: IMinor, i: number) => i !== index
                        ),
                      });
                    }}
                  >
                    -
                  </RemoveMinor>
                </div>
              </Minor>
            ))}
            <AddMinor
              type="button"
              onClick={() =>
                arrayHelpers.push({
                  firstName: '',
                  lastName: '',
                  birthDate: null,
                  relationship: '',
                })
              }
            >
              <PlusIcon />
              Add another minor
            </AddMinor>
          </MinorsListWrapper>
        )}
      />
    </Container>
  );
};

export default Minors;
