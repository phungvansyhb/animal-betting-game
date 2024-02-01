import firebase_app from "./config";
import { getDatabase, ref, get } from "firebase/database";

// Get the Realtime Database instance
const db = getDatabase(firebase_app);

// Function to retrieve data from a Realtime Database path
export default async function firebaseGetData(path) {
  // Variable to store the result of the operation
  let result = null;
  // Variable to store any error that occurs during the operation
  let error = null;

  try {
    // Retrieve the data from the specified path in the Realtime Database
    result = await get(ref(db, path));
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
  }

  // Return the result and error as an object
  return { result, error };
}