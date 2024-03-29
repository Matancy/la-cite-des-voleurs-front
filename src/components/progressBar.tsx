import React from 'react';

interface ProgressBarProps {
  bgcolor: string;
  completed: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ bgcolor, completed, max }) => {
  const percentage = (completed / max) * 100;

  return (
    <div className="h-6 bg-gray-300 rounded-full">
      <div
        className="h-full rounded-full text-right flex items-center justify-end"
        style={{ width: `${percentage}%` ,backgroundColor: bgcolor }}
      >
        <span className="p-2 text-white ">{`${completed}/${max}`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
