import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCzUVOBhoD-qSbwMsskQqBUlJ3X1y0HqP8",
    authDomain: "entries-project-e10bd.firebaseapp.com",
    projectId: "entries-project-e10bd",
    storageBucket: "entries-project-e10bd.firebasestorage.app",
    messagingSenderId: "57607918773",
    appId: "1:57607918773:web:e1897134987fb047949afc",
    measurementId: "G-3Z34PM6WJ2"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app)

  export const db = getFirestore(app)
  export const storage = getStorage(app)