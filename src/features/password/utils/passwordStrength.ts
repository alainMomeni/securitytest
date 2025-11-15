import zxcvbn from 'zxcvbn';
import type { PasswordStrength, ValidationCriteria } from '../types';

// Critères de validation basiques
export const checkPasswordCriteria = (password: string): ValidationCriteria => {
  return {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

// Analyse avec zxcvbn et traduction en un format simple
export const analyzePasswordStrength = (password: string): PasswordStrength => {
  if (!password) {
    return { score: 0, level: 'Très faible', color: 'bg-gray-500' };
  }

  const result = zxcvbn(password);
  const score = result.score;

  switch (score) {
    case 0:
      return { score, level: 'Très faible', color: 'bg-red-700' };
    case 1:
      return { score, level: 'Faible', color: 'bg-red-500' };
    case 2:
      return { score, level: 'Moyen', color: 'bg-yellow-500' };
    case 3:
      return { score, level: 'Fort', color: 'bg-green-500' };
    case 4:
      return { score, level: 'Très fort', color: 'bg-cyan-500' };
    default:
      return { score: 0, level: 'Très faible', color: 'bg-gray-500' };
  }
};