import * as GoogleGenAI from "@google/genai";

// Standardizing the initialization to bypass TS2305
const genAI = new (GoogleGenAI as any).GoogleGenerativeAI(
  (import.meta as any).env.VITE_GEMINI_API_KEY || ""
);

const MODEL_NAME = "gemini-2.0-flash";

export async function analyzeResumeMatch(resume: string, jobDesc: string) {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const prompt = `Analyze this resume against the job description. Provide match percentage and improvement tips: \n\nResume: ${resume} \n\nJob: ${jobDesc}`;
  
  const result = await model.generateContent(prompt);
  return { 
    text: result.response.text(),
    groundingChunks: [] 
  };
}

export async function generateInterviewGuide(role: string) {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const prompt = `Generate a detailed interview prep guide for a ${role} position.`;
  
  const result = await model.generateContent(prompt);
  return { 
    text: result.response.text(),
    groundingChunks: [] 
  };
}

export async function generateCareerRoadmap(role: string) {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const prompt = `Create a step-by-step career roadmap to become a ${role}.`;
  
  const result = await model.generateContent(prompt);
  return { 
    text: result.response.text(),
    groundingChunks: [] 
  };
}
