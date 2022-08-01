import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sorry, This screen is under maintanance !</Text>
      <Image source={require('../assets/images/404.png')} style={styles.notFoundImg} />
      <TouchableOpacity
        style={styles.homeBtn}
        onPress={() => {
          console.log('Navigating to Beranda...');
          navigation.replace('Root');
        }}>
        <Text style={styles.homeText}>Back To Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#150A42',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
    paddingHorizontal: 40,
  },
  title: {
    fontFamily: 'poppins-600',
    fontSize: 20,
    color: '#FFFFFF',
    maxWidth: '80%',
    textAlign: 'center',
  },
  notFoundImg: {
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
  },
  homeBtn: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    width: '60%',
    alignSelf: 'center',
  },
  homeText: {
    fontFamily: 'raleway-700',
    fontSize: 12,
    color: '#000000',
    alignSelf: 'center',
  },
});
