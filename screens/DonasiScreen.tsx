import { StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function BerandaScreen({ navigation }: RootTabScreenProps<'Beranda'>) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}>
        <Text style={styles.title}>Sisihkan hartamu untuk wakaf</Text>
        {/* Profil Donatur */}
        <Text style={styles.legendText}>Profil Donatur</Text>
        <View style={styles.form}>
          <View style={styles.label}>
            <Text style={styles.textLabel}>Nama Donatur</Text>
            <Entypo size={7} color="#FC2323" name="star" />
          </View>
          <TextInput style={styles.textInput} />
        </View>
        <View style={styles.form}>
          <View style={styles.label}>
            <Text style={styles.textLabel}>Alamat</Text>
            <Entypo size={7} color="#FC2323" name="star" />
          </View>
          <TextInput style={styles.textInput} />
        </View>
        <View style={styles.form}>
          <View style={styles.label}>
            <Text style={styles.textLabel}>Email</Text>
            <Entypo size={7} color="#FC2323" name="star" />
          </View>
          <TextInput style={styles.textInput} />
        </View>
        <View style={styles.form}>
          <View style={styles.label}>
            <Text style={styles.textLabel}>Telepon/Hp</Text>
            <Entypo size={7} color="#FC2323" name="star" />
          </View>
          <TextInput style={styles.textInput} />
        </View>
        {/* Detail Wakaf */}
        <Text style={styles.legendText}>Detail Wakaf</Text>
        <View style={styles.form}>
          <View style={styles.label}>
            <Text style={styles.textLabel}>Deskripsi</Text>
            <Entypo size={7} color="#FC2323" name="star" />
          </View>
          <TextInput style={styles.textInput} />
        </View>
        <View style={styles.form}>
          <View style={styles.label}>
            <Text style={styles.textLabel}>Lokasi Lahan</Text>
            <Entypo size={7} color="#FC2323" name="star" />
          </View>
          <TextInput style={styles.textInput} />
        </View>
        <View style={styles.form}>
          <View style={styles.label}>
            <Text style={styles.textLabel}>Luas Lahan</Text>
            <Entypo size={7} color="#FC2323" name="star" />
          </View>
          <TextInput style={styles.textInput} />
        </View>
        <View style={styles.form}>
          <View style={styles.label}>
            <Text style={styles.textLabel}>Harga/m2</Text>
            <Entypo size={7} color="#FC2323" name="star" />
          </View>
          <TextInput style={styles.textInput} />
        </View>
        <View style={styles.form}>
          <View style={styles.label}>
            <Text style={styles.textLabel}>Keterangan</Text>
          </View>
          <TextInput style={styles.textInput} />
        </View>
        {/* Button Donate */}
        <TouchableOpacity style={styles.donateBtn}>
          <Image source={require('../assets/icons/donate.png')} style={styles.donateIcon} />
          <Text style={styles.donateText}>Donate</Text>
        </TouchableOpacity>
        {/* Show Additional Information */}
        <Text style={styles.infoTitle}>[+] Tampilkan informasi tambahan</Text>
        <Text style={styles.infoDesc}>
          Sesuai dengan peraturan perpajakan di Indonesia, untuk mendapatkan manfaat sebagai
          pengurang Penghasilan Kena Pajak (PKP) sesuai keputusan Dirjen Pajak No. PER-11/PJ/2017,
          kami memelurkan informasi tambahan mengenai profil diri Anda.
        </Text>
      </ScrollView>
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
    marginHorizontal: 60,
    marginBottom: 20,
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  legendText: {
    fontFamily: 'poppins-700',
    fontSize: 18,
    color: '#FFFFFF',
    marginVertical: 10,
    maxWidth: 100,
    borderBottomColor: '#ABABAB',
    borderBottomWidth: 1,
  },
  form: {
    marginTop: 5,
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  label: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: 100,
  },
  textLabel: {
    color: '#FFF',
    fontFamily: 'poppins-500',
    fontSize: 11,
  },
  textInput: {
    flex: 1,
    maxHeight: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 12,
    // fontFamily: 'poppins-500',
  },
  donateBtn: {
    marginVertical: 20,
    flexDirection: 'row',
    backgroundColor: '#4F82D9',
    borderRadius: 5,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: 'center',
  },
  donateIcon: {
    marginRight: 8,
  },
  donateText: {
    color: '#FFFFFF',
    fontFamily: 'raleway-700',
    fontSize: 12,
  },
  infoTitle: {
    color: '#4F82D9',
    fontFamily: 'poppins-600',
    fontSize: 12,
  },
  infoDesc: {
    fontFamily: 'poppins-500',
    fontSize: 10,
    color: '#FFFFFF',
    marginBottom: 40,
  },
});
