// Import the functions you need from the SDKs you need
// @ts-ignore
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env'
import { initializeApp } from "firebase/app"
import { getStorage } from 'firebase/storage'
import { getFirestore, collection, FirestoreDataConverter, DocumentData, WithFieldValue, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { Workout } from '../models/DBModels'



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
const workoutRef = collection(db, 'workouts')

const workoutConverter: FirestoreDataConverter<Workout> = {
  toFirestore(workout: WithFieldValue<Workout>): DocumentData {
    return { 
      name: workout.name,
      category: workout.category,
      exercises: workout.exercises,
      date: workout.date,
      note: workout.note
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Workout {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.name,
      category: data.category,
      exercises: data.exercises,
      date: data.date,
      note: data.note
    };
  },
}

export { auth, db, workoutRef, storage, workoutConverter }