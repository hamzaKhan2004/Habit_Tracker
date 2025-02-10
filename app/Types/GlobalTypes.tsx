import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type AreaType = {
  _id: string;
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
  completedDays: CompletedDayType[];
};

export type CompletedDayType = {
  _id: string;
  date: string;
};
