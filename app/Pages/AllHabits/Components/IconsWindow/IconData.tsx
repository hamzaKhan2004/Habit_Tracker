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
  faTools,
  faGlobe,
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
  { faIcon: faGlobe, isSelected: false },
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
    case "faTools":
      return faTools;
    case "faGlobe":
      return faGlobe;
    default:
      return "Icon not found";
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function iconToText(icon: any): string {
  switch (icon.iconName) {
    case "calculator":
      return "faCalculator";
    case "flask":
      return "faFlask";
    case "book":
      return "faBook";
    case "running":
      return "faRunning";
    case "dumbbell":
      return "faDumbbell";
    case "apple-alt":
      return "faAppleAlt";
    case "bed":
      return "faBed";
    case "water":
      return "faWater";
    case "bicycle":
      return "faBicycle";
    case "walking":
      return "faWalking";
    case "heartbeat":
      return "faHeartbeat";
    case "music":
      return "faMusic";
    case "pen":
      return "faPen";
    case "code":
      return "faCode";
    case "clock":
      return "faClock";
    case "check-square":
      return "faCheckSquare";
    case "seedling":
      return "faSeedling";
    case "thermometer-half":
      return "faThermometerHalf";
    case "sun":
      return "faSun";
    case "leaf":
      return "faLeaf";
    case "bath":
      return "faBath";
    case "utensils":
      return "faUtensils";
    case "coffee":
      return "faCoffee";
    case "smile":
      return "faSmile";
    case "brain":
      return "faBrain";
    case "paint-brush":
      return "faPaintBrush";
    case "shopping-cart":
      return "faShoppingCart";
    case "pencil-alt":
      return "faPencilAlt";
    case "journal-whills":
      return "faJournalWhills";
    case "chess":
      return "faChess";
    case "spa":
      return "faSpa";
    case "drum":
      return "faDrum";
    case "dog":
      return "faDog";
    case "campground":
      return "faCampground";
    case "gamepad":
      return "faGamepad";
    case "tools":
      return "faTools";
    case "globe":
      return "faGlobe";
    default:
      return "Icon not found";
  }
}
