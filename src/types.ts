export type TabType = 'match' | 'roadmap' | 'aptitude' | 'interview';
export interface OptionSet { A: string; B: string; C: string; D: string; }
export interface Question {
  questionNumber: number;
  question: string;
  options: OptionSet;
  correctAnswer: keyof OptionSet;
  explanation: string;
}
export interface GroundingChunk {
  web?: { uri?: string; title?: string; };
}
export interface AIResponse {
  text: string;
  groundingChunks?: GroundingChunk[];
}
