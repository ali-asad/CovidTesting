import React, {
  useEffect,
  useCallback,
  useState,
  createContext,
  useMemo,
} from 'react';

import { SharedState, SharedDispatch, Location } from './models';
import { getOpenedLocations } from './api';

export const SharedContext = createContext<SharedState>({
  locations: null,
});

export const SharedDispatchContext = createContext<SharedDispatch>({
  getLocations() {},
});

export const SharedProvider = ({ children }: { children: React.ReactNode }) => {
  const [locations, setLocations] = useState<Location[] | null>(null);

  const getLocations = useCallback(async () => {
    try {
      const locations = await getOpenedLocations();
      setLocations(locations);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  const store = useMemo(
    () => ({
      locations,
    }),
    [locations]
  );

  const dispatch = useMemo(
    () => ({
      getLocations,
    }),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <SharedContext.Provider value={store}>
      <SharedDispatchContext.Provider value={dispatch}>
        {children}
      </SharedDispatchContext.Provider>
    </SharedContext.Provider>
  );
};

export const useSharedState = () => {
  const context = React.useContext(SharedContext);

  if (typeof context === 'undefined') {
    throw new Error(
      '`useSharedState` hook must be used within a `SharedProvider` component'
    );
  }

  return context;
};

export const useSharedDispatch = () => {
  const context = React.useContext(SharedDispatchContext);

  if (typeof context === 'undefined') {
    throw new Error(
      '`useSharedDispatch` hook must be used within a `SharedProvider` component'
    );
  }

  return context;
};
