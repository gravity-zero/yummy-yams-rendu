import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import patisserie1 from '../assets/pastries/patisserie1.jpg'
import patisserie2 from '../assets/pastries/patisserie2.jpg'
import patisserie3 from '../assets/pastries/patisserie3.jpg'
import { logout } from '../redux/slices/authSlice';
import { setCurrentUser } from '../redux/slices/userSlice';
import { decodeToken } from '../lib/jwt';

const HomePage = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (token && !currentUser) {
      const jwtPayload = decodeToken(token);
      dispatch(setCurrentUser({ currentUser: jwtPayload?.user }));
    }
  }, [token, currentUser, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setCurrentUser({currentUser: null}));
  }; // Remplacez false par la logique réelle pour vérifier si l'utilisateur est connecté

  return (
    <div>
      <header className="bg-gray-800 p-4 text-white text-center">
        <h1 className="text-3xl font-bold">Bienvenue à la Boulangerie Le Bon Pain</h1>
        <p className="mt-2">Découvrez notre sélection de pains frais et de délicieuses pâtisseries artisanales</p>
        {!isAuthenticated && (
          <>
            <Link to="/register" className="text-blue-400 hover:underline">Inscription</Link>
            <span className="mx-6">
              <Link to="/login" className="text-blue-400 hover:underline">Connexion</Link>
            </span>
          </>
        )}
        {isAuthenticated && (
          <>
            <Link to="/event" className="text-blue-400 hover:underline">Participer à l'évènement</Link>
            <span className="mx-6">
            <button onClick={handleLogout} className="text-blue-400 hover:underline">Se déconnecter</button>
            </span>
          </>
        )}
      </header>
      <main className="container mx-auto py-8">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Notre gamme de pains</h2>
            <p>Du pain de campagne traditionnel aux baguettes croustillantes, nous avons une variété de pains pour tous les goûts.</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Nos pâtisseries artisanales</h2>
            <p>Laissez-vous tenter par nos croissants dorés, nos éclairs au chocolat et nos tartes aux fruits frais.</p>
          </div>
        </section>
      </main>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 px-12">
        <img src={patisserie1} alt="Image de patisseries" className="rounded-lg shadow-md" style={{ width: '80%', height: 'auto' }} />
        <img src={patisserie2} alt="Image de patisseries" className="rounded-lg shadow-md" style={{ width: '80%', height: 'auto' }} />
        <img src={patisserie3} alt="Image de patisseries" className="rounded-lg shadow-md" style={{ width: '80%', height: 'auto' }} />
      </div>
    </div>
  );
};

export default HomePage;