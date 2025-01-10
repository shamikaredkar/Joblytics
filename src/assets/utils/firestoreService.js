import { getFirestore, collection, addDoc, doc, deleteDoc, updateDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const db = getFirestore();

// Upload a file to Firebase Storage and return the download URL
export const uploadFileToStorage = async (path, file) => {
  try {
    const storage = getStorage();
    const fileRef = ref(storage, path); // Reference to the file in storage
    await uploadBytes(fileRef, file); // Upload the file
    const downloadURL = await getDownloadURL(fileRef); // Get the file's download URL
    return downloadURL; // Return the URL
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
// Update a job for a specific user
export const updateJobForUser = async (userEmail, jobId, updatedData) => {
  try {
    const jobDocRef = doc(db, "Users", userEmail, "Jobs", jobId); // Reference to the job document
    await updateDoc(jobDocRef, updatedData); // Update the document
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};

// Add a job to the logged-in user's Jobs collection
export const addJobToUser = async (userEmail, jobData, jobId = null) => {
  try {
    if (jobId) {
      // Reference the specific document using its ID
      const jobDocRef = doc(db, "Users", userEmail, "Jobs", jobId);
      await updateDoc(jobDocRef, jobData); // Update the document
      return jobId;
    } else {
      // Create a new document
      const jobsCollectionRef = collection(db, "Users", userEmail, "Jobs");
      const docRef = await addDoc(jobsCollectionRef, jobData);
      return docRef.id; // Return the unique ID of the new job
    }
  } catch (error) {
    console.error("Error adding/updating job:", error);
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

// Delete a job from the logged-in user's Jobs collection
export const deleteJobFromUser = async (userEmail, jobId) => {
  try {
    if (!userEmail || !jobId) throw new Error("Invalid parameters for delete");

    const jobDocRef = doc(db, "Users", userEmail, "Jobs", jobId); // Reference the document
    await deleteDoc(jobDocRef); // Delete the document
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
};
