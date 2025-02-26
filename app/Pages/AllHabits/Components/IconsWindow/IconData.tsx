import { IconProp } from "@fortawesome/fontawesome-svg-core";
// Regular icons if you need them
import {
  faQuestionCircle,
  faQuestionCircle as faQuestionRegular,
} from "@fortawesome/free-regular-svg-icons";

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

const iconMap: Record<string, IconProp> = {
  faCalculator: faCalculator,
  faFlask: faFlask,
  faBook: faBook,
  faRunning: faRunning,
  faDumbbell: faDumbbell,
  faAppleAlt: faAppleAlt,
  faBed: faBed,
  faWater: faWater,
  faBicycle: faBicycle,
  faWalking: faWalking,
  faHeartbeat: faHeartbeat,
  faMusic: faMusic,
  faPen: faPen,
  faCode: faCode,
  faClock: faClock,
  faCheckSquare: faCheckSquare,
  faSeedling: faSeedling,
  faThermometerHalf: faThermometerHalf,
  faSun: faSun,
  faLeaf: faLeaf,
  faBath: faBath,
  faUtensils: faUtensils,
  faCoffee: faCoffee,
  faSmile: faSmile,
  faBrain: faBrain,
  faPaintBrush: faPaintBrush,
  faShoppingCart: faShoppingCart,
  faPencilAlt: faPencilAlt,
  faJournalWhills: faJournalWhills,
  faChess: faChess,
  faSpa: faSpa,
  faDrum: faDrum,
  faDog: faDog,
  faCampground: faCampground,
  faGamepad: faGamepad,
  faTools: faTools,
  faGlobe: faGlobe,
  // Regular version of question mark
  faQuestionCircle: faQuestionRegular,
};

// ✅ Fixed function to handle prefix and correct mapping
export function textToIcon(iconText: string, prefix: string = "fas"): IconProp {
  // Normalize prefix
  if (prefix === "far") {
    return faQuestionRegular;
  }

  // Lookup icon
  return iconMap[iconText] || faQuestionCircle;
}

// ✅ Updated `iconToText` function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function iconToText(icon: any): string {
  if (!icon || !icon.iconName) {
    return "";
  }

  return icon.iconName; // Store only the icon name in DB
}
