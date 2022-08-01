import { useState } from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, Image, TextInput } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function CreatePasswordScreen({
  navigation,
}: RootStackScreenProps<'ResetPassword'>) {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  navigation.setOptions({
    headerTitle: 'Create new password',
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
        Your new password must be different from previous used passwords
      </Text>
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
            size={18}
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
            size={18}
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPwd(!showConfirmPwd)}
          />
        </View>
        <Text style={styles.hint}>Both passsword must match</Text>
      </>
      <TouchableOpacity
        style={styles.sendBtn}
        onPress={() => {
          console.log('Reseting password...');
          navigation.popToTop();
          // navigation.replace('Login');
        }}>
        <Text style={styles.sendText}>Reset Password</Text>
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
  formPwd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eyeIcon: {
    marginLeft: 10,
    bottom: 10,
    right: 10,
    position: 'absolute',
    color: '#959595',
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
  hint: {
    fontFamily: 'raleway-400',
    fontSize: 10,
    color: '#959595',
    marginTop: 5,
  },
});
