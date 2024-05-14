import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { decodeToken } from '../lib/jwt';

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  if(token)
  {
    navigate("/");
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);

        if (data.success) {
          dispatch(setCurrentUser({ currentUser: decodeToken(data.message.token) }));
          //TODO Event
          navigate("/");
        }
      // Swal.fire({
      //   title: 'Connexion',
      //   text: data.message,
      //   icon: data.success ? 'success' : 'error',
      //   confirmButtonText: 'OK'
      // }).then(() => {
      //   const payload = decodeToken(data.message);
      //   if (data.success) {
      //     dispatch(setCurrentUser({ currentUser: payload }));
      //     //TODO Event
      //     navigate("/");
      //   }
      // });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Erreur',
        text: 'Une erreur s\'est produite lors de la connexion',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Connexion</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;