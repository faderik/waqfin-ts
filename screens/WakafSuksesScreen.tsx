import { useState } from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, Image, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function WakafSuksesScreen({ navigation }: RootStackScreenProps<'WakafSukses'>) {
  const [hash, setHash] = useState('dcd303b042a1a4972fcccdc0c244519ce78cd1f1904');
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Wakaf Berhasil !</Text>
      <Text style={styles.description}>
        Terimakasih atas partisipasi anda untuk berwakaf. wakaf sudah tercatat pada sistem
        blokchain.
      </Text>
      <Image source={require('../assets/images/sukses.png')} style={styles.suksesImg} />
      {/* Hash Code */}
      <>
        <View style={styles.label}>
          <Image source={require('../assets/icons/hash.png')} style={styles.hashIcon} />
          <Text style={styles.textLabel}>Hash Code</Text>
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.textInput}
            keyboardType="email-address"
            placeholder="mymail@mail.com"
            value={hash}
            editable={false}
          />
          <TouchableOpacity
            style={styles.copyBtn}
            onPress={() => {
              console.log('Copying Hash code...');
              // Show litle popup succes copied
            }}>
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </>
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
  wrapper: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 25,
    backgroundColor: '#180950',
    paddingBottom: 100,
  },
  title: {
    fontFamily: 'raleway-700',
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  description: {
    fontFamily: 'raleway-400',
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    maxWidth: '80%',
    alignSelf: 'center',
  },
  suksesImg: {
    alignSelf: 'center',
    marginVertical: 30,
  },
  textInput: {
    flex: 1,
    height: 30,
    borderRadius: 5,
    borderColor: '#D1D1D1',
    backgroundColor: '#F7F7F7',
    borderWidth: 1.5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontFamily: 'raleway-600',
    fontSize: 12,
    lineHeight: 12,
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  hashIcon: {
    width: 20,
    resizeMode: 'contain',
    marginRight: 10,
    alignSelf: 'center',
  },
  textLabel: {
    fontFamily: 'raleway-700',
    fontSize: 16,
    color: '#FFFFFF',
    alignSelf: 'center',
    lineHeight: 18,
  },
  homeBtn: {
    marginTop: 40,
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
  inputGroup: {
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  copyBtn: {
    backgroundColor: '#58CD72',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    height: 30,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyText: {
    fontFamily: 'raleway-700',
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 14,
  },
});
