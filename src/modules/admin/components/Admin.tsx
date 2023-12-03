import React from 'react';

import { AdminProvider } from '../provider';
import AdminRouter from './AdminRouter';

const Admin: React.FC = () => {
  return (
    <AdminProvider>
      <AdminRouter />
    </AdminProvider>
  );
};

export default Admin;
