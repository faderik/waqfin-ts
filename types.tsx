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
  HistoryWakaf: undefined;
  PanduanKasus: undefined;
  DetailDonasiPatungan: undefined;
  DetailPeta: undefined;
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

export type StoreState = {
  userToken: string | null;
  wakafList: Wakaf[];
  isLoading: boolean;
};

export type WakafLoc = {
  id: number;
  img: string;
  harga: number;
  luas: number;
  initiator: string;
  latlng: { latitude: number; longitude: number };
  address: { main: string; detail: string };
};

export type Patungan = {
  id: number;
  progress: number;
  wakif: number;
  current: string;
  lokasi: { main: string; detail: string };
  luas: number;
  harga: number;
  owner: string;
  img: string;
};

export type Wakaf = {
  id: number;
  namaDonatur: string;

  deskripsi: string;
  lokasi: string;
  luas: number;
  harga: number;
  type: string;
  images: any | null;
};

export type WakafHistory = Wakaf & {
  keterangan: string;
  tglDigunakan: string;
};

export type TopPatungan = {
  id: number;
  lokasi: string;
  image: string;
  deskripsi: string;
};
