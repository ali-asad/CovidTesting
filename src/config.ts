const config = {
  firestoreCollections: {
    schedules: 'schedules',
    appointments: 'appointments',
    locations: 'locations',
  },
  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  },
  weekDateFormat: 'EEEE, MMM d, yyyy',
  dateTimeFormat: 'LL/dd/yyyy hh:mm a',
  dateFormat: 'LL/dd/yyyy',
  fileDateFormat: 'yyyyLLdd',
  maxSlotsByPeriod: 12,
  schedule: {
    startTime: '6:00a',
    endTime: '2:00p',
    periodDuration: 30,
  },
  products: {
    standard: process.env.REACT_APP_STANDARD_TEST_ID,
    expedited: process.env.REACT_APP_EXPEDITED_TEST_ID,
  },
  currency: 'usd',
  maxAdvanceHours: 72,
  lastExpressSlotIndex: 1,
  reportData: {
    location: '450 Bauchet Street, Los Angeles CA 90012',
    reviewedBy: 'Anthony Victorio, MD',
    technician: 'Cherisse Heirs',
  },
  locations: [
    {
      name: 'LAX',
      address1: '6695 Green Valley Circle',
      address2: 'Culver City, CA 90230',
      qbenchCustomerId: 2,
    },
    {
      name: 'SFO',
      address1: '261 Loomis Street',
      address2: 'San Francisco, CA 94124',
      qbenchCustomerId: 3,
    },
    {
      name: 'LAS1 - Main Street Casino Hotel',
      address1: '200 North Main Street',
      address2: 'Las Vegas, NV 89101',
      qbenchCustomerId: 5,
    },
  ],
};

export { config };
