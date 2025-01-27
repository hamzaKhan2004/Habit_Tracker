import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type AreaType = {
  id: number;
  icon: IconProp;
  name: string;
};

type FrequencyType = {
  type: string;
  days: string[];
  number: number;
};

export type HabitType = {
  _id: string;
  name: string;
  icon: IconProp;
  frequency: FrequencyType[];
  notificationTime: string;
  isNotificationOn: boolean;
  areas: AreaType[];
};
