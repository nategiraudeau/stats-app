import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

import * as config from './firebase-config.json';

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export const _db = firebase.firestore();
export const _auth = firebase.auth();
export const _storage = firebase.storage();