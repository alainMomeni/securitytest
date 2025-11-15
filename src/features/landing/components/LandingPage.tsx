import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResults } from '../../../stores/resultsContext';

export const LandingPage = () => {
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', email: '' });
  const navigate = useNavigate();
  const { setUserInfo: setGlobalUserInfo } = useResults();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo.firstName && userInfo.lastName && userInfo.email) {
      setGlobalUserInfo(userInfo); // Sauvegarder dans le contexte global
      navigate('/test/phishing'); // Démarrer le test
    }
  };

  const isFormInvalid = !userInfo.firstName || !userInfo.lastName || !userInfo.email;

  const inputStyle = "w-full p-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500";

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-3xl font-semibold mb-4 text-white">
        Bienvenue !
      </h2>
      <p className="max-w-2xl mb-8 text-gray-300">
        Veuillez entrer vos informations pour commencer l'évaluation pratique.
      </p>
      
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
        <div>
          <label htmlFor="firstName" className="block text-left text-gray-300 mb-1">Prénom</label>
          <input type="text" name="firstName" id="firstName" value={userInfo.firstName} onChange={handleChange} className={inputStyle} required />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-left text-gray-300 mb-1">Nom</label>
          <input type="text" name="lastName" id="lastName" value={userInfo.lastName} onChange={handleChange} className={inputStyle} required />
        </div>
        <div>
          <label htmlFor="email" className="block text-left text-gray-300 mb-1">Adresse Email</label>
          <input type="email" name="email" id="email" value={userInfo.email} onChange={handleChange} className={inputStyle} required />
        </div>
        
        <button
          type="submit"
          disabled={isFormInvalid}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-transform transform hover:scale-105 duration-300 shadow-lg disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none"
        >
          Commencer le Test
        </button>
      </form>
    </div>
  );
};