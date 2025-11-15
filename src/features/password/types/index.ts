export type PasswordStrength = {
  score: 0 | 1 | 2 | 3 | 4; // Score de zxcvbn
  level: 'Très faible' | 'Faible' | 'Moyen' | 'Fort' | 'Très fort';
  color: string;
};

export type ValidationCriteria = {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  specialChar: boolean;
};