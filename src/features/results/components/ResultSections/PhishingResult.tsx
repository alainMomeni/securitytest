import { phishingEmails } from '../../../phishing/data/emails';
import type { UserChoice } from '../../../phishing/types';

type PhishingResultProps = {
  answers: (UserChoice | null)[];
};

export const PhishingResult = ({ answers }: PhishingResultProps) => {
  const score = answers.reduce((acc, answer, index) => {
    const correctIsPhishing = phishingEmails[index].isPhishing;
    const userAnsweredPhishing = answer === 'phishing';
    return acc + (correctIsPhishing === userAnsweredPhishing ? 1 : 0);
  }, 0);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2 text-cyan-400">Test de Phishing</h3>
      <p className="text-lg">Votre score : <span className="font-bold text-white">{score} / {phishingEmails.length}</span></p>
    </div>
  );
};