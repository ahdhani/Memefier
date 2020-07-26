import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import { FIREBASE_API_KEY , FIREBASE_MEASUREMENT_ID , FIREBASE_APP_ID , FIREBASE_MESSAGING_SENDER_ID ,FIREBASE_STORAGE_BUCKET, FIREBASE_AUTH_DOMAIN , FIREBASE_PROJECT_ID , FIREBASE_DATABASE_URL } from 'react-native-dotenv'

var firebaseConfig = {
  apiKey: FIREBASE_API_KEY ,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL ,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
};

// @bug Firebase App named '[DEFAULT]' already exists (app/duplicate-app)
// @fixed
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();