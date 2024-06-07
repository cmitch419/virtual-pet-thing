import Phaser from 'phaser';

export interface CustomSprite extends Phaser.GameObjects.Sprite {
  direction: string;
}
