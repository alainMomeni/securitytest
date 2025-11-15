type IncidentResultProps = {
  response: string;
};

export const IncidentResult = ({ response }: IncidentResultProps) => (
  <div>
    <h3 className="text-xl font-semibold mb-2 text-cyan-400">Test de Réaction à Incident</h3>
    <p className="text-lg">Votre plan d'action :</p>
    <blockquote className="whitespace-pre-line bg-gray-700/50 p-4 mt-2 border-l-4 border-gray-500 italic text-gray-300 rounded-r-lg">
      {response}
    </blockquote>
  </div>
);