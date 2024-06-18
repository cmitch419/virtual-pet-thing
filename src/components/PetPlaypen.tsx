// src/components/PetPlaypen.tsx
import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { preloadPetAnimations, createPetAnimations } from '../features/pet/PetAnimationConfig';
import { CustomScene } from '../types/CustomScene';
import { CustomSprite } from '../types/CustomSprite';

interface PetPlaypenProps {
  spriteSheet: string;
  frameWidth: number;
  frameHeight: number;
  numberOfFrames: number;
}

const GAME = {
  width: 800,
  height: 600,
};

const BOUNDS = {
  minX: GAME.width * 0.05,
  maxX: GAME.width * 0.95,
  minY: GAME.height * 0.05,
  maxY: GAME.height * 0.95,
};

const PetPlaypen: React.FC<PetPlaypenProps> = ({ spriteSheet, frameWidth, frameHeight, numberOfFrames }) => {
  useEffect(() => {
    const preload = function(this: Phaser.Scene) {
      preloadPetAnimations(this, spriteSheet, frameWidth, frameHeight);
    };

    const create = function(this: Phaser.Scene) {
      const customScene = this as CustomScene;
      createPetAnimations(customScene, numberOfFrames);

      const pet = customScene.add.sprite(GAME.width / 2, GAME.height / 2, 'pet').setScale(2) as CustomSprite;
      pet.play('stand');
      pet.direction = 'stand';

      pet.setInteractive({ draggable: true });

      customScene.input.setDraggable(pet);

      // Handle drag start
      customScene.input.on('dragstart', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite) => {
        gameObject.play('dragging');
        customScene.isDragging = true;
      });

      // Handle dragging
      customScene.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite, dragX: number, dragY: number) => {
        gameObject.x = Phaser.Math.Clamp(dragX, BOUNDS.minX, BOUNDS.maxX);
        gameObject.y = Phaser.Math.Clamp(dragY, BOUNDS.minY, BOUNDS.maxY);
      });

      // Handle drag end
      customScene.input.on('dragend', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite) => {
        const customPet = gameObject as CustomSprite;
        customPet.play(customPet.direction); // Resume the walking animation based on the current direction
        customScene.isDragging = false;
      });

      customScene.pet = pet;
      customScene.isDragging = false;

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
      width: GAME.width,
      height: GAME.height,
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

// Define directions with weights
const directionsWithWeights = [
  { direction: 'stand', weight: 5 },
  { direction: 'walk-left', weight: 1 },
  { direction: 'walk-right', weight: 1 },
  { direction: 'walk-up', weight: 1 },
  { direction: 'walk-down', weight: 1 },
  { direction: 'walk-up-left', weight: 1 },
  { direction: 'walk-up-right', weight: 1 },
  { direction: 'walk-down-left', weight: 1 },
  { direction: 'walk-down-right', weight: 1 },
];

// Utility function to select a direction based on weights
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const weightedRandom = (directionsWithWeights: any[]) => {
  const totalWeight = directionsWithWeights.reduce((sum, item) => sum + item.weight, 0);
  let randomNum = Math.random() * totalWeight;
  for (const item of directionsWithWeights) {
    if (randomNum < item.weight) {
      return item.direction;
    }
    randomNum -= item.weight;
  }
};

const changeDirection = (scene: CustomScene) => {
  const newDirection = weightedRandom(directionsWithWeights);
  if (scene.pet && !scene.isDragging) {
    scene.pet.play(newDirection);
    scene.pet.direction = newDirection;
  }
};

const movePet = (scene: CustomScene, pet: CustomSprite) => {
  const speed = 100;
  const delta = speed * scene.game.loop.delta / 1000;

  switch (pet.direction) {
    case 'stand':
      break;
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

export default PetPlaypen;
