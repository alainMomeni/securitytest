import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResults } from '../../../stores/resultsContext'; // <--- IMPORTER ICI

export const IncidentTestPage = () => {
  const [response, setResponse] = useState('');
  const navigate = useNavigate();
  const { setIncidentResponse } = useResults(); // <--- UTILISER LE HOOK

  const isResponseProvided = response.trim().length > 10;

  const handleSubmit = () => {
    if (isResponseProvided) {
      setIncidentResponse(response); // <--- SAUVEGARDER LES RÉSULTATS
      navigate('/results');
    }
  };

  const scenario = `
    Vous recevez une alerte de sécurité par email qui indique que votre compte 
    email professionnel a été consulté depuis un lieu inhabituel (en Chine), 
    alors que vous êtes actuellement à Yaoundé.
  `;
  

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4">
        Test de Réaction à un Incident
      </h2>

      <div className="w-full max-w-3xl mb-8 p-6 bg-yellow-900/30 border border-yellow-500 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-yellow-400 mb-2">Scénario :</h3>
        <p className="text-lg text-yellow-200 whitespace-pre-line">
          {scenario.trim()}
        </p>
      </div>

      <div className="w-full max-w-3xl mb-8">
        <label htmlFor="response" className="block text-lg text-gray-300 mb-2">
          Décrivez, dans l'ordre, les étapes que vous suivriez pour gérer cette situation :
        </label>
        <textarea
          id="response"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          rows={8}
          className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-lg text-white text-lg focus:outline-none focus:border-cyan-500"
          placeholder="1. Première action..."
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isResponseProvided}
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 shadow-lg
                   disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none transform hover:scale-105"
      >
        Terminer le Test et Voir les Résultats
      </button>
    </div>
  );
};