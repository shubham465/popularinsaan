// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAPj7wheua21671AEUhMwhTk2Q2I_xNj3s",
  authDomain: "www.popularinsaan.com",
  projectId: "mrpopular-618ee",
  storageBucket: "mrpopular-618ee.appspot.com",
  messagingSenderId: "85018778910",
  appId: "1:85018778910:web:fb19420522aa21404b7d0f",
  measurementId: "G-CMVK67WF09"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db= firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const fbprovider = new firebase.auth.FacebookAuthProvider()

  export {auth, provider,fbprovider};
  export default db;