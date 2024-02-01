import firebase_app from "./config";
import { getDatabase, ref, set } from "firebase/database";

// Get the Realtime Database instance
const db = getDatabase(firebase_app);

// Function to add data to a Realtime Database path
export default async function firebaseAddData(
  path: string,
  data: any
) {
  // Variable to store the result of the operation
  let result = null;
  // Variable to store any error that occurs during the operation
  let error = null;
  try {
    // Set the data at the specified path in the Realtime Database
    result = await set(ref(db, path), data);
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
    console.log(e);
  }
  // Return the result and error as an object
  return { result, error };
}