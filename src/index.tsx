import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from './styles/globals';
import Normalize from './styles/normalize';
import { SharedProvider } from './modules/shared/provider';

import 'react-responsive-modal/styles.css';
import 'react-datepicker/dist/react-datepicker.min.css';
import 'react-tippy/dist/tippy.css';

import App from './App';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 0.2,
});

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK || '');

ReactDOM.render(
  <React.StrictMode>
    <Normalize />
    <GlobalStyles />
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <SharedProvider>
          <App />
        </SharedProvider>
      </Elements>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
