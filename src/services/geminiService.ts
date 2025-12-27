import { GoogleGenerativeAI } from "@google/genai";

// Use a fallback to prevent the "void 0" constructor crash
const API_KEY = (import.meta as any).env.VITE_GEMINI_API_KEY || "";

const getAIInstance = () => {
  if (!API_KEY) {
    console.error("API Key missing! Check Vercel/Netlify Environment Variables.");
  }
  return new GoogleGenerativeAI(API_KEY);
};

const MODEL_NAME = "gemini-2.0-flash";

export async function analyzeResumeMatch(resume: string, jobDesc: string) {
  const genAI = getAIInstance();
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const result = await model.generateContent(`Match: ${resume} ${jobDesc}`);
  return { text: result.response.text(), groundingChunks: [] };
}

export async function generateInterviewGuide(role: string) {
  const genAI = getAIInstance();
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const result = await model.generateContent(`Interview: ${role}`);
  return { text: result.response.text(), groundingChunks: [] };
}

export async function generateCareerRoadmap(role: string) {
  const genAI = getAIInstance();
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const result = await model.generateContent(`Roadmap: ${role}`);
  return { text: result.response.text(), groundingChunks: [] };
}
