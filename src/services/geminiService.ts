// 1. Use a Namespace Import to ensure the module loads correctly
import * as GoogleGenAI from "@google/genai";

// 2. Initialize with a check to bypass the "(void 0)" error
const genAI = new (GoogleGenAI as any).GoogleGenerativeAI(
  (import.meta as any).env.VITE_GEMINI_API_KEY || ""
);

const MODEL_NAME = "gemini-2.0-flash";

export async function analyzeResumeMatch(resume: string, jobDesc: string) {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const prompt = `Analyze this resume against the job description. Resume: ${resume} Job: ${jobDesc}`;
  const result = await model.generateContent(prompt);
  return { text: result.response.text(), groundingChunks: [] };
}

export async function generateInterviewGuide(role: string) {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const prompt = `Interview prep for ${role}.`;
  const result = await model.generateContent(prompt);
  return { text: result.response.text(), groundingChunks: [] };
}

export async function generateCareerRoadmap(role: string) {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const prompt = `Roadmap for ${role}.`;
  const result = await model.generateContent(prompt);
  return { text: result.response.text(), groundingChunks: [] };
}
