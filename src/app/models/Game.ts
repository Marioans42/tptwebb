import { Platform } from './Platform';
import { Technology } from './Technology';

export class Game {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  image: string;
  link: string;
  UsersID: string;
  technologies: any [];
  platforms: any [];
  tags: any [];

}
