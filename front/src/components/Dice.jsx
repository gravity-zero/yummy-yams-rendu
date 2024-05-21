import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import gsap from "gsap";
import "../assets/css/yamsEvent.css";

const Dice = ({ value, dontShuffle = false }) => {
  const faces = [
    value,
    ...gsap.utils.shuffle([1, 2, 3, 4, 5, 6].filter((v) => v !== value)),
  ];

  const dice = useRef(null);

  useEffect(() => {
    if (!dice.current || dontShuffle) return;

    const ctx = gsap.context(() => {
      gsap.from(dice.current, {
        rotationX: "random(720, 1080)",
        rotationY: "random(720, 1080)",
        rotationZ: 0,
        duration: "random(2, 3)",
      });
    }, dice.current);
    
    return () => ctx.revert();
  }, [value, dontShuffle]); // Dépendance sur la valeur et dontShuffle

  return (
    <div className="dice-container">
      <div className="dice" ref={dice}>
        {faces.map((face, index) => (
          <div key={index} className="face text-black">
            {face}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dice;
