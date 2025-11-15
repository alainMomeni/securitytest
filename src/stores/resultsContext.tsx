import { createContext, useContext, useState, type ReactNode } from 'react';
import type { UserChoice } from '../features/phishing/types';

// 1. Définir la structure pour les informations de l'utilisateur
interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
}

// 2. Ajouter les informations de l'utilisateur à la structure des résultats
interface TestResults {
  userInfo: UserInfo;
  phishingAnswers: (UserChoice | null)[];
  passwordTest: {
    password: string;
    explanation: string;
  };
  incidentResponse: string;
}

// 3. Ajouter la nouvelle fonction de mise à jour au type du contexte
interface ResultsContextType {
  results: TestResults;
  setUserInfo: (info: UserInfo) => void;
  setPhishingAnswers: (answers: (UserChoice | null)[]) => void;
  setPasswordTest: (password: string, explanation: string) => void;
  setIncidentResponse: (response: string) => void;
}

const ResultsContext = createContext<ResultsContextType | undefined>(undefined);

export const ResultsProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<TestResults>({
    // 4. Initialiser le nouvel état
    userInfo: { firstName: '', lastName: '', email: '' },
    phishingAnswers: [],
    passwordTest: { password: '', explanation: '' },
    incidentResponse: '',
  });

  // 5. Créer la fonction pour mettre à jour les informations de l'utilisateur
  const setUserInfo = (info: UserInfo) => {
    setResults(prev => ({ ...prev, userInfo: info }));
  };

  const setPhishingAnswers = (answers: (UserChoice | null)[]) => {
    setResults(prev => ({ ...prev, phishingAnswers: answers }));
  };

  const setPasswordTest = (password: string, explanation:string) => {
    setResults(prev => ({ ...prev, passwordTest: { password, explanation } }));
  };

  const setIncidentResponse = (response: string) => {
    setResults(prev => ({ ...prev, incidentResponse: response }));
  };

  // 6. Exposer la nouvelle fonction via le Provider
  return (
    <ResultsContext.Provider value={{ results, setUserInfo, setPhishingAnswers, setPasswordTest, setIncidentResponse }}>
      {children}
    </ResultsContext.Provider>
  );
};

export const useResults = () => {
  const context = useContext(ResultsContext);
  if (context === undefined) {
    throw new Error('useResults must be used within a ResultsProvider');
  }
  return context;
};