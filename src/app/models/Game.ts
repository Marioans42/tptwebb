import { Platform } from './Platform';
import { Technology } from './Technology';

export class Game {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  link: string;
  Technologies: Technology;
  Platforms: Platform;

}
