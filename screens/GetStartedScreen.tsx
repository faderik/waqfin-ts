import { StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import { useDispatch, useSelector } from 'react-redux';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function GetStartedScreen({ navigation }: RootStackScreenProps<'GetStarted'>) {
  const dispatch = useDispatch();

  const checkTokenAsync = async () => {
    let userToken;

    try {
      userToken = await SecureStore.getItemAsync('USERTOKEN');
      console.log('TokenExist: ', userToken);
    } catch (e) {
      console.log("Token doesn't exist!");
    }

    // TODO: After restoring token, we may need to validate it HERE

    if (userToken && userToken !== null) {
      dispatch({ type: 'RESTORE_TOKEN', payload: { userToken } });
      navigation.navigate('Root');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/getstarted-bg.png')}
      style={styles.imageBg}
      resizeMode="cover">
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Waqf.in</Text>
          <Text style={styles.description}>
            <Text style={styles.waqfinBold}>Waqf.in </Text>merupakan aplikasi wakaf berbasis
            blockchain dengan pemetaan lahan sehingga tingkat transparansi dan keamanan yang tinggi
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            checkTokenAsync();
            // navigation.replace('Onboarding');
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
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
