import axios from "axios";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export const extractKeywords = async (jobDescription) => {
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [
              {
                text: `From the following job description, extract the most relevant ATS-friendly keywords that should be included in a resume to improve compatibility with Applicant Tracking Systems (ATS).  Focus on skills, tools, certifications, and technologies specific to the role. Avoid generic words or phrases. Return the response as a flat JSON array of keywords. Here is the job description: ${jobDescription}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const rawText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    // Attempt to parse JSON after cleaning any non-JSON text
    const jsonStartIndex = rawText.indexOf("[");
    const jsonEndIndex = rawText.lastIndexOf("]");
    if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
      const validJson = rawText.slice(jsonStartIndex, jsonEndIndex + 1);
      const parsedKeywords = JSON.parse(validJson); // Safely parse the cleaned JSON
      return parsedKeywords;
    } else {
      throw new Error("Response does not contain valid JSON");
    }
  } catch (error) {
    console.error("Error extracting keywords:", error.response?.data || error.message); // Debug error
    throw error;
  }
};
