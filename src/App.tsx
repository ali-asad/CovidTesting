import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from './routes';
import { useSharedState } from './modules/shared/provider';

import Steps from './modules/schedule/components/Schedule';
import Manage from './modules/manage/components/Manage';
import Admin from './modules/admin/components/Admin';

function App() {
  return (
    <Switch>
      <Route path={routes.schedule} exact>
        <Steps />
      </Route>
      <Route path={routes.admin}>
        <Admin />
      </Route>
      <Route path={routes.manage}>
        <Manage />
      </Route>
    </Switch>
  );
}

export default App;
