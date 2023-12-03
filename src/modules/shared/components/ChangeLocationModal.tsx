import React from 'react';
import { Formik, Form } from 'formik';
import styled from 'styled-components';

import { useStepsState, useStepsDispatch } from '../../schedule/provider';
import { Button } from './styled';
import { colors } from '../../../styles/colors';
import { Breakpoints } from '../../../dictionaries';

import Modal from './Modal';
import LocationButtonGroup from './form/LocationButtonGroup';

const Content = styled.div`
  width: 100%;

  @media (min-width: ${Breakpoints.md}px) {
    width: 540px;
  } 
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 240px;
  margin: 0 -5px;
  
  & > * {
    margin: 0 5px;
  }
`;

const Title = styled.h2`
  color: ${colors.darkBlue};
  font-size: 28px;
  margin-bottom: 25px;
`;

const ChangeLocationModal: React.FC = () => {
  const {
    form: { location },
    showChangeLocationModal,
  } = useStepsState();
  const { toggleChangeLocationModal, updateFormValues } = useStepsDispatch();

  const closeModal = () => toggleChangeLocationModal(false);

  return (
    <Modal open={showChangeLocationModal} onClose={closeModal}>
      <Formik
        initialValues={{ location }}
        onSubmit={() => {
          updateFormValues({ update: location });
          closeModal();
        }}
      >
        {() => (
          <Form>
            <Content>
              <Title>Change location</Title>
              <LocationButtonGroup />
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
            </Content>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ChangeLocationModal;
