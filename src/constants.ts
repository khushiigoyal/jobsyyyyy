import { Question } from './types';

export const SAMPLE_RESUME = `Jane Doe
(555) 987-6543 | jane.doe@email.com
Product Manager with 8 years in SaaS. Expert in Agile and B2B platform development.`;

export const SAMPLE_JOB_DESC = `Principal Product Manager, AI Solutions. 
Requires 7+ years of PM experience and knowledge of AI/ML workflows.`;

export const APTITUDE_QUESTIONS: Question[] = [
  {
    questionNumber: 1,
    question: "If a train running at 50 km/h crosses a man in 10 seconds, what is the length of the train?",
    options: { A: "138.9 m", B: "145.5 m", C: "160.2 m", D: "125.8 m" },
    correctAnswer: "A",
    explanation: "50 km/h = 13.89 m/s. 13.89 * 10 = 138.9 meters."
  },
  {
    questionNumber: 2,
    question: "Find the next number in the series: 3, 7, 15, 31, 63, ...",
    options: { A: "127", B: "128", C: "129", D: "131" },
    correctAnswer: "A",
    explanation: "Pattern is (x * 2) + 1. (63 * 2) + 1 = 127."
  }
];
