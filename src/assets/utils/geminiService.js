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

export const generateScore = async (pdfText, jobDescription) => {
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [
              {
                text: `Evaluate the following resume against the provided job description with maximum accuracy and detail. Assign a relevance score out of 100 based strictly on the following criteria: Exact match of technical skills, tools, technologies, and certifications explicitly mentioned in both. Clear alignment of the candidate's experience, accomplishments, and responsibilities with the job description. Presence of key terms, phrases, and industry-specific jargon from the job description in the resume. In addition: Highlight any critical gaps or missing keywords that reduce compatibility with the job description. Provide recommendations that are concise, specific, and directly relevant to improving the resume for this particular role. Avoid generic or repetitive advice. Return a JSON response in the exact format: { 'relevance_score': <numeric_score>, 'missing_keywords': ['keyword1', 'keyword2', ...], 'recommendations': ['tip1', 'tip2', ...] } Job Description: ${jobDescription} Resume: ${pdfText}`,
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
    const jsonStartIndex = rawText.indexOf("{");
    const jsonEndIndex = rawText.lastIndexOf("}");
    if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
      const validJson = rawText.slice(jsonStartIndex, jsonEndIndex + 1);
      const parsedResponse = JSON.parse(validJson); // Safely parse the cleaned JSON
      return parsedResponse;
    } else {
      throw new Error("Response does not contain valid JSON");
    }
  } catch (error) {
    console.error("Error generating score:", error.response?.data || error.message);
    throw error;
  }
};
