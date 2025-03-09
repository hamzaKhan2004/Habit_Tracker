/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type AreaType = {
  _id?: string;
  icon: any;
  clerkUserId: string;
  name: string;
};

export type HabitType = {
  _id?: string;
  name: string;
  icon: any;
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
