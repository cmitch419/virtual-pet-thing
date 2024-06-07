// src/components/PhaserGame.tsx
import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { preloadPetAnimations, createPetAnimations } from '../features/pet/PetAnimationConfig';
import { CustomScene } from '../types/CustomScene';
import { CustomSprite } from '../types/CustomSprite';

interface PhaserGameProps {
  spriteSheet: string;
  frameWidth: number;
  frameHeight: number;
  numberOfFrames: number;
}

const BOUNDS = {
  minX: 0,
  maxX: 800,
  minY: 0,
  maxY: 600,
};

const PhaserGame: React.FC<PhaserGameProps> = ({ spriteSheet, frameWidth, frameHeight, numberOfFrames }) => {
  useEffect(() => {
    const preload = function(this: Phaser.Scene) {
      preloadPetAnimations(this, spriteSheet, frameWidth, frameHeight);
    };

    const create = function(this: Phaser.Scene) {
      const customScene = this as CustomScene;
      createPetAnimations(customScene, numberOfFrames);

      const pet = customScene.add.sprite(400, 300, 'pet').setScale(2) as CustomSprite;
      pet.play('walk-down');
      pet.direction = 'walk-down';

      customScene.pet = pet;

      customScene.time.addEvent({
        delay: 2000,
        callback: () => changeDirection(customScene),
        loop: true,
      });
    };

    const update = function(this: Phaser.Scene) {
      const customScene = this as CustomScene;
      if (customScene.pet) {
        movePet(customScene, customScene.pet);
      }
    };

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-game',
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, [spriteSheet, frameWidth, frameHeight, numberOfFrames]);

  return <div id="phaser-game"></div>;
};

const directions = [
  'walk-left',
  'walk-right',
  'walk-up',
  'walk-down',
  'walk-up-left',
  'walk-up-right',
  'walk-down-left',
  'walk-down-right',
];

const changeDirection = (scene: CustomScene) => {
  const newDirection = Phaser.Math.RND.pick(directions);
  if (scene.pet) {
    scene.pet.play(newDirection);
    scene.pet.direction = newDirection;
  }
};

const movePet = (scene: CustomScene, pet: CustomSprite) => {
  const speed = 100;
  const delta = speed * scene.game.loop.delta / 1000;

  switch (pet.direction) {
    case 'walk-left':
      pet.x -= delta;
      if (pet.x < BOUNDS.minX) {
        pet.x = BOUNDS.minX;
        changeDirection(scene);
      }
      break;
    case 'walk-right':
      pet.x += delta;
      if (pet.x > BOUNDS.maxX) {
        pet.x = BOUNDS.maxX;
        changeDirection(scene);
      }
      break;
    case 'walk-up':
      pet.y -= delta;
      if (pet.y < BOUNDS.minY) {
        pet.y = BOUNDS.minY;
        changeDirection(scene);
      }
      break;
    case 'walk-down':
      pet.y += delta;
      if (pet.y > BOUNDS.maxY) {
        pet.y = BOUNDS.maxY;
        changeDirection(scene);
      }
      break;
    case 'walk-up-left':
      pet.y -= delta;
      if (pet.y < BOUNDS.minY) {
        pet.y = BOUNDS.minY;
        changeDirection(scene);
      }
      pet.x -= delta;
      if (pet.x < BOUNDS.minX) {
        pet.x = BOUNDS.minX;
        changeDirection(scene);
      }
      break;
    case 'walk-up-right':
      pet.y -= delta;
      if (pet.y < BOUNDS.minY) {
        pet.y = BOUNDS.minY;
        changeDirection(scene);
      }
      pet.x += delta;
      if (pet.x > BOUNDS.maxX) {
        pet.x = BOUNDS.maxX;
        changeDirection(scene);
      }
      break;
    case 'walk-down-left':
      pet.y += delta;
      if (pet.y > BOUNDS.maxY) {
        pet.y = BOUNDS.maxY;
        changeDirection(scene);
      }
      pet.x -= delta;
      if (pet.x < BOUNDS.minX) {
        pet.x = BOUNDS.minX;
        changeDirection(scene);
      }
      break;
    case 'walk-down-right':
      pet.y += delta;
      if (pet.y > BOUNDS.maxY) {
        pet.y = BOUNDS.maxY;
        changeDirection(scene);
      }
      pet.x += delta;
      if (pet.x > BOUNDS.maxX) {
        pet.x = BOUNDS.maxX;
        changeDirection(scene);
      }
      break;
  }
};

export default PhaserGame;
