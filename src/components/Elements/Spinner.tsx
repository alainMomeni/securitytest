export const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      {/* Ceci est un simple spinner créé avec les classes de Tailwind CSS */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500"></div>
    </div>
  );
};