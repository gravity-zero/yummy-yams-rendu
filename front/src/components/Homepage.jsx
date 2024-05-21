import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import patisserie1 from '../assets/pastries/patisserie1.jpg';
import patisserie2 from '../assets/pastries/patisserie2.jpg';
import patisserie3 from '../assets/pastries/patisserie3.jpg';
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

  return (
    <div>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 px-12">
        <img src={patisserie1} alt="Image de pâtisseries" className="rounded-lg shadow-md" style={{ width: '80%', height: 'auto' }} />
        <img src={patisserie2} alt="Image de pâtisseries" className="rounded-lg shadow-md" style={{ width: '80%', height: 'auto' }} />
        <img src={patisserie3} alt="Image de pâtisseries" className="rounded-lg shadow-md" style={{ width: '80%', height: 'auto' }} />
      </div>
    </div>
  );
};

export default HomePage;