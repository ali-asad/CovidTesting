import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { useAdminState } from '../provider';
import { Wrapper } from '../../shared/components/styled';

import Login from './Login';
import AppointmentList from './appointments/AppointmentList';
import Header from '../../shared/components/Header';
import Loader from '../../shared/components/Loader';
import Footer from '../../shared/components/Footer';

const AdminRouter: React.FC = () => {
  const { configured, user } = useAdminState();

  if (!configured) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Header isAdmin />
      <div>
        {user === null ? <Login /> : <AppointmentList />}</div>
      <Footer />
    </Wrapper>
  );
};

export default AdminRouter;
