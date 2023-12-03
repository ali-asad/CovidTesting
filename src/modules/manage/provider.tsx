import React, { useCallback, useState, createContext, useMemo } from 'react';

import { Appointment } from '../shared/models';
import { Result } from '../admin/models';
import { ManageState, ManageDispatch } from './models';
import { ManagePage } from './dictionaries';

export const ManageContext = createContext<ManageState>({
  currentPage: ManagePage.VerifyIdentity,
  appointment: null,
  results: null,
});

export const ManageDispatchContext = createContext<ManageDispatch>({
  goToPage() {},
  updateAppointment() {},
  updateResults() {},
});

export const ManageProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState(ManagePage.VerifyIdentity);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [results, setResults] = useState<Result[] | null>(null);

  const goToPage = useCallback(
    (newPage: ManagePage) => {
      setCurrentPage(newPage);
    },
    [setCurrentPage]
  );

  const updateAppointment = useCallback(
    (appointment: Appointment) => {
      setAppointment(appointment);
    },
    [setAppointment]
  );

  const updateResults = useCallback(
    (results: Result[]) => setResults(results),
    [setResults]
  );

  const store = useMemo(
    () => ({
      currentPage,
      appointment,
      results,
    }),
    [currentPage, appointment, results]
  );

  const dispatch = useMemo(
    () => ({
      goToPage,
      updateAppointment,
      updateResults,
    }),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <ManageContext.Provider value={store}>
      <ManageDispatchContext.Provider value={dispatch}>
        {children}
      </ManageDispatchContext.Provider>
    </ManageContext.Provider>
  );
};

export const useManageState = () => {
  const context = React.useContext(ManageContext);

  if (typeof context === 'undefined') {
    throw new Error(
      '`useManageState` hook must be used within a `Provider` component'
    );
  }

  return context;
};

export const useManageDispatch = () => {
  const context = React.useContext(ManageDispatchContext);

  if (typeof context === 'undefined') {
    throw new Error(
      '`useManageDispatch` hook must be used within a `Provider` component'
    );
  }

  return context;
};
