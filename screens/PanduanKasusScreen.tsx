import { Entypo } from '@expo/vector-icons';
import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, Image, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function PanduanKasusScreen({ navigation }: RootStackScreenProps<'PanduanKasus'>) {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTitleStyle: {
        fontFamily: 'raleway-700',
        fontSize: 20,
      },
      headerTintColor: '#000000',
      headerStyle: { backgroundColor: 'transparent' },
      headerShadowVisible: false,
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Panduan Pengaduan Kasus</Text>
      <Text style={styles.deskripsi}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna quisque a augue.
      </Text>

      <Image source={require('../assets/images/panduan-img.png')} style={styles.panduanImg} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: '#FFFFFF',
    paddingBottom: 100,
  },
  title: {
    fontFamily: 'raleway-700',
    fontSize: 22,
    color: '#000000',
    textAlign: 'left',
    maxWidth: '70%',
    // marginTop: 20,
    marginBottom: 10,
  },
  deskripsi: {
    fontFamily: 'raleway-400',
    fontSize: 12,
    color: '#000000',
    marginBottom: 20,
  },
  panduanImg: {
    // backgroundColor: 'red',
    width: '100%',
    resizeMode: 'contain',
  },
});
