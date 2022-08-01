import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, Image, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function CheckEmailScreen({ navigation }: RootStackScreenProps<'CheckEmail'>) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTitleStyle: {
        fontFamily: 'raleway-700',
        fontSize: 20,
      },
      headerShadowVisible: false,
      // headerLeft: () => (
      //   <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 20, bottom: 0 }}>
      //     <Image source={require('../assets/icons/back.png')} style={{ height: 12 }} />
      //   </TouchableOpacity>
      // ),
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      <Image
        source={require('../assets/images/checkemail.png')}
        style={{ alignSelf: 'center', marginBottom: 20 }}
      />
      <Text style={styles.title}>Check your email</Text>
      <Text style={styles.description}>
        We have send a password recover instructioons to you email.
      </Text>
      <TouchableOpacity
        style={styles.openBtn}
        onPress={() => {
          console.log('Sending email...');
          navigation.push('CreatePassword');
        }}>
        <Text style={styles.openText}>Open email app</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => {
          console.log('Sending email...');
          navigation.popToTop();
        }}>
        <Text style={styles.description}>Skip, I’ll confirm later</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  title: {
    fontFamily: 'raleway-700',
    fontSize: 22,
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    fontFamily: 'raleway-400',
    color: '#000000',
    marginVertical: 10,
    textAlign: 'center',
  },
  openBtn: {
    backgroundColor: '#24116A',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    alignSelf: 'center',
  },
  openText: {
    fontFamily: 'raleway-700',
    fontSize: 12,
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  link: {},
});
