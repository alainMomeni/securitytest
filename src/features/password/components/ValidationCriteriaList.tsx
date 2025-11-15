import type { ValidationCriteria } from '../types';

const CriteriaItem = ({ label, isValid }: { label: string; isValid: boolean }) => (
  <li className={`flex items-center transition-colors duration-300 ${isValid ? 'text-green-400' : 'text-gray-400'}`}>
    <svg
      className={`w-5 h-5 mr-2 fill-current ${isValid ? 'text-green-500' : 'text-gray-600'}`}
      viewBox="0 0 20 20"
    >
      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
    </svg>
    <span>{label}</span>
  </li>
);

export const ValidationCriteriaList = ({ criteria }: { criteria: ValidationCriteria }) => {
  return (
    <ul className="space-y-2 text-lg">
      <CriteriaItem label="Au moins 12 caractères" isValid={criteria.length} />
      <CriteriaItem label="Une lettre majuscule" isValid={criteria.uppercase} />
      <CriteriaItem label="Une lettre minuscule" isValid={criteria.lowercase} />
      <CriteriaItem label="Au moins un chiffre" isValid={criteria.number} />
      <CriteriaItem label="Au moins un caractère spécial (!@#...)" isValid={criteria.specialChar} />
    </ul>
  );
};