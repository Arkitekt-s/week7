
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import Constants from 'expo-constants';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import{Api_Key,Auth_Domain,Project_Id,Storage_Bucket,Messaging_Sender_Id,App_Id,Measurement_Id} from '@env';

//firebase config
const FirebaseConfig = {
    apiKey: Api_Key,
    authDomain: Auth_Domain,
    projectId: Project_Id,
    storageBucket: Storage_Bucket,
    messagingSenderId: Messaging_Sender_Id,
    appId: App_Id,
    measurementId: Measurement_Id
};
if (firebase.apps.length === 0) {
    firebase.initializeApp(FirebaseConfig);
}else {
    firebase.app(); // if already initialized, use that one
}
//initialize firebase
const auth = firebase.auth();
const firestore = firebase.firestore();
export { auth, firestore, firebase };