if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js');
var firebaseConfig = {
  "projectId": "jpes707-firenotes",
  "appId": "1:361934279314:web:8637d70079fe51d900cc4b",
  "databaseURL": "https://jpes707-firenotes-default-rtdb.firebaseio.com",
  "storageBucket": "jpes707-firenotes.appspot.com",
  "apiKey": "AIzaSyD92S16_bTwBkjtcuX0OCM26c13JMRlgxQ",
  "authDomain": "jpes707-firenotes.firebaseapp.com",
  "messagingSenderId": "361934279314"
};
if (firebaseConfig) {
  firebase.initializeApp(firebaseConfig);

  var firebaseEmulators = {};
  if (firebaseEmulators) {
    console.log("Automatically connecting Firebase SDKs to running emulators:");
    Object.keys(firebaseEmulators).forEach(function(key) {
      console.log('\t' + key + ': http://' +  firebaseEmulators[key].host + ':' + firebaseEmulators[key].port );
    });

    if (firebaseEmulators.database && typeof firebase.database === 'function') {
      firebase.database().useEmulator(firebaseEmulators.database.host, firebaseEmulators.database.port);
    }

    if (firebaseEmulators.firestore && typeof firebase.firestore === 'function') {
      firebase.firestore().useEmulator(firebaseEmulators.firestore.host, firebaseEmulators.firestore.port);
    }

    if (firebaseEmulators.functions && typeof firebase.functions === 'function') {
      firebase.functions().useEmulator(firebaseEmulators.functions.host, firebaseEmulators.functions.port);
    }

    if (firebaseEmulators.auth && typeof firebase.auth === 'function') {
      firebase.auth().useEmulator('http://' + firebaseEmulators.auth.host + ':' + firebaseEmulators.auth.port);
    }
  } else {
    console.log("To automatically connect the Firebase SDKs to running emulators, replace '/__/firebase/init.js' with '/__/firebase/init.js?useEmulator=true' in your index.html");
  }
}
