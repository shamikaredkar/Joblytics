import { getFirestore, collection, addDoc } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";

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

// Fetch all jobs for a logged-in user
export const fetchJobsForUser = async (userEmail) => {
  try {
    const jobsCollectionRef = collection(db, "Users", userEmail, "Jobs");
    const querySnapshot = await getDocs(jobsCollectionRef);
    const jobs = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include document ID
      ...doc.data(), // Spread job data
    }));
    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const deleteJobFromUser = async (userEmail, jobId) => {
  if (!userEmail || !jobId) throw new Error("Invalid parameters for delete");

  const jobDocRef = doc(db, "Users", userEmail, "Jobs", jobId);
  await deleteDoc(jobDocRef);
};
