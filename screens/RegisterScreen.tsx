import {
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { useContext, useState } from 'react';
import { FontAwesome, Entypo } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { AuthContext } from '../context';
import * as constants from '../constants';

export default function RegisterScreen({ navigation }: RootStackScreenProps<'Register'>) {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const [namaLengkap, setNamaLengkap] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { signUp } = useContext(AuthContext);

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require('../assets/images/login-bg.png')}
        style={styles.imageBg}
        resizeMode="cover">
        <View style={styles.container}>
          <Text style={styles.title}>Set Up Your Account</Text>
          <Text style={styles.subTitle}>Get ready to explore</Text>
          <View style={styles.formBox}>
            <ScrollView
              style={{ display: 'flex', flex: 1, backgroundColor: 'transparent' }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <Text style={styles.formTitle}>Create Account</Text>

              <>
                <Text style={styles.textLabel}>Nama Lengkap</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="default"
                  placeholder="Budi Santoso"
                  value={namaLengkap}
                  onChangeText={(text) => setNamaLengkap(text)}
                />
              </>
              <>
                <Text style={styles.textLabel}>Email</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="email-address"
                  placeholder="mymail@mail.com"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </>
              <>
                <Text style={styles.textLabel}>Password</Text>
                <View style={styles.formPwd}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="password"
                    secureTextEntry={!showPwd}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                  />
                  <Entypo
                    name={showPwd ? 'eye-with-line' : 'eye'}
                    size={20}
                    style={styles.eyeIcon}
                    onPress={() => setShowPwd(!showPwd)}
                  />
                </View>
                <Text style={styles.hint}>Must be at least 8 characters.</Text>
              </>
              <>
                <Text style={styles.textLabel}>Confirm Password</Text>
                <View style={styles.formPwd}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="password"
                    secureTextEntry={!showConfirmPwd}
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                  />
                  <Entypo
                    name={showConfirmPwd ? 'eye-with-line' : 'eye'}
                    size={20}
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPwd(!showConfirmPwd)}
                  />
                </View>
                <Text style={styles.hint}>Both passsword must match</Text>
              </>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.createBtn}
                  onPress={async () => {
                    console.log('Creating account...');

                    const res = await signUp(namaLengkap, email, password, confirmPassword);
                    if (res.code == 200) {
                      navigation.replace('Root');
                    } else {
                      Alert.alert('Register failed', res.message);
                    }
                  }}>
                  <Text style={styles.createText}>Create</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
                  <Text style={styles.loginText}>Already a user? </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.replace('Login');
                    }}>
                    <Text style={{ ...styles.loginText, color: '#41A4FF' }}>Log In</Text>
                  </TouchableOpacity>
                </View>
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
    marginTop: 120,
  },
  subTitle: {
    fontFamily: 'raleway-400',
    fontSize: 14,
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
    marginBottom: 15,
    marginTop: 40,
  },
  textLabel: {
    fontFamily: 'raleway-600',
    fontSize: 12,
    color: '#868686',
    marginTop: 5,
  },
  formLabel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 15,
  },
  textInput: {
    flex: 1,
    marginTop: 5,
    borderRadius: 5,
    borderColor: '#D1D1D1',
    backgroundColor: '#F7F7F7',
    borderWidth: 1.5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontFamily: 'raleway-600',
    fontSize: 14,
  },
  formPwd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    fontSize: 14,
  },
  eyeIcon: {
    marginLeft: 10,
    bottom: 10,
    right: 10,
    position: 'absolute',
    color: '#959595',
  },
  createText: {
    fontFamily: 'raleway-700',
    fontSize: 18,
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  createBtn: {
    marginTop: 25,
    backgroundColor: '#24116A',
    borderRadius: 10,
    padding: 15,
    width: '100%',
  },
  loginText: {
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
    backgroundColor: 'transparent',
  },
  hint: {
    fontFamily: 'raleway-400',
    fontSize: 10,
    color: '#959595',
    marginTop: 5,
  },
});
