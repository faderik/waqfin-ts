import { StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function GetStartedScreen({ navigation }: RootStackScreenProps<'GetStarted'>) {
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require('../assets/images/getstarted-bg.png')}
        style={styles.imageBg}
        resizeMode="cover">
        <View style={styles.textContainer}>
          <Text style={styles.title}>Waqf.in</Text>
          <Text style={styles.description}>
            <Text style={styles.waqfinBold}>Waqf.in </Text>merupakan aplikasi wakaf berbasis
            blockchain dengan pemetaan lahan sehingga tingkat transparansi dan keamanan yang tinggi
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.replace('Onboarding')} style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  textContainer: {
    position: 'absolute',
    top: 100,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontFamily: 'raleway-900',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  waqfinBold: {
    fontFamily: 'raleway-700',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 16,
    fontFamily: 'raleway-400',
    color: '#FFFFFF',
    marginHorizontal: 50,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 90,
    width: '70%',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 50,
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'raleway-700',
    color: '#150A42',
    textAlign: 'center',
  },
  imageBg: {
    flex: 1,
    justifyContent: 'center',
  },
});
