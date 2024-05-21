import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { setCurrentUser } from '../redux/slices/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setCurrentUser({ currentUser: null }));
  };

  return (
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
  );
};

export default Header;
