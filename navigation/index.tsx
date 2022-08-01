/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import {
  ColorSchemeName,
  Platform,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import { View } from '../components/Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import CheckEmailScreen from '../screens/CheckEmailScreen';
import CreatePasswordScreen from '../screens/CreatePasswordScreen';
import GetStartedScreen from '../screens/GetStartedScreen';
import LoginScreen from '../screens/LoginScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import BerandaScreen from '../screens/BerandaScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="GetStarted">
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen
        name="GetStarted"
        component={GetStartedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Group>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="CheckEmail"
          component={CheckEmailScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="CreatePassword"
          component={CreatePasswordScreen}
          options={{ headerShown: true }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const DonasiButton = ({ children, onPress }: any) => (
  <TouchableOpacity style={{ top: -35 }} onPress={onPress} activeOpacity={1}>
    <View
      style={{ backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          backgroundColor: '#30216C',
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          height: 70,
          borderRadius: 35,
          borderColor: '#FFFFFF',
          borderWidth: 3,
        }}>
        {children}
      </View>
      <Text style={{ color: '#FFFFFF', fontSize: 12, fontFamily: 'poppins-500', bottom: -6 }}>
        DONASI
      </Text>
    </View>
  </TouchableOpacity>
);

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Beranda"
      screenOptions={{
        tabBarActiveTintColor: '#DBEC73',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.tabBar,
          ...styles.tabBarShadow,
        },
        tabBarHideOnKeyboard: true,
      }}>
      <BottomTab.Screen
        name="Beranda"
        component={BerandaScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                backgroundColor: 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/icons/beranda.png')}
                resizeMode="contain"
                style={{ width: 23, height: 23, tintColor: color, marginBottom: 0 }}
              />
              <Text style={{ color: color, fontSize: 12, fontFamily: 'poppins-500' }}>Beranda</Text>
            </View>
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Peta"
        component={TabTwoScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                backgroundColor: 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/icons/peta.png')}
                resizeMode="contain"
                style={{ width: 23, height: 23, tintColor: color, marginBottom: 0 }}
              />
              <Text style={{ color: color, fontSize: 12, fontFamily: 'poppins-500' }}>Peta</Text>
            </View>
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Donasi"
        component={TabTwoScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/icons/donasi.png')}
              resizeMode="contain"
              style={{ width: 33, height: 33, tintColor: color, marginBottom: 0 }}
            />
          ),
          tabBarButton: (props) => <DonasiButton {...props} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Patungan"
        component={TabTwoScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                backgroundColor: 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/icons/patungan.png')}
                resizeMode="contain"
                style={{ width: 23, height: 23, tintColor: color, marginBottom: 0 }}
              />
              <Text style={{ color: color, fontSize: 12, fontFamily: 'poppins-500' }}>
                Patungan
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Kasus"
        component={TabTwoScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                backgroundColor: 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/icons/kasus.png')}
                resizeMode="contain"
                style={{ width: 23, height: 23, tintColor: color, marginBottom: 0 }}
              />
              <Text style={{ color: color, fontSize: 12, fontFamily: 'poppins-500' }}>Kasus</Text>
            </View>
          ),
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? 25 : 15,
    left: 15,
    right: 15,
    borderRadius: 12,
    minHeight: 70,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS == 'ios' ? 17 : 0,
    backgroundColor: '#30216C',
  },
  tabBarShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tabBarText: {},
});
