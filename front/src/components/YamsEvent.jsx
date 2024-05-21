import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiceRollRequest, fetchDiceRollSuccess, fetchDiceRollFailure } from '../redux/slices/yamsEventSlice';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../redux/slices/userSlice';
import cake1 from '../assets/event/banana-split.jpeg';
import cake2 from '../assets/event/brioche-pain-perdu.jpeg'
import cake3 from '../assets/event/cake-choco.jpeg'
import cake4 from '../assets/event/cake-framboise.jpeg'
import cake5 from '../assets/event/eclair.jpeg'
import cake6 from '../assets/event/fondant.jpeg'
import cake7 from '../assets/event/glaces-vanille.jpeg'
import cake8 from '../assets/event/tarte-poire.jpeg'
import Swal from 'sweetalert2';
import Dice from './Dice';

const YamsEvent = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loading, error, score, prices, result } = useSelector((state) => state.yamsEvent ?? {}); // Obtenir les données de l'état Redux
  const [rolling, setRolling] = useState(false);
  const navigate = useNavigate();

  const composeImagePriceUrl = (value) => {
    let my_image = null

    switch (value.replaceAll(' ', '-'))
    {
      case 'banana-split.jpeg':
        my_image = cake1;
      break;
      case 'brioche-pain-perdu.jpeg':
        my_image = cake2;
      break;
      case 'cake-choco.jpeg':
        my_image = cake3;
      break;
      case 'cake-framboise.jpeg':
        my_image = cake4;
      break;
      case 'eclair.jpeg':
        my_image = cake5;
      break;
      case 'fondant.jpeg':
        my_image = cake6;
      break;
      case 'glaces-vanille.jpeg':
        my_image = cake7;
      break;
      case 'tarte-poire.jpeg':
        my_image = cake8;
      break;
    }

    return my_image
  }

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

      const data = await response.json();

      console.log(data);

      if (!data?.success) {
        //console.log(data.message);
        throw new Error(data?.message);
      }
      dispatch(fetchDiceRollSuccess(data)); // Traitez la réponse réussie
    } catch (error) {
      console.error('Erreur lors de la demande de lancer de dé :', error.message);
      if(error?.message.startsWith("Vous n'êtes pas connecté"))
      {
        dispatch(logout());
        dispatch(setCurrentUser({currentUser: null}));
        return navigate("/login");
      }else{
        Swal.fire({
          title: 'Erreur',
          text: error?.message ?? 'Une erreur s\'est produite lors de la connexion',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      dispatch(fetchDiceRollFailure(error.message));
    } finally {
      setRolling(false);
    }
  };

  const renderPriceResult= (value, index) => {
    const price = prices[index] ?? {};
    const {image, name} = price ?? {};

    return (
      <div className='flex items-center' key={index + "price.result"}>
      {price && image && (
      <div className="flex flex-col items-center mt-2">
        <img src={composeImagePriceUrl(image)} alt={name} className="rounded-lg shadow-md" style={{ width: '100px', height: '100px' }} />
        <div className="text-center mt-2">{name}</div>
      </div>
      )}
    </div>)

  }

  const renderDiceResult = (value, index) => {
    return (<div key={index} className={`'mr-4'`}>
      <Dice value={value} rolling={rolling} />
      </div>)

  }

  return (
    <div className="flex flex-col items-center">
      {result && <div className="text-center text-2xl font-bold mb-4">Résultat: <u>{result}</u></div>}
      <div className="flex justify-center">
      {prices && prices[0]?.image && ( <div>Vous avez gagnée :)</div>)}
        {score?.map((value, index) => (
          renderDiceResult(value, index)
        ))}
      </div>
      <div>
        {prices?.map((price, index) => (
          renderPriceResult(price, index)
        ))}
      </div>
      
      <button
        onClick={handleRollDice}
        disabled={rolling}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out mt-4"
      >
        {rolling ? 'Lancement...' : 'Lancer le dé'}
      </button>
    </div>
  );
};

export default YamsEvent;
