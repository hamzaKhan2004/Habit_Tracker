import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type AreaType = {
  _id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  name: string;
};

export type HabitType = {
  _id?: string;
  name: string;
  icon: IconProp;
  clerkUserId: string;
  frequency: FrequencyType[];
  notificationTime: string;
  isNotificationOn: boolean;
  areas: AreaType[];
  completedDays: CompletedDayType[];
};

type FrequencyType = {
  type: string;
  days: string[];
  number: number;
};

export type CompletedDayType = {
  _id?: string;
  date: string;
};
