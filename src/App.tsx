import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, Brain, MessageSquare, Search, Printer, 
  Sparkles, Zap, Award, BookOpen, User, Info, Map, Target
} from 'lucide-react';
import { TabType, GroundingChunk } from './types';
import { SAMPLE_RESUME, SAMPLE_JOB_DESC } from './constants';
import { analyzeResumeMatch, generateInterviewGuide, generateCareerRoadmap } from './services/geminiService';
import MarkdownRenderer from './components/MarkdownRenderer';
import AptitudeTest from './components/AptitudeTest';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('match');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [resume, setResume] = useState(() => localStorage.getItem('jobsy_resume') || SAMPLE_RESUME);
  const [jobDesc, setJobDesc] = useState(SAMPLE_JOB_DESC);
  const [matchResult, setMatchResult] = useState<string | null>(null);

  const [role, setRole] = useState(() => localStorage.getItem('jobsy_role') || '');
  const [interviewResult, setInterviewResult] = useState<string | null>(null);
  const [interviewGrounding, setInterviewGrounding] = useState<GroundingChunk[] | undefined>(undefined);
  
  const [roadmapResult, setRoadmapResult] = useState<string | null>(null);
  const [roadmapGrounding, setRoadmapGrounding] = useState<GroundingChunk[] | undefined>(undefined);

  useEffect(() => {
    localStorage.setItem('jobsy_resume', resume);
  }, [resume]);

  useEffect(() => {
    localStorage.setItem('jobsy_role', role);
  }, [role]);

  const handleMatchAnalysis = async () => {
    if (!resume.trim() || !jobDesc.trim()) {
      setError("Please fill in both resume and job description.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await analyzeResumeMatch(resume, jobDesc);
      setMatchResult(response.text);
    } catch (err: any) {
      setError(err.message || "An error occurred during analysis.");
    } finally {
      setLoading(false);
    }
  };

  const handleInterviewPrep = async () => {
    if (!role.trim()) {
      setError("Please specify a job role.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await generateInterviewGuide(role);
      setInterviewResult(response.text);
      setInterviewGrounding(response.groundingChunks);
    } catch (err: any) {
      setError(err.message || "An error occurred generating the guide.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoadmapGen = async () => {
    if (!role.trim()) {
      setError("Tell us your target role first!");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await generateCareerRoadmap(role);
      setRoadmapResult(response.text);
      setRoadmapGrounding(response.groundingChunks);
    } catch (err: any) {
      setError(err.message || "Failed to build your path.");
    } finally {
      setLoading(false);
    }
  };

  const Illustration = ({ type }: { type: TabType }) => {
    return (
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        className="w-64 h-64 absolute right-10 top-24 pointer-events-none hidden lg:block z-0"
      >
        {type === 'match' && <Briefcase className="w-full h-full text-emerald-500" strokeWidth={0.5} />}
        {type === 'roadmap' && <Map className="w-full h-full text-blue-500" strokeWidth={0.5} />}
        {type === 'aptitude' && <Award className="w-full h-full text-amber-500" strokeWidth={0.5} />}
        {type === 'interview' && <MessageSquare className="w-full h-full text-purple-500" strokeWidth={0.5} />}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8 max-w-6xl mx-auto relative">
      <header className="flex flex-col md:flex-row items-center justify-between py-10 gap-6 z-50 relative">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-3 rounded-2xl shadow-xl">
            <span className="text-4xl">🎓</span>
          </div>
          <div>
            <h1 className="text-4xl font-black text-emerald-900 tracking-tighter">Jobsy<span className="text-emerald-500">.</span></h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-600 opacity-60">AI Career Accelerator</p>
          </div>
        </div>
        
        <div className="flex glass p-1.5 rounded-[1.5rem] shadow-xl border border-emerald-100/50">
          {(['match', 'roadmap', 'aptitude', 'interview'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setError(null); }}
              className={`relative px-5 py-2.5 rounded-xl font-bold transition-all duration-500 flex items-center space-x-2 ${
                activeTab === tab ? 'text-white' : 'text-emerald-800 hover:bg-emerald-50'
              }`}
            >
              {activeTab === tab && (
                <motion.div 
                  layoutId="tab-active-pill"
                  className={`absolute inset-0 rounded-xl -z-10 bg-gradient-to-r ${
                    tab === 'match' ? 'from-emerald-500 to-emerald-600' :
                    tab === 'roadmap' ? 'from-blue-500 to-blue-600' :
                    tab === 'aptitude' ? 'from-amber-500 to-amber-600' :
                    'from-purple-500 to-purple-600'
                  }`}
                />
              )}
              <span className="capitalize">{tab}</span>
            </button>
          ))}
        </div>
      </header>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-8 p-4 bg-red-50 border-2 border-red-100 text-red-600 rounded-2xl flex items-center space-x-3">
            <Info className="w-6 h-6" />
            <span className="font-bold">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="glass relative rounded-[3rem] shadow-2xl p-8 md:p-12 min-h-[600px] overflow-hidden">
        <Illustration type={activeTab} />
        
        {activeTab === 'match' && (
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-emerald-900 mb-6">Resume Optimizer</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <textarea value={resume} onChange={(e) => setResume(e.target.value)} className="w-full h-[300px] p-6 bg-white/50 border-2 border-emerald-50 rounded-[2rem] outline-none" placeholder="Your Resume..." />
              <textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} className="w-full h-[300px] p-6 bg-white/50 border-2 border-blue-50 rounded-[2rem] outline-none" placeholder="Job Description..." />
            </div>
            <button onClick={handleMatchAnalysis} disabled={loading} className="w-full bg-emerald-500 text-white font-black py-6 rounded-[2rem] text-xl shadow-xl hover:bg-emerald-600 transition-all">
              {loading ? "Analyzing..." : "Compare & Fix Resume"}
            </button>
            {matchResult && <div className="mt-10 p-8 bg-white/80 rounded-[2rem] shadow-inner"><MarkdownRenderer content={matchResult} /></div>}
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="max-w-4xl mx-auto z-10 relative">
            <h2 className="text-4xl font-black text-emerald-900 mb-6 text-center">Skill Roadmap</h2>
            <div className="flex gap-4 mb-10">
              <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Target Role..." className="flex-1 p-6 rounded-[2rem] border-2 border-blue-100 outline-none" />
              <button onClick={handleRoadmapGen} className="bg-blue-500 text-white px-10 rounded-[2rem] font-bold">Build</button>
            </div>
            {roadmapResult && <MarkdownRenderer content={roadmapResult} groundingChunks={roadmapGrounding} />}
          </div>
        )}

        {activeTab === 'aptitude' && <AptitudeTest />}

        {activeTab === 'interview' && (
          <div className="max-w-4xl mx-auto z-10 relative">
            <h2 className="text-4xl font-black text-emerald-900 mb-6 text-center">Interview Simulator</h2>
            <div className="flex gap-4 mb-10">
              <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role to prep for..." className="flex-1 p-6 rounded-[2rem] border-2 border-purple-100 outline-none" />
              <button onClick={handleInterviewPrep} className="bg-purple-500 text-white px-10 rounded-[2rem] font-bold">Get Ready</button>
            </div>
            {interviewResult && <MarkdownRenderer content={interviewResult} groundingChunks={interviewGrounding} />}
          </div>
        )}
      </main>

      <footer className="mt-16 text-center text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">
        <p>Built for professionals by Jobsy AI &bull; 2024</p>
      </footer>
    </div>
  );
};

// CRITICAL FIX: Add this line at the very end
export default App;
