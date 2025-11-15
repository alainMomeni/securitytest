import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans antialiased">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12">
          {/* Vous pouvez ajouter un logo ici plus tard */}
          <h1 className="text-4xl font-bold text-center text-cyan-400 tracking-wide">
            Test Pratique de Sécurité Numérique
          </h1>
        </header>
        <main className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl">
          {/* C'est ici que le contenu de chaque page sera injecté */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};