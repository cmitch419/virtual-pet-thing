import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { feed, play, rename } from './features/pet/petSlice';
import PetPlaypen from './components/PetPlaypen';

const App: React.FC = () => {
  const pet = useSelector((state: RootState) => state.pet);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>{pet.name}</h1>
      <PetPlaypen
        spriteSheet="sprites/slimebuddy.png"
        frameWidth={32}
        frameHeight={32}
        numberOfFrames={6}
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

export default App;
