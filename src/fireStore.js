import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDLH5nmr5TIltlGneVw3JKNHApFmVZgFBM",
    authDomain: "microblogging-myriam.firebaseapp.com",
    projectId: "microblogging-myriam",
    storageBucket: "microblogging-myriam.appspot.com",
    messagingSenderId: "738170413984",
    appId: "1:738170413984:web:bb0c6879a4ddb04e47fac5",
    measurementId: "G-4E5LLC4RCT"
  };

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export default db




 