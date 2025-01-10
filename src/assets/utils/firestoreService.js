import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore();

// Add a job to the logged-in user's Jobs collection
export const addJobToUser = async (userEmail, jobData) => {
  try {
    const jobsCollectionRef = collection(db, "Users", userEmail, "Jobs");
    const docRef = await addDoc(jobsCollectionRef, jobData);
    return docRef.id; // Return the unique ID of the new job
  } catch (error) {
    console.error("Error adding job:", error);
    throw error;
  }
};
