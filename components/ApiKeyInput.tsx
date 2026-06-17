
import React, { useState, useEffect } from 'react';

interface ApiKeyInputProps {
  onSave: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onSave }) => {
  const [key, setKey] = useState(() => localStorage.getItem('gemini-api-key') || '');
  const [showKey, setShowKey] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSave(key);
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [key, onSave]);

  const handleSaveAndClose = () => {
    onSave(key);
    setIsInputVisible(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsInputVisible(!isInputVisible)}
        className="p-2 text-gray-500 hover:text-orange-600 transition-colors rounded-full hover:bg-gray-100 focus:outline-none"
        title="Cài đặt API Key"
        aria-label="Cài đặt API Key"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
      
      {isInputVisible && (
        <div className="absolute top-10 right-0 z-50 bg-white p-3 rounded-lg shadow-xl border border-gray-200 animate-fade-in w-80 sm:w-96">
          <div className="relative w-full">
            <input
              type={showKey ? 'text' : 'password'}
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                      handleSaveAndClose();
                  }
              }}
              placeholder="Dán API Key của bạn vào đây"
              className="w-full px-3 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition pr-10"
              aria-label="API Key Input"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={showKey ? 'Ẩn API Key' : 'Hiện API Key'}
            >
              {showKey ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2 2 0 012.828 2.828l1.515 1.515A4 4 0 0014 10a4 4 0 10-5.464-3.464zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
          <div className="mt-2 flex justify-end">
            <button
                onClick={handleSaveAndClose}
                className="bg-orange-500 text-white text-xs font-bold py-1 px-3 rounded hover:bg-orange-600 transition-colors shadow"
            >
                Lưu & Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeyInput;
