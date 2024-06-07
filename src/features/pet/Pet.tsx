import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { feed, play, rename } from './petSlice';
import PhaserGame from '../../components/PhaserGame';

const Pet: React.FC = () => {
  const pet = useSelector((state: RootState) => state.pet);
  const dispatch = useDispatch();

  return (
    <div className="pet-container">
      <h1>{pet.name}</h1>
      <PhaserGame
        spriteSheet="/sprites/pet-sprite-sheet.png" // Adjust the path if needed
        frameWidth={32}
        frameHeight={32}
        numberOfFrames={4}
      />
      <p>Hunger: {pet.hunger}</p>
      <p>Happiness: {pet.happiness}</p>
      <button onClick={() => dispatch(feed())}>Feed</button>
      <button onClick={() => dispatch(play())}>Play</button>
      <input
        type="text"
        value={pet.name}
        onChange={(e) => dispatch(rename(e.target.value))}
      />
    </div>
  );
};

export default Pet;
