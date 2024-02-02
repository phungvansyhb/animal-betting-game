import firebase_app from "./config";
import { getDatabase, ref, onValue } from "firebase/database";

// Get the Realtime Database instance
const db = getDatabase(firebase_app);

// Function to retrieve data from a Realtime Database path
export function firebaseGetData(path , callback) {
  return new Promise((resolve, reject) => {
    let error = null;

    try {
      const dbRef = ref(db, path);
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        callback(data); 
      });
    } catch (e) {
      error = e;
      reject(error); 
    }
  });
}