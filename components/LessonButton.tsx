import React from 'react';

interface LessonButtonProps {
  lessonNumber: number;
  onClick: (lessonNumber: number) => void;
  disabled: boolean;
}

const LessonButton: React.FC<LessonButtonProps> = ({ lessonNumber, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      onClick(lessonNumber);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        text-white font-bold py-1 px-3 text-sm rounded-lg shadow-lg transform transition-all duration-300 ease-in-out 
        whitespace-nowrap
        focus:outline-none focus:ring-4
        ${disabled 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-orange-500 hover:bg-orange-600 hover:scale-105 hover:shadow-xl active:scale-95 focus:ring-orange-300'
        }
      `}
    >
      Bài {lessonNumber}
    </button>
  );
};

export default LessonButton;