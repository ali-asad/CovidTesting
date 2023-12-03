import { format } from 'date-fns';

import { firebase } from '../../firebase';
import { config } from '../../config';
import { FirebaseLocation } from './models';

export const getOpenedLocations = () =>
  firebase
    .firestore()
    .collection(config.firestoreCollections.locations)
    .where('isOpened', '==', true)
    .get()
    .then((snapshot) =>
      snapshot.docs
        .map((doc) => doc.data() as FirebaseLocation)
        .map((loc) => ({
          ...loc,
          startDate: format(loc.startDate.toDate(), config.dateFormat),
        }))
    );
