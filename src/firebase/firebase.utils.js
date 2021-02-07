import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyARJMBzMHxcutSHPlN19DSrMrtuUoBcsVM",
    authDomain: "crwn-db-7ef8f.firebaseapp.com",
    projectId: "crwn-db-7ef8f",
    storageBucket: "crwn-db-7ef8f.appspot.com",
    messagingSenderId: "429706259987",
    appId: "1:429706259987:web:14767d6b4bbc0721b999e6",
    measurementId: "G-LTZ2DQRB8C"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;


    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message)
      }

    }
    return userRef;

  }

  firebase.initializeApp(config)

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;