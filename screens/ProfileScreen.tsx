import { Entypo } from '@expo/vector-icons';
import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, Image, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function ProfileScreen({ navigation }: RootStackScreenProps<'Profile'>) {
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
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>My Profile</Text>

      <Image source={require('../assets/images/profile.png')} style={styles.profileImg} />
      <View style={styles.profileBox}>
        <Text style={styles.nameText}>Aldi Kurniawan</Text>
        <Text style={styles.alamatText}>
          Jl. Lkr. Utara, Kayuapu Kulon, Gondangmanis, Kec. Bae, Kabupaten Kudus, Jawa Tengah 59327
        </Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.linkBtn}
        onPress={() => {
          console.log('Navigating to EditProfile');
          // navigation.replace('EditProfile');
        }}>
        <Text style={styles.linkText}>Edit Profile</Text>
        <Entypo name="chevron-right" size={10} color={'#FFF'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkBtn}
        onPress={() => {
          console.log('Navigating to Notifications');
          // navigation.replace('Notifications');
        }}>
        <Text style={styles.linkText}>Notifications</Text>
        <Entypo name="chevron-right" size={10} color={'#FFF'} />
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => {
          console.log('Loging out...');
          navigation.replace('Login');
        }}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: '#FFFFFF',
    paddingBottom: 100,
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
  },
  logoutText: {
    fontFamily: 'raleway-700',
    fontSize: 12,
    color: '#FFFFFF',
    alignSelf: 'center',
  },
});
