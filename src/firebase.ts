import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';

import { config } from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(config.firebase);
}

// firebase.functions().useFunctionsEmulator('http://localhost:5001');

export { firebase };
