import { Entypo } from '@expo/vector-icons';
import { useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Panduan Pengaduan Kasus</Text>
        <Text style={styles.deskripsi}>
          Berikut merupakan panduan yang dapat Anda ikuti untuk membuat laporan kasus.
        </Text>

        <View style={styles.panduanItem}>
          <View style={styles.panduanLeft}>
            <View style={{}}>
              <Entypo name="dot-single" size={30} color="#000000" style={styles.panduanIcon} />
              <View style={styles.upline} />
            </View>
            <Image source={require('../assets/images/panduan/1.png')} style={styles.panduanImg} />
          </View>
          <Text style={styles.panduanTxt}>
            Pelapor mengisi form laporan pengaduan berisikan detail kejadin dan melampirkan bukti
            terkait.
          </Text>
        </View>
        <View style={styles.panduanItem}>
          <View style={styles.panduanLeft}>
            <View style={{}}>
              <View style={styles.uplineup} />
              <Entypo name="dot-single" size={30} color="#000000" style={styles.panduanIcon} />
              <View style={styles.upline} />
            </View>
            <Image source={require('../assets/images/panduan/2.png')} style={styles.panduanImg} />
          </View>
          <Text style={styles.panduanTxt}>
            Pelaporan yang masuk pada aplikasi, akan diverifikasi oleh sistem pelaporan, pengguna
            dapat meninjau proses pelaporan melalui notifikasi.
          </Text>
        </View>
        <View style={styles.panduanItem}>
          <View style={styles.panduanLeft}>
            <View style={{}}>
              <View style={styles.uplineup} />
              <Entypo name="dot-single" size={30} color="#000000" style={styles.panduanIcon} />
              <View style={styles.upline} />
            </View>
            <Image source={require('../assets/images/panduan/3.png')} style={styles.panduanImg} />
          </View>
          <Text style={styles.panduanTxt}>
            Setelah berhasi diverifikasi oleh sistem, selanjutnya pegawai BWI akan memastikan
            langsung detail kejadian dan memproses lebih lanjut.
          </Text>
        </View>
        <View style={styles.panduanItem}>
          <View style={styles.panduanLeft}>
            <View style={{}}>
              <View style={styles.uplineup} />
              <Entypo name="dot-single" size={30} color="#000000" style={styles.panduanIcon} />
              <View style={styles.upline} />
            </View>
            <Image source={require('../assets/images/panduan/4.png')} style={styles.panduanImg} />
          </View>
          <Text style={styles.panduanTxt}>
            Pembentukan tim pembuatan keputusan meliputi: penelaah dan ditelaah, hasil akhir dari
            keputusan dan bukti ini akan menjadi pertimbangan pada sidang.
          </Text>
        </View>
        <View style={styles.panduanItem}>
          <View style={styles.panduanLeft}>
            <View style={{}}>
              <View style={styles.uplineup} />
              <Entypo name="dot-single" size={30} color="#000000" style={styles.panduanIcon} />
            </View>
            <Image source={require('../assets/images/panduan/5.png')} style={styles.panduanImg} />
          </View>
          <Text style={styles.panduanTxt}>
            Putusan sidang dilakukan untuk memberi keputusan akhir pada pelaporan kasus.
          </Text>
        </View>
        <View style={{ marginBottom: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: '#FFFFFF',
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
  panduanItem: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
    overflow: 'visible',
    backgroundColor: 'transparent',
  },
  panduanLeft: {
    width: '35%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    // justifyContent: 'center',
  },
  panduanIcon: {
    alignSelf: 'center',
    left: -5,
    backgroundColor: 'transparent',
  },
  panduanImg: {
    width: '100%',
    resizeMode: 'contain',
    left: -25,
  },
  panduanTxt: {
    fontFamily: 'raleway-400',
    maxWidth: '65%',
    fontSize: 10,
    color: '#000000',
  },
  upline: {
    position: 'absolute',
    zIndex: 999,
    top: 15,
    left: 9,
    width: 2,
    height: 80,
    backgroundColor: '#000000',
  },
  uplineup: {
    position: 'absolute',
    zIndex: 999,
    top: 0,
    left: 9,
    width: 2,
    height: 15,
    backgroundColor: '#000000',
  },
});
