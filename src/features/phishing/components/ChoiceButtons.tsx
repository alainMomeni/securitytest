import type { UserChoice } from '../types';

type ChoiceButtonsProps = {
  onChoice: (choice: UserChoice) => void;
  disabled: boolean;
};

export const ChoiceButtons = ({ onChoice, disabled }: ChoiceButtonsProps) => {
  const buttonStyle = `
    font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 shadow-md 
    border-2 disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const phishingButtonStyle = `
    bg-red-600 hover:bg-red-700 border-red-800 text-white
    transform disabled:transform-none hover:scale-105
  `;

  const legitimateButtonStyle = `
    bg-green-600 hover:bg-green-700 border-green-800 text-white
    transform disabled:transform-none hover:scale-105
  `;

  return (
    <div className="flex justify-around mt-6 w-full max-w-md">
      <button
        onClick={() => onChoice('phishing')}
        disabled={disabled}
        className={`${buttonStyle} ${phishingButtonStyle}`}
      >
        Phishing
      </button>
      <button
        onClick={() => onChoice('legitimate')}
        disabled={disabled}
        className={`${buttonStyle} ${legitimateButtonStyle}`}
      >
        Légitime
      </button>
    </div>
  );
};