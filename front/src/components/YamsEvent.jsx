import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiceRollRequest, fetchDiceRollSuccess, fetchDiceRollFailure } from '../redux/slices/yamsEventSlice';

const YamsEvent = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loading, error, score, prices } = useSelector((state) => state.yamsEvent); // Obtenir les données de l'état Redux
  const [rolling, setRolling] = useState(false);

  const handleRollDice = async () => {
    setRolling(true); // Démarrez l'animation dès que le bouton est cliqué

    try {
      dispatch(fetchDiceRollRequest()); // Indique le début de la requête
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Utilisez le token dans l'en-tête Authorization
        },
        body: JSON.stringify({ eventName: 'pastries_game' })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la demande de lancer de dé');
      }

      const data = await response.json();
      dispatch(fetchDiceRollSuccess(data)); // Traitez la réponse réussie
    } catch (error) {
      console.error('Erreur lors de la demande de lancer de dé :', error);
      dispatch(fetchDiceRollFailure(error.message)); // Gérez l'échec de la requête
    } finally {
      setRolling(false); // Arrêtez l'animation une fois que la demande est terminée
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleRollDice}
        disabled={rolling} // Désactivez le bouton pendant l'animation
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
      >
        {rolling ? 'Lancement...' : 'Lancer le dé'}
      </button>
      <div className="mt-4 flex">
        {score.map((value, index) => (
          <div key={index} className="mr-4">
            <div className="dice-container">
              <div className={`dice ${rolling ? 'rolling' : ''}`}>{value}</div>
            </div>
            <div className="text-center mt-2">{prices[index]?.name}</div>
          </div>
        ))}
      </div>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default YamsEvent;
