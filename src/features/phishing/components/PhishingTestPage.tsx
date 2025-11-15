import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { phishingEmails } from '../data/emails';
import type { UserChoice } from '../types';
import { ChoiceButtons } from './ChoiceButtons';
import { useResults } from '../../../stores/resultsContext';
import { Spinner } from '../../../components/Elements/Spinner'; // <--- IMPORTER LE SPINNER

export const PhishingTestPage = () => {
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [answers, setAnswers] = useState<(UserChoice | null)[]>(
    Array(phishingEmails.length).fill(null)
  );
  const [isLoadingNext, setIsLoadingNext] = useState(false); // <--- AJOUTER L'ÉTAT DE CHARGEMENT
  const navigate = useNavigate();
  const { setPhishingAnswers } = useResults();

  const handleChoice = (choice: UserChoice) => {
    // 1. Mettre à jour la réponse
    const newAnswers = [...answers];
    newAnswers[currentEmailIndex] = choice;
    setAnswers(newAnswers);

    // 2. Activer le loader immédiatement
    setIsLoadingNext(true);

    // 3. Garder la logique du timeout
    setTimeout(() => {
      if (currentEmailIndex < phishingEmails.length - 1) {
        setCurrentEmailIndex(currentEmailIndex + 1);
        setIsLoadingNext(false); // 4. Désactiver le loader quand on est prêt à afficher le nouvel email
      } else {
        setPhishingAnswers(newAnswers);
        navigate('/test/password');
        // Pas besoin de désactiver le loader ici car la page va changer
      }
    }, 800); // J'ai augmenté un peu le délai pour que le loader soit visible
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

      {/* --- MODIFICATION ICI --- */}
      <div className="border-4 border-gray-600 rounded-lg shadow-lg overflow-hidden mb-6 max-w-4xl w-full min-h-[400px]">
        {/* On affiche le loader OU l'image en fonction de l'état isLoadingNext */}
        {isLoadingNext ? (
          <div className="flex items-center justify-center h-full py-10">
            <Spinner />
          </div>
        ) : (
          <img 
            src={currentEmail.imageSrc} 
            alt={`Email example ${currentEmail.id}`}
            className="w-full h-auto"
          />
        )}
      </div>

      <ChoiceButtons onChoice={handleChoice} disabled={hasAnsweredCurrent} />
    </div>
  );
};