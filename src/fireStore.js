import {initializeApp} from 'firebase/app'
import { getAuth} from 'firebase/auth';
import {getFirestore, doc, setDoc} from 'firebase/firestore'
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCUIPYGvLn-HoLDrySsY5yt340Ou2znu58",
  authDomain: "microblog-myriam.firebaseapp.com",
  projectId: "microblog-myriam",
  storageBucket: "microblog-myriam.appspot.com",
  messagingSenderId: "132405272025",
  appId: "1:132405272025:web:be58eea5b35cb941c30dc8"
};


const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
const db = getFirestore(app)
const auth = getAuth(app)

export async function uploadPhoto(file, currentUser) {
  console.log("workinggggggggggg")
  const fileRef = ref(storage, currentUser.uid + file.name)
  await uploadBytes(fileRef, file)
  const photoUrl = await getDownloadURL(fileRef)
  return photoUrl
}

export function setUserDoc(userId, userData = {}, merge = true) {
  const userRef = doc(db, "users", userId);
  setDoc(userRef, { userId, ...userData }, { merge });
}

export {db,app,auth} 





 