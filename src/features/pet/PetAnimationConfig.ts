import Phaser from 'phaser';

export const preloadPetAnimations = (scene: Phaser.Scene, spriteSheetPath: string, frameWidth: number, frameHeight: number) => {
  scene.load.spritesheet('pet', spriteSheetPath, {
    frameWidth: frameWidth,
    frameHeight: frameHeight,
  });
};

export const createPetAnimations = (scene: Phaser.Scene, numberOfFrames: number) => {
  const frameRate = 15;

  scene.anims.create({
    key: 'stand',
    frames: scene.anims.generateFrameNumbers('pet', { start: 0, end: numberOfFrames - 1 }),
    frameRate,
    repeat: -1,
  });
  scene.anims.create({
    key: 'walk-left',
    frames: scene.anims.generateFrameNumbers('pet', { start: numberOfFrames, end: numberOfFrames * 2 - 1 }),
    frameRate,
    repeat: -1,
  });
  scene.anims.create({
    key: 'walk-right',
    frames: scene.anims.generateFrameNumbers('pet', { start: numberOfFrames * 2, end: numberOfFrames * 3 - 1 }),
    frameRate,
    repeat: -1,
  });
  scene.anims.create({
    key: 'walk-up',
    frames: scene.anims.generateFrameNumbers('pet', { start: numberOfFrames * 3, end: numberOfFrames * 4 - 1 }),
    frameRate,
    repeat: -1,
  });
  scene.anims.create({
    key: 'walk-down',
    frames: scene.anims.generateFrameNumbers('pet', { start: numberOfFrames * 4, end: numberOfFrames * 5 - 1 }),
    frameRate,
    repeat: -1,
  });
  scene.anims.create({
    key: 'walk-up-left',
    frames: scene.anims.generateFrameNumbers('pet', { start: numberOfFrames * 5, end: numberOfFrames * 6 - 1 }),
    frameRate,
    repeat: -1,
  });
  scene.anims.create({
    key: 'walk-up-right',
    frames: scene.anims.generateFrameNumbers('pet', { start: numberOfFrames * 6, end: numberOfFrames * 7 - 1 }),
    frameRate,
    repeat: -1,
  });
  scene.anims.create({
    key: 'walk-down-left',
    frames: scene.anims.generateFrameNumbers('pet', { start: numberOfFrames * 7, end: numberOfFrames * 8 - 1 }),
    frameRate,
    repeat: -1,
  });
  scene.anims.create({
    key: 'walk-down-right',
    frames: scene.anims.generateFrameNumbers('pet', { start: numberOfFrames * 8, end: numberOfFrames * 9 - 1 }),
    frameRate,
    repeat: -1,
  });
};
