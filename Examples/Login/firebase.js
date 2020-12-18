import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDRG6jV9eb8UwfKfTBk0Lt_ZRXvoqGEtw4",
  authDomain: "rn-samples-57a17.firebaseapp.com",
  projectId: "rn-samples-57a17",
  storageBucket: "rn-samples-57a17.appspot.com",
  messagingSenderId: "901128314582",
  appId: "1:901128314582:web:fc260d118b60c5b09a7377",
  measurementId: "G-6BPMYS5TVW"
};

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

const auth = firebase.auth();

export {auth}