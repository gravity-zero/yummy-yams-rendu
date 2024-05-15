import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import { setCurrentUser } from '../redux/slices/userSlice';
import { decodeToken } from '../lib/jwt';


const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    pseudo: '',
    email: '',
    password: '',
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      const res = await response.json();

      if(!res.success)
      {
        throw new Error(res.message);
      }

      Swal.fire({
        title: 'Enregistrement',
        text: 'Inscription confirmé',
        icon: res.success ? 'success' : 'error',
        timer: 3000
      }).then(() => {
        dispatch(loginSuccess({ token: res.message?.token }));
        const jwtPayload = decodeToken(res.message?.token);
        dispatch(setCurrentUser({ currentUser: jwtPayload?.user }));

        setSuccess(true);
      })

    } catch (error) {
      Swal.fire({
        title: 'Erreur',
        text: error,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success, navigate]);

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="pseudo" className="block text-gray-700">Nom d'utilisateur</label>
          <input
            type="text"
            id="pseudo"
            name="pseudo"
            value={formData.pseudo}
            onChange={handleChange}
            className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">S'inscrire</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
