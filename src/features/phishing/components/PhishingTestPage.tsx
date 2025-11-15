import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { phishingEmails } from '../data/emails';
import type { UserChoice } from '../types';
import { ChoiceButtons } from './ChoiceButtons';
import { useResults } from '../../../stores/resultsContext'; // <--- IMPORTER ICI

export const PhishingTestPage = () => {
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [answers, setAnswers] = useState<(UserChoice | null)[]>(
    Array(phishingEmails.length).fill(null)
  );
  const navigate = useNavigate();
  const { setPhishingAnswers } = useResults(); // <--- UTILISER LE HOOK

  const handleChoice = (choice: UserChoice) => {
    const newAnswers = [...answers];
    newAnswers[currentEmailIndex] = choice;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentEmailIndex < phishingEmails.length - 1) {
        setCurrentEmailIndex(currentEmailIndex + 1);
      } else {
        // Au lieu de console.log, on sauvegarde dans le contexte
        setPhishingAnswers(newAnswers); // <--- SAUVEGARDER LES RÉSULTATS
        navigate('/test/password');
      }
    }, 500);
  };

  const currentEmail = phishingEmails[currentEmailIndex];
  const hasAnsweredCurrent = answers[currentEmailIndex] !== null;

  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-center mb-2">
          Email {currentEmailIndex + 1} sur {phishingEmails.length}
        </h3>
        <div className="w-full bg-gray-700 rounded-lg h-4">
          <div
            className="bg-cyan-500 h-4 rounded-lg transition-all duration-500"
            style={{ width: `${((currentEmailIndex + 1) / phishingEmails.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <p className="text-lg text-gray-300 mb-6 text-center">
        Analysez l'image de l'email ci-dessous. Est-ce une tentative de phishing ou un email légitime ?
      </p>

      <div className="border-4 border-gray-600 rounded-lg shadow-lg overflow-hidden mb-6 max-w-4xl w-full">
        <img 
          src={currentEmail.imageSrc} 
          alt={`Email example ${currentEmail.id}`}
          className="w-full h-auto"
        />
      </div>

      <ChoiceButtons onChoice={handleChoice} disabled={hasAnsweredCurrent} />
    </div>
  );
};