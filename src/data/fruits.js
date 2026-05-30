import appleImg from '../assets/fruits/apple.png';
import bananaImg from '../assets/fruits/banana.png';
import cherryImg from '../assets/fruits/cherry.png';
import grapesImg from '../assets/fruits/grapes.png';
import kiwiImg from '../assets/fruits/kiwi.png';
import lemonImg from '../assets/fruits/lemon.png';
import peachImg from '../assets/fruits/peach.png';
import strawberryImg from '../assets/fruits/strawberry.png';
import tangerineImg from '../assets/fruits/tangerine.png';
import watermelonImg from '../assets/fruits/watermelon.png';
import { shuffle } from '../utils/shuffle';

export const FRUITS = [
  { pairId: 0, name: 'Apple', image: appleImg },
  { pairId: 1, name: 'Banana', image: bananaImg },
  { pairId: 2, name: 'Grapes', image: grapesImg },
  { pairId: 3, name: 'Tangerine', image: tangerineImg },
  { pairId: 4, name: 'Strawberry', image: strawberryImg },
  { pairId: 5, name: 'Peach', image: peachImg },
  { pairId: 6, name: 'Cherry', image: cherryImg },
  { pairId: 7, name: 'Kiwi', image: kiwiImg },
  { pairId: 8, name: 'Watermelon', image: watermelonImg },
  { pairId: 9, name: 'Lemon', image: lemonImg },
];

export const PAIR_COUNT = FRUITS.length;

/** Build deck: two cards per fruit, shuffled. Each card has a stable unique id. */
export function createShuffledDeck() {
  const deck = FRUITS.flatMap((fruit) => [
    { id: `${fruit.pairId}-a`, pairId: fruit.pairId, image: fruit.image, name: fruit.name },
    { id: `${fruit.pairId}-b`, pairId: fruit.pairId, image: fruit.image, name: fruit.name },
  ]);
  return shuffle(deck);
}
