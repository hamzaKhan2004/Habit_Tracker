import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCalculator,
  faFlask,
  faBook,
  faRunning,
  faDumbbell,
  faAppleAlt,
  faBed,
  faWater,
  faBicycle,
  faWalking,
  faHeartbeat,
  faMusic,
  faPen,
  faCode,
  faClock,
  faCheckSquare,
  faSeedling,
  faThermometerHalf,
  faSun,
  faLeaf,
  faBath,
  faUtensils,
  faCoffee,
  faSmile,
  faBrain,
  faPaintBrush,
  faShoppingCart,
  faPencilAlt,
  faJournalWhills,
  faChess,
  faSpa,
  faDrum,
  faDog,
  faCampground,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";

type iconData = {
  faIcon: IconProp;
  isSelected: boolean;
};

export const iconsData: iconData[] = [
  { faIcon: faCalculator, isSelected: false },
  { faIcon: faFlask, isSelected: false },
  { faIcon: faBook, isSelected: false },
  { faIcon: faRunning, isSelected: false },
  { faIcon: faDumbbell, isSelected: false },
  { faIcon: faAppleAlt, isSelected: false },
  { faIcon: faBed, isSelected: false },
  { faIcon: faWater, isSelected: false },
  { faIcon: faBicycle, isSelected: false },
  { faIcon: faWalking, isSelected: false },
  { faIcon: faHeartbeat, isSelected: false },
  { faIcon: faMusic, isSelected: false },
  { faIcon: faPen, isSelected: false },
  { faIcon: faCode, isSelected: false },
  { faIcon: faClock, isSelected: false },
  { faIcon: faCheckSquare, isSelected: false },
  { faIcon: faSeedling, isSelected: false },
  { faIcon: faThermometerHalf, isSelected: false },
  { faIcon: faSun, isSelected: false },
  { faIcon: faLeaf, isSelected: false },
  { faIcon: faBath, isSelected: false },
  { faIcon: faUtensils, isSelected: false },
  { faIcon: faCoffee, isSelected: false },
  { faIcon: faSmile, isSelected: false },
  { faIcon: faBrain, isSelected: false },
  { faIcon: faPaintBrush, isSelected: false },
  { faIcon: faShoppingCart, isSelected: false },
  { faIcon: faPencilAlt, isSelected: false },
  { faIcon: faJournalWhills, isSelected: false },
  { faIcon: faChess, isSelected: false }, // Mind games
  { faIcon: faSpa, isSelected: false }, // Meditation / yoga alternative
  { faIcon: faDrum, isSelected: false }, // Music instruments
  { faIcon: faDog, isSelected: false }, // Pets/animal care
  { faIcon: faCampground, isSelected: false }, // Camping/outdoors
  { faIcon: faGamepad, isSelected: false }, // Video games
];

export function textToIcon(iconText: string): IconProp | string {
  switch (iconText) {
    case "faCalculator":
      return faCalculator;
    case "faFlask":
      return faFlask;
    case "faBook":
      return faBook;
    case "faRunning":
      return faRunning;
    case "faDumbbell":
      return faDumbbell;
    case "faAppleAlt":
      return faAppleAlt;
    case "faBed":
      return faBed;
    case "faWater":
      return faWater;
    case "faBicycle":
      return faBicycle;
    case "faWalking":
      return faWalking;
    case "faHeartbeat":
      return faHeartbeat;
    case "faMusic":
      return faMusic;
    case "faPen":
      return faPen;
    case "faCode":
      return faCode;
    case "faClock":
      return faClock;
    case "faCheckSquare":
      return faCheckSquare;
    case "faSeedling":
      return faSeedling;
    case "faThermometerHalf":
      return faThermometerHalf;
    case "faSun":
      return faSun;
    case "faLeaf":
      return faLeaf;
    case "faBath":
      return faBath;
    case "faUtensils":
      return faUtensils;
    case "faCoffee":
      return faCoffee;
    case "faSmile":
      return faSmile;
    case "faBrain":
      return faBrain;
    case "faPaintBrush":
      return faPaintBrush;
    case "faShoppingCart":
      return faShoppingCart;
    case "faPencilAlt":
      return faPencilAlt;
    case "faJournalWhills":
      return faJournalWhills;
    case "faChess":
      return faChess;
    case "faSpa":
      return faSpa;
    case "faDrum":
      return faDrum;
    case "faDog":
      return faDog;
    case "faCampground":
      return faCampground;
    case "faGamepad":
      return faGamepad;
    default:
      return "Icon not found";
  }
}
