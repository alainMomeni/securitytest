type PasswordResultProps = {
  password: string;
  explanation: string;
};

export const PasswordResult = ({ password, explanation }: PasswordResultProps) => (
  <div>
    <h3 className="text-xl font-semibold mb-2 text-cyan-400">Test de Mot de Passe</h3>
    <p className="text-lg mb-1">Mot de passe créé : <span className="font-mono bg-gray-700 px-2 py-1 rounded">{password}</span></p>
    <p className="text-lg">Votre explication : <span className="italic text-gray-300">"{explanation}"</span></p>
  </div>
);