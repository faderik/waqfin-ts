import { useState } from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, Image, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function ResetPasswordScreen({ navigation }: RootStackScreenProps<'ResetPassword'>) {
  const [email, setEmail] = useState('');

  navigation.setOptions({
    headerTitle: 'Reset Password',
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

  return (
    <View style={styles.wrapper}>
      <Text style={styles.description}>
        Enter the email associated with your account and we’ll send an email with instructions to
        reset your password.
      </Text>
      <>
        <Text style={styles.textLabel}>Email address</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="email-address"
          placeholder="mymail@mail.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </>
      <TouchableOpacity
        style={styles.sendBtn}
        onPress={() => {
          console.log('Sending email...');
          navigation.push('CheckEmail');
        }}>
        <Text style={styles.sendText}>Send Instructions</Text>
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
  description: {
    fontSize: 12,
    fontFamily: 'raleway-400',
    color: '#000000',
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    maxHeight: 40,
    marginTop: 5,
    borderRadius: 5,
    borderColor: '#D1D1D1',
    backgroundColor: '#F7F7F7',
    borderWidth: 1.5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontFamily: 'raleway-600',
    fontSize: 12,
  },
  textLabel: {
    fontFamily: 'raleway-600',
    fontSize: 12,
    color: '#868686',
    marginTop: 5,
  },
  sendBtn: {
    marginTop: 15,
    backgroundColor: '#24116A',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    alignSelf: 'center',
  },
  sendText: {
    fontFamily: 'raleway-700',
    fontSize: 12,
    color: '#FFFFFF',
    alignSelf: 'center',
  },
});
