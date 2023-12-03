import React, {
  useCallback,
  useState,
  createContext,
  useMemo,
  useEffect,
} from 'react';
import { User } from 'firebase/app';
import { format, parse, compareAsc, compareDesc } from 'date-fns';

import {
  AdminState,
  AdminDispatch,
  AppointmentListItem,
  Comparables,
  AppointmentsListParams,
} from './models';
import { SortByDirection, FieldType } from './dictionaries';
import { firebase } from '../../firebase';
import { config } from '../../config';

export const AdminContext = createContext<AdminState>({
  params: {
    date: format(new Date(), config.dateFormat),
    locationQbenchId: config.locations[0].qbenchCustomerId,
  },
  appointments: null,
  sortBy: null,
  sortByDirection: SortByDirection.Ascending,
  user: null,
  configured: false,
  searchQuery: {
    firstName: '',
    lastName: '',
    confirmationId: '',
    phoneNumber: '',
    dateOfBirth: '',
    email: '',
  }
});

export const AdminDispatchContext = createContext<AdminDispatch>({
  updateParams() {},
  setAppointments() {},
  sortTable() {},
  setUser() {},
  searchTable() {}
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [params, setParams] = useState<AppointmentsListParams>({
    date: format(new Date(), config.dateFormat),
    locationQbenchId: config.locations[0].qbenchCustomerId,
  });
  const [appointments, setAppointments] = useState<
    AppointmentListItem[] | null
  >(null);
  const [sortBy, setSortBy] = useState<keyof AppointmentListItem | null>(null);
  const [sortByDirection, setSortByDirection] = useState<SortByDirection>(
    SortByDirection.Ascending
  );
  const [user, setUser] = useState<User | null>(null);
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
        }

        setConfigured(true);
      });

    return () => unsubscribe();
  }, [setUser]);

  

  const searchTable = useCallback(
    (update: Partial<AppointmentsListSearch>) => {
      setSearch((currentParams) => ({
        ...currentParams,
        ...update,
      }));
    },
    [setSearch]
  );

  const updateParams = useCallback(
    (update: Partial<AppointmentsListParams>) => {
      setParams((currentParams) => ({
        ...currentParams,
        ...update,
      }));
    },
    [setParams]
  );

  const sortTable = (columnName: keyof AppointmentListItem) => {
    let direction: SortByDirection = SortByDirection.Ascending;

    if (sortBy === columnName) {
      direction =
        sortByDirection === SortByDirection.Ascending
          ? SortByDirection.Descending
          : SortByDirection.Ascending;
    }

    setSortBy(columnName);
    setSortByDirection(direction);
  };

  const sortAppointments = (
    appointments: AppointmentListItem[] | null,
    sortBy: keyof AppointmentListItem | null,
    sortByDirection: SortByDirection
  ) => {
    if (sortBy !== null && appointments !== null && appointments.length > 0) {
      const compare = comparables[sortBy] || { type: FieldType.Text };

      appointments?.sort((a, b) => {
        if (compare.type !== FieldType.Date) {
          let aval: string = String(a[sortBy]).toUpperCase();
          let bval: string = String(b[sortBy]).toUpperCase();
          if (aval < bval) {
            return sortByDirection === SortByDirection.Ascending ? -1 : 1;
          }
          if (aval > bval) {
            return sortByDirection === SortByDirection.Ascending ? 1 : -1;
          }
          return 0;
        } else {
          const aDate = parse(
            a[sortBy] as string,
            compare?.data?.dateFormat,
            new Date()
          );
          const bDate = parse(
            b[sortBy] as string,
            compare?.data?.dateFormat,
            new Date()
          );
          return sortByDirection === SortByDirection.Ascending
            ? compareAsc(aDate, bDate)
            : compareDesc(aDate, bDate);
        }
      });
    }
    return appointments;
  };

  const store = useMemo(
    () => ({
      params,
      appointments: sortAppointments(appointments, sortBy, sortByDirection),
      sortBy,
      sortByDirection,
      user,
      configured,
    }),
    [
      JSON.stringify(params),
      appointments,
      sortBy,
      sortByDirection,
      user,
      configured,
    ]
  );

  const dispatch = useMemo(
    () => ({
      updateParams,
      setAppointments,
      sortTable,
      setUser,
      searchTable,
    }),
    [sortBy, sortByDirection] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <AdminContext.Provider value={store}>
      <AdminDispatchContext.Provider value={dispatch}>
        {children}
      </AdminDispatchContext.Provider>
    </AdminContext.Provider>
  );
};

export const useAdminState = () => {
  const context = React.useContext(AdminContext);

  if (typeof context === 'undefined') {
    throw new Error(
      '`useAdminState` hook must be used within a `Provider` component'
    );
  }

  return context;
};

export const useAdminDispatch = () => {
  const context = React.useContext(AdminDispatchContext);

  if (typeof context === 'undefined') {
    throw new Error(
      '`useAdminDispatch` hook must be used within a `Provider` component'
    );
  }

  return context;
};

const comparables: Comparables = {
  birthDate: {
    type: FieldType.Date,
    data: {
      dateFormat: config.dateFormat,
    },
  },
  departureDateAndTime: {
    type: FieldType.Date,
    data: {
      dateFormat: config.dateTimeFormat,
    },
  },
};
