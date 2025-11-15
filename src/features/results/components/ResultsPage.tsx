import { useState } from 'react';
import axios from 'axios';
import { useResults } from '../../../stores/resultsContext';
import { PhishingResult } from './ResultSections/PhishingResult';
import { PasswordResult } from './ResultSections/PasswordResult';
import { IncidentResult } from './ResultSections/IncidentResult';

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

export const ResultsPage = () => {
  const { results } = useResults();
  const [status, setStatus] = useState<SubmissionStatus>('idle');

  const handleSendResults = async () => {
    setStatus('loading');
    try {
      // C'est l'URL de notre future fonction serverless sur Vercel
      await axios.post('/api/send-results', results);
      setStatus('success');
    } catch (error) {
      console.error("Erreur lors de l'envoi des résultats:", error);
      setStatus('error');
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case 'loading':
        return 'Envoi en cours...';
      case 'success':
        return 'Résultats envoyés !';
      case 'error':
        return 'Échec, Réessayer';
      default:
        return 'Envoyer mes résultats par Email';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Merci d'avoir terminé le test !
      </h2>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-3xl">
        Voici un récapitulatif de vos réponses. Cliquez sur le bouton en bas pour envoyer
        vos résultats à l'évaluateur.
      </p>

      <div className="w-full max-w-3xl space-y-8 bg-gray-700/50 p-8 rounded-lg mb-10">
        <PhishingResult answers={results.phishingAnswers} />
        <hr className="border-gray-600" />
        <PasswordResult 
          password={results.passwordTest.password} 
          explanation={results.passwordTest.explanation} 
        />
        <hr className="border-gray-600" />
        <IncidentResult response={results.incidentResponse} />
      </div>

      <button
        onClick={handleSendResults}
        disabled={status === 'loading' || status === 'success'}
        className={`font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 shadow-lg
                   disabled:cursor-not-allowed disabled:transform-none transform hover:scale-105
                   ${status === 'success' ? 'bg-green-600' : ''}
                   ${status === 'error' ? 'bg-red-600 hover:bg-red-700' : ''}
                   ${status === 'idle' || status === 'loading' ? 'bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600' : ''}
                  `}
      >
        {getButtonContent()}
      </button>
      {status === 'error' && <p className="text-red-400 mt-4">Une erreur est survenue. Veuillez vérifier votre connexion et réessayer.</p>}
      {status === 'success' && <p className="text-green-400 mt-4">Vos résultats ont été envoyés avec succès. Vous pouvez fermer cette page.</p>}
    </div>
  );
};