import { StyleSheet, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import * as Location from 'expo-location';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function OnboardingScreen({ navigation }: RootStackScreenProps<'Onboarding'>) {
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require('../assets/images/onboarding-bg.png')}
        style={styles.imageBg}
        resizeMode="cover">
        <View style={styles.textContainer}>
          <Text style={styles.title}>Temukan lokasi strategis lahan wakaf !</Text>
          <Text style={styles.description}>
            dapatkan informasi pemetaan lahan wakaf dengan mengaktifkan location dan nikmati fitur
            indikator lahan
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            requestLocationPermission();
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Enable Location</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
          <Text style={styles.nextText}>Selanjutnya</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const requestLocationPermission = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.error('Error: Location permission not granted');
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  // setLocation(location);
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  textContainer: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 100 : 60,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'raleway-700',
    color: '#FFFFFF',
    marginBottom: 8,
    paddingLeft: '10%',
    maxWidth: '70%',
  },
  description: {
    fontSize: 16,
    fontFamily: 'raleway-400',
    color: '#FFFFFF',
    paddingHorizontal: '10%',
  },
  button: {
    position: 'absolute',
    bottom: 90,
    width: '70%',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 50,
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'raleway-700',
    color: '#150A42',
    textAlign: 'center',
  },
  imageBg: {
    flex: 1,
    justifyContent: 'center',
  },
  nextText: {
    color: '#FFFFFF',
    fontFamily: 'raleway-700',
    fontSize: 18,
  },
  link: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 50,
  },
});
