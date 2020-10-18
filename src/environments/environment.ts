// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBWVJfATUHNQACNvOxEgIlREGtQLY8gwro',
    authDomain: 'habitity.firebaseapp.com',
    databaseURL: 'https://habitity.firebaseio.com',
    projectId: 'habitity',
    storageBucket: 'habitity.appspot.com',
    messagingSenderId: '670779745623',
    appId: '1:670779745623:web:c7fe6733d4f482a4268a12',
    measurementId: 'G-7WJ635LSGC'
  },
  apiUrl: 'https://us-central1-habitity.cloudfunctions.net/api',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
