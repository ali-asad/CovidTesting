import React from 'react';

import ManageRouter from './ManageRouter';
import { ManageProvider } from '../provider';

const Manage: React.FC = () => {
  return (
    <ManageProvider>
      <ManageRouter />
    </ManageProvider>
  );
};

export default Manage;
