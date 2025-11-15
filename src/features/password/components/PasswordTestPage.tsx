import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzePasswordStrength, checkPasswordCriteria } from '../utils/passwordStrength';
import { ValidationCriteriaList } from './ValidationCriteriaList';
import { useResults } from '../../../stores/resultsContext'; // <--- IMPORTER ICI

export const PasswordTestPage = () => {
  const [password, setPassword] = useState('');
  const [explanation, setExplanation] = useState('');
  const navigate = useNavigate();
  const { setPasswordTest } = useResults(); // <--- UTILISER LE HOOK

  const strength = useMemo(() => analyzePasswordStrength(password), [password]);
  const criteria = useMemo(() => checkPasswordCriteria(password), [password]);
  const isPasswordStrongEnough = strength.score >= 3;

  const handleSubmit = () => {
    if (isPasswordStrongEnough) {
      setPasswordTest(password, explanation); // <--- SAUVEGARDER LES RÉSULTATS
      navigate('/test/incident');
    }
  };

  
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4">
        Test de Création de Mot de Passe
      </h2>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-3xl">
        Créez un mot de passe fort pour un compte professionnel. Les indicateurs ci-dessous vous guideront en temps réel.
      </p>

      <div className="w-full max-w-2xl mb-8">
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Entrez votre mot de passe ici"
          className="w-full p-4 text-xl bg-gray-700 border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          autoComplete="off"
        />
        <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
          <div
            className={`h-2.5 rounded-full transition-all duration-300 ${strength.color}`}
            style={{ width: `${(strength.score / 4) * 100}%` }}
          ></div>
        </div>
        <p className="text-right mt-2 font-bold text-lg" style={{ color: strength.color.startsWith('bg-') ? '' : strength.color }}>
          Force : {strength.level}
        </p>
      </div>

      <div className="w-full max-w-2xl mb-8 p-6 bg-gray-700/50 rounded-lg">
        <ValidationCriteriaList criteria={criteria} />
      </div>

      <div className="w-full max-w-2xl mb-8">
         <label htmlFor="explanation" className="block text-lg text-gray-300 mb-2">
            Expliquez brièvement pourquoi ce mot de passe est sécurisé :
         </label>
         <textarea
            id="explanation"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            rows={3}
            className="w-full p-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            placeholder="Ex: Il est long, mélange plusieurs types de caractères et n'utilise pas de mot du dictionnaire..."
         />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isPasswordStrongEnough}
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 shadow-lg
                   disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none transform hover:scale-105"
      >
        Étape Suivante
      </button>
    </div>
  );
};