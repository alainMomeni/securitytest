export type Email = {
  id: number;
  imageSrc: string;
  isPhishing: boolean;
};

export type UserChoice = 'phishing' | 'legitimate';