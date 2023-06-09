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
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { useMemo } from 'react';

import CheckEmailScreen from '../screens/CheckEmailScreen';
import CreatePasswordScreen from '../screens/CreatePasswordScreen';
import GetStartedScreen from '../screens/GetStartedScreen';
import LoginScreen from '../screens/LoginScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import BerandaScreen from '../screens/BerandaScreen';
import { RootStackParamList, RootTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import DonasiScreen from '../screens/DonasiScreen';
import PatunganScreen from '../screens/PatunganScreen';
import DetailLahanScreen from '../screens/DetailLahanScreen';
import WakafSuksesScreen from '../screens/WakafSuksesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PengaduanKasusScreen from '../screens/PengaduanKasusScreen';
import PanduanKasusScreen from '../screens/PanduanKasusScreen';
import DetailDonasiPatunganScreen from '../screens/DetailDonasiPatunganScreen';
import PetaScreen from '../screens/PetaScreen';
import DetailPetaScreen from '../screens/DetailPetaScreen';
import { AuthContext } from '../context';
import { View } from '../components/Themed';
import { host } from '../constants';
import HistoryWakafScreen from '../screens/HistoryWakafScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const dispatch = useDispatch();

  const authContext = useMemo(
    () => ({
      signIn: async (email: string, password: string) => {
        dispatch({ type: 'SET_LOADING_BEGIN' });
        return fetch(host + '/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
          redirect: 'follow',
        })
          .then((response) => response.json())
          .then(async (response) => {
            if (response.code != 200) {
              dispatch({ type: 'SET_LOADING_END' });
              return response;
            }

            let userToken = response.data.token;
            // Add error handler HERE
            dispatch({
              type: 'SIGN_IN',
              payload: { userToken: userToken },
            });

            // Persist the token using `SecureStore`
            await SecureStore.setItemAsync('USERTOKEN', userToken);
            dispatch({ type: 'SET_LOADING_END' });

            return response;
          })
          .catch((err) => {
            dispatch({ type: 'SET_LOADING_END' });
            Alert.alert('Error', 'Something went wrong');
            console.error(err);
          });
      },
      signOut: async () => {
        dispatch({ type: 'SET_LOADING_BEGIN' });
        let userToken = await SecureStore.getItemAsync('USERTOKEN').then(async (token) => token);

        dispatch({ type: 'SIGN_OUT' });
        SecureStore.deleteItemAsync('USERTOKEN');

        if (!userToken) {
          return -1;
        }

        const bearer = 'Bearer ' + userToken;

        return fetch(host + '/logout', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: bearer,
          },
        })
          .then((response) => response.json())
          .then(async (response) => {
            if (response.code != 200) {
              Alert.alert('Error', response.message);

              dispatch({ type: 'SET_LOADING_END' });
              return response;
            }

            dispatch({ type: 'SET_LOADING_END' });
            return response;
          });
      },
      signUp: async (name: string, email: string, password: string, confirmPassword: string) => {
        dispatch({ type: 'SET_LOADING_BEGIN' });

        return fetch(host + '/register', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password, confirm_password: confirmPassword }),
          redirect: 'follow',
        })
          .then((response) => response.json())
          .then(async (response) => {
            if (response.code != 200) {
              dispatch({ type: 'SET_LOADING_END' });
              return response;
            } else {
              console.log('TOKEN| ', response.data.token);
            }

            let userToken = response.data.token;
            // Add error handler HERE
            dispatch({
              type: 'SIGN_UP',
              payload: { userToken: userToken },
            });

            // Persist the token using `SecureStore`
            await SecureStore.setItemAsync('USERTOKEN', userToken);

            dispatch({ type: 'SET_LOADING_END' });
            return response;
          })
          .catch((err) => {
            dispatch({ type: 'SET_LOADING_END' });
            Alert.alert('Error', 'Something went wrong');
            console.error(err);
          });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
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
      <Stack.Screen
        name="DetailLahan"
        component={DetailLahanScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="WakafSukses"
        component={WakafSuksesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true }} />
      <Stack.Screen name="HistoryWakaf" component={HistoryWakafScreen} options={{ headerShown: true }} />
      <Stack.Screen
        name="PanduanKasus"
        component={PanduanKasusScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="DetailDonasiPatungan"
        component={DetailDonasiPatunganScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="DetailPeta"
        component={DetailPetaScreen}
        options={{ headerShown: true }}
      />
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
      <View style={styles.donasiBtn}>{children}</View>
      <Text style={{ color: '#FFFFFF', fontSize: 12, fontFamily: 'poppins-500', bottom: -6 }}>
        Donasi
      </Text>
    </View>
  </TouchableOpacity>
);

function BottomTabNavigator() {
  const [bottomFontSize, setBottomFontSize] = React.useState(12);
  const [flag, setFlag] = React.useState(false);

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
            <View style={styles.tabBarGroup}>
              <Image
                source={require('../assets/icons/beranda.png')}
                resizeMode="contain"
                style={{ width: 23, height: 23, tintColor: color, marginBottom: 0 }}
              />
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{ color: color, fontSize: bottomFontSize, fontFamily: 'poppins-500' }}>
                Beranda
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Peta"
        component={PetaScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.tabBarGroup}>
              <Image
                source={require('../assets/icons/peta.png')}
                resizeMode="contain"
                style={{ width: 23, height: 23, tintColor: color, marginBottom: 0 }}
              />
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{ color: color, fontSize: bottomFontSize, fontFamily: 'poppins-500' }}>
                Peta
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Donasi"
        component={DonasiScreen}
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
        component={PatunganScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.tabBarGroup}>
              <Image
                source={require('../assets/icons/patungan.png')}
                resizeMode="contain"
                style={{ width: 23, height: 23, tintColor: color, marginBottom: 0 }}
              />
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                onLayout={(e) => {
                  !flag && setBottomFontSize((e.nativeEvent.layout.height / 20) * 12);
                  setFlag(true);
                }}
                style={{ color: color, fontSize: bottomFontSize, fontFamily: 'poppins-500' }}>
                Donasi Bersama
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Kasus"
        component={PengaduanKasusScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.tabBarGroup}>
              <Image
                source={require('../assets/icons/kasus.png')}
                resizeMode="contain"
                style={{ width: 23, height: 23, tintColor: color, marginBottom: 0 }}
              />
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{ color: color, fontSize: bottomFontSize, fontFamily: 'poppins-500' }}>
                Kasus
              </Text>
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
  donasiBtn: {
    backgroundColor: '#30216C',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: '#FFFFFF',
    borderWidth: 3,
  },
  tabBarGroup: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
