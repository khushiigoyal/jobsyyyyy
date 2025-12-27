import * as GoogleGenAI from "@google/genai";

// Use the VITE_ prefix for Vercel environment variables
const genAI = new GoogleGenAI.GoogleGenerativeAI(
  (import.meta as any).env.VITE_GEMINI_API_KEY || ""
);

export async function analyzeResumeMatch(resume: string, jobDesc: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Analyze this resume against the job description. Provide match percentage and improvement tips: \n\nResume: ${resume} \n\nJob: ${jobDesc}`;
  const result = await model.generateContent(prompt);
  return { text: result.response.text() };
}

export async function generateInterviewGuide(role: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Generate a detailed interview prep guide for a ${role} position.`;
  const result = await model.generateContent(prompt);
  return { text: result.response.text() };
}

export async function generateCareerRoadmap(role: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Create a step-by-step career roadmap to become a ${role}.`;
  const result = await model.generateContent(prompt);
  return { text: result.response.text() };
}
