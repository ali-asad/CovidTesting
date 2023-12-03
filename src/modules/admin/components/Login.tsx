import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';

import {
  Button,
  Container,
  Content,
  PageHeader,
  PageTitle,
} from '../../shared/components/styled';
import { colors } from '../../../styles/colors';
import { signIn } from '../api';

import Input from '../../shared/components/form/Input';
import FormLabel from '../../shared/components/form/FormLabel';

const Error = styled.div`
  color: ${colors.red};
  margin-top: 15px;
  text-align: center;
`;

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <Content>
        <PageHeader>
          <PageTitle>First, we need to verify your identity.</PageTitle>
        </PageHeader>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={async ({
            username,
            password,
          }: {
            username: string;
            password: string;
          }) => {
            setLoading(true);

            try {
              await signIn(username, password);
            } catch (e) {
              setError('Incorrect username or password.');
              setLoading(false);
            }
          }}
          enableReinitialize={false}
        >
          {() => (
            <Form>
              <FormLabel label="Username">
                <Input name="username" isRequired />
              </FormLabel>
              <FormLabel label="Password">
                <Input name="password" type="password" isRequired />
              </FormLabel>
              <Button type="submit" libraryType="primary">
                {loading ? 'Processing...' : 'Login'}
              </Button>
              {error && <Error>{error}</Error>}
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  );
};

export default Login;
