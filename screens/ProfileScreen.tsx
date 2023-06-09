import { Entypo } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { Text, View } from '../components/Themed';
import { host } from '../constants';
import { AuthContext } from '../context';
import { RootStackScreenProps, StoreState } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../components/LoadingScreen';

export default function ProfileScreen({ navigation }: RootStackScreenProps<'Profile'>) {
  const { signOut } = useContext(AuthContext);
  const [profile, setProfile] = useState<any>({});

  const isLoading = useSelector((state: StoreState) => state.isLoading);
  const dispatch = useDispatch();

  const getProfile = async () => {
    dispatch({ type: 'SET_LOADING_BEGIN' });

    let userToken = await SecureStore.getItemAsync('USERTOKEN').then(async (token) => token);

    fetch(host + '/profile', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response.code != 200) {
          return response;
        }

        setProfile(response.data);
        return response;
      });
    dispatch({ type: 'SET_LOADING_END' });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTitleStyle: {
        fontFamily: 'raleway-700',
        fontSize: 20,
      },
      headerShadowVisible: false,
      headerTintColor: '#000000',
      headerStyle: { backgroundColor: 'transparent' },
    });

    getProfile();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.wrapper}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}>
          <Text style={styles.title}>My Profile</Text>

          <Image source={require('../assets/images/profile.png')} style={styles.profileImg} />
          <View style={styles.profileBox}>
            <Text style={styles.nameText}>{profile.name}</Text>
            <Text style={styles.alamatText}>{profile.alamat ?? 'Alamat Belum Diatur'}</Text>
          </View>

          {/* Buttons */}
          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => {
              // navigation.replace('EditProfile');
            }}>
            <Text style={styles.linkText}>Edit Profile</Text>
            <Entypo name="chevron-right" size={10} color={'#FFF'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => {
              navigation.replace('HistoryWakaf');
            }}>
            <Text style={styles.linkText}>Riwayat Wakaf</Text>
            <Entypo name="chevron-right" size={10} color={'#FFF'} />
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={async () => {
              let res = await signOut();
              navigation.replace('Login');
            }}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      {isLoading && <LoadingScreen background="#aeaeae90" color="blue" />}
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 40,
    // paddingVertical: 40,
    backgroundColor: '#FFFFFF',
    // paddingBottom: 100,
  },
  title: {
    fontFamily: 'raleway-700',
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  profileImg: {
    width: 70,
    height: 70,
    borderColor: '#FFFFFF',
    borderWidth: 3,
    borderRadius: 70,
    alignSelf: 'center',
    zIndex: 2,
  },
  profileBox: {
    backgroundColor: '#202934',
    borderRadius: 10,
    padding: 30,
    paddingTop: 40,
    top: -35,
  },
  nameText: {
    fontFamily: 'raleway-700',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  alamatText: {
    fontFamily: 'raleway-500',
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 5,
  },
  linkBtn: {
    backgroundColor: '#202934',
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkText: {
    fontFamily: 'raleway-600',
    fontSize: 12,
    color: '#FFFFFF',
  },
  logoutBtn: {
    marginTop: 40,
    backgroundColor: '#E12E2E',
    borderRadius: 5,
    padding: 10,
    width: '60%',
    alignSelf: 'center',
    marginBottom: 100,
  },
  logoutText: {
    fontFamily: 'raleway-700',
    fontSize: 12,
    color: '#FFFFFF',
    alignSelf: 'center',
  },
});
