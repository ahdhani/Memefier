import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyDWLAkacPdjO2GljpHpLfww81KeU7W4e04",
  authDomain: "memefier-rest-api.firebaseapp.com",
  databaseURL: "https://memefier-rest-api.firebaseio.com",
  projectId: "memefier-rest-api",
  storageBucket: "memefier-rest-api.appspot.com",
  messagingSenderId: "347817083363",
  appId: "1:347817083363:web:e9cbf869abe7e8c35120d6",
  measurementId: "G-EXC4QJ3P8R"
};

// @bug Firebase App named '[DEFAULT]' already exists (app/duplicate-app)
// @fixed
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();