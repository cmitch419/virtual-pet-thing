import Phaser from 'phaser';
import { CustomSprite } from './CustomSprite';

export interface CustomScene extends Phaser.Scene {
  pet?: CustomSprite;
  isDragging: boolean;
}
