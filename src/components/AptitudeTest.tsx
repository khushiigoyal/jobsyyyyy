import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { APTITUDE_QUESTIONS } from '../constants';
import { CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

const AptitudeTest: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qNum: number, option: string) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [qNum]: option }));
  };

  const calculateScore = () => {
    let score = 0;
    APTITUDE_QUESTIONS.forEach(q => {
      if (answers[q.questionNumber] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="max-w-3xl mx-auto z-10 relative">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-emerald-900 mb-2">Aptitude Challenge</h2>
        <p className="text-gray-500 font-medium">Test your logic and reasoning skills.</p>
      </div>

      <div className="space-y-6">
        {APTITUDE_QUESTIONS.map((q) => (
          <div key={q.questionNumber} className="bg-white/50 p-6 rounded-[2rem] border border-emerald-100 shadow-sm">
            <p className="font-bold text-emerald-900 mb-4">{q.questionNumber}. {q.question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(q.options).map(([key, value]) => {
                const isSelected = answers[q.questionNumber] === key;
                const isCorrect = q.correctAnswer === key;
                
                let bgColor = "bg-white hover:border-emerald-300";
                if (isSelected) bgColor = "bg-emerald-100 border-emerald-500";
                if (showResults && isCorrect) bgColor = "bg-green-100 border-green-500";
                if (showResults && isSelected && !isCorrect) bgColor = "bg-red-100 border-red-500";

                return (
                  <button
                    key={key}
                    onClick={() => handleSelect(q.questionNumber, key)}
                    className={`p-4 rounded-xl border-2 text-left transition-all font-medium flex justify-between items-center ${bgColor}`}
                  >
                    <span>{key}: {value}</span>
                    {showResults && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    {showResults && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                  </button>
                );
              })}
            </div>
            {showResults && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-4 bg-emerald-50 rounded-xl text-sm text-emerald-800 italic">
                <strong>Explanation:</strong> {q.explanation}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4">
        {!showResults ? (
          <button 
            onClick={() => setShowResults(true)}
            className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg hover:bg-emerald-700 transition-all"
          >
            Finish & Grade Test
          </button>
        ) : (
          <div className="text-center">
            <p className="text-2xl font-black text-emerald-900 mb-4">Your Score: {calculateScore()} / {APTITUDE_QUESTIONS.length}</p>
            <button 
              onClick={() => { setAnswers({}); setShowResults(false); }}
              className="flex items-center gap-2 text-emerald-600 font-bold hover:underline"
            >
              <RefreshCw className="w-4 h-4" /> Retake Test
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AptitudeTest;
