/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  GetStarted: undefined;
  Onboarding: undefined;
  Register: undefined;

  Login: undefined;
  ResetPassword: undefined;
  CheckEmail: undefined;
  CreatePassword: undefined;
  DetailLahan: undefined;
  WakafSukses: undefined;
  Profile: undefined;
  PanduanKasus: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Beranda: undefined;
  Peta: undefined;
  Donasi: undefined;
  Patungan: undefined;
  Kasus: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type Patungan = {
  progress: number;
  wakif: number;
  current: string;
  lokasi: { main: string; detail: string };
  luas: string;
  owner: string;
};
