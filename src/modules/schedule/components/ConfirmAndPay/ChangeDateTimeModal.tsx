import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';

import {
  useStepsState,
  useStepsDispatch,
} from '../../provider';

import Modal from '../../../shared/components/Modal';
import Slots from '../../../shared/components/Slots';
import { colors } from '../../../../styles/colors';
import { Button } from '../../../shared/components/styled';

const Container = styled.div`
  max-width: 700px;
`;

const Title = styled.h2`
  color: ${colors.darkBlue};
  font-size: 28px;
  margin-bottom: 13px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 240px;
  margin: 30px -5px 0;

  & > * {
    margin: 0 5px;
  }
`;

interface Props {
  showModal: boolean;
  closeModal: () => void;
}

const ChangeDateTimeModal: React.FC<Props> = ({ showModal, closeModal }) => {
  const { form } = useStepsState();
  const { updateFormValues } = useStepsDispatch();

  const { slot } = form;

  return (
    <Modal open={showModal} onClose={closeModal}>
      <Container>
        <Title>Change date & time</Title>
        <Formik
          initialValues={{ slot }}
          onSubmit={() => {
            updateFormValues({ slot });
            closeModal();
          }}
        >
          {() => (
            <Form>
              <Slots
                alwaysShowDatePicker
                appointment={form}
                onFieldUpdate={(update) => updateFormValues(update)}
              />
              <ButtonsContainer>
                <Button
                  libraryType="default"
                  size="sm"
                  type="button"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button libraryType="primary" size="sm" type="submit">
                  Change
                </Button>
              </ButtonsContainer>
            </Form>
          )}
        </Formik>
      </Container>
    </Modal>
  );
};

export default ChangeDateTimeModal;
