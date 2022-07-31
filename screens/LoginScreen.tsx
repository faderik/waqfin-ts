import {
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { useState } from 'react';
import { FontAwesome, Entypo } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
  const [showPwd, setShowPwd] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require('../assets/images/login-bg.png')}
        style={styles.imageBg}
        resizeMode="cover">
        <View style={styles.container}>
          <Image source={require('../assets/images/logo-notext.png')} style={styles.logo} />
          <Text style={styles.title}>Wakaf amal jariyah hingga surga</Text>
          <View style={styles.formBox}>
            <ScrollView
              style={{ display: 'flex', flex: 1, backgroundColor: 'transparent' }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <Text style={styles.formTitle}>Login</Text>
              <View style={styles.formLabel}>
                <Image
                  source={require('../assets/icons/mail.png')}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />
                <Text style={{ fontFamily: 'raleway-600', fontSize: 15, color: '#868686' }}>
                  Email
                </Text>
              </View>
              <TextInput
                style={styles.textInput}
                keyboardType="email-address"
                placeholder="myemail@mail.com"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <View style={styles.formLabel}>
                <Image
                  source={require('../assets/icons/password.png')}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />
                <Text style={{ fontFamily: 'raleway-600', fontSize: 15, color: '#868686' }}>
                  Password
                </Text>
              </View>
              <View style={styles.formPwd}>
                <TextInput
                  style={styles.textInput}
                  placeholder="password"
                  secureTextEntry={!showPwd}
                  placeholderTextColor="#bababa"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                <Entypo
                  name={showPwd ? 'eye-with-line' : 'eye'}
                  size={20}
                  style={{ marginLeft: 10, bottom: 30, right: 10, position: 'absolute' }}
                  onPress={() => setShowPwd(!showPwd)}
                />
              </View>

              <TouchableOpacity>
                <Text style={styles.resetText}>Reset Password</Text>
              </TouchableOpacity>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={() => {
                    console.log('Logging In...');
                  }}>
                  <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.replace('Register');
                  }}>
                  <Text style={styles.registerText}>Create Account</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    minHeight: '100%',
  },
  imageBg: {
    flex: 1,
  },
  title: {
    fontFamily: 'raleway-700',
    fontSize: 24,
    color: '#FFFFFF',
    paddingHorizontal: '10%',
  },
  logo: {
    marginTop: 80,
    alignSelf: 'center',
    marginBottom: 20,
  },
  formBox: {
    flex: 1,
    paddingHorizontal: 40,
    marginTop: 30,
    marginBottom: 0,
    bottom: 0,
    height: '100%',
    minWidth: '100%',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  formTitle: {
    fontFamily: 'raleway-700',
    fontSize: 18,
    marginBottom: 30,
    marginTop: 40,
  },
  formLabel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    maxHeight: 50,
    minHeight: 50,
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    borderColor: '#C9C9C9',
    fontFamily: 'raleway-600',
    fontSize: 17,
  },
  formPwd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resetText: {
    fontFamily: 'raleway-600',
    fontSize: 12,
    color: '#41A4FF',
    opacity: 0.5,
    marginBottom: 30,
  },
  loginText: {
    fontFamily: 'raleway-700',
    fontSize: 18,
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  loginBtn: {
    // position: 'absolute',
    // bottom: 30,
    backgroundColor: '#24116A',
    borderRadius: 10,
    padding: 15,
    width: '100%',
  },
  registerText: {
    // position: 'absolute',
    // bottom: 0,
    color: '#150A42',
    fontFamily: 'raleway-600',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  buttons: {
    alignContent: 'flex-end',
    alignItems: 'center',
    justifyContent: Platform.OS == 'ios' ? 'flex-end' : 'flex-start',
    minHeight: 200,
    flex: 1,
    width: '100%',
    // backgroundColor: 'red',
  },
});