import React from 'react';

interface Props {
  content: string;
  groundingChunks?: any[];
}

const MarkdownRenderer: React.FC<Props> = ({ content }) => {
  return (
    <div className="prose prose-emerald max-w-none whitespace-pre-wrap text-gray-700 leading-relaxed">
      {content}
    </div>
  );
};

export default MarkdownRenderer;
