import * as GoogleGenAI from "@google/genai";

// Standardizing the initialization
const genAI = new (GoogleGenAI as any).GoogleGenerativeAI(
  (import.meta as any).env.VITE_GEMINI_API_KEY || ""
);

export async function analyzeResumeMatch(resume: string, jobDesc: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Analyze this resume against the job description. Provide match percentage and improvement tips: \n\nResume: ${resume} \n\nJob: ${jobDesc}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return { 
    text: response.text(),
    groundingChunks: [] // Providing empty array to satisfy TypeScript
  };
}

export async function generateInterviewGuide(role: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Generate a detailed interview prep guide for a ${role} position.`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return { 
    text: response.text(),
    groundingChunks: [] 
  };
}

export async function generateCareerRoadmap(role: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Create a step-by-step career roadmap to become a ${role}.`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return { 
    text: response.text(),
    groundingChunks: [] 
  };
}
