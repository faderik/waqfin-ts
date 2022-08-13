import { Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function DetailDonasiPatunganScreen({
  navigation,
}: RootStackScreenProps<'DetailDonasiPatungan'>) {
  const [pembayaran, setPembayaran] = useState('');
  const [jumlahDonasi, setJumlahDonasi] = useState('Rp.0');

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Donasi',
      headerTitleStyle: {
        fontFamily: 'raleway-700',
        fontSize: 20,
      },
      headerShadowVisible: false,
      headerTintColor: '#000000',
      headerStyle: { backgroundColor: 'transparent' },
    });
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={{ flex: 1, width: '100%', height: '100%' }}>
        {/* Sumary */}
        <View style={styles.sumaryBox}>
          <Image
            source={require('../assets/images/lahan-patungan-1.png')}
            style={styles.sumaryImg}
          />
          <Image source={require('../assets/icons/lokasi.png')} style={styles.lokasiIcon} />
          <View style={styles.lokasi}>
            <Text style={styles.lokasiMain}>Bae, Kudus</Text>
            <Text style={styles.lokasiDetail}>
              Jl. Kampus UMK, Kayuapu Kulon, Gondangmanis, Kec. Bae, Kabupaten Kudus, Jawa Tengah
              59327
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: 'transparent', paddingHorizontal: 20 }}>
          {/* Pilih Jumlah */}
          <Text style={styles.legendText}>Pilih Jumlah</Text>
          <PilihJumlah />

          {/* OR */}
          <Text style={styles.orText}>OR</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter price manually"
            keyboardType="decimal-pad"
            value={jumlahDonasi}
            onChangeText={(text) => setJumlahDonasi(text)}
          />
          {/* Pilih Pembayaran */}
          <Text style={styles.legendText}>Pilih Pembayaran</Text>
          <PilihPembayaran />
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  function PilihJumlah(props: any) {
    const pilihanJumlah = [
      'Rp. 50.000',
      'Rp. 100.000',
      'Rp. 500.000',
      'Rp. 1.000.000',
      'Rp. 10.000.000',
      'Rp. 50.000.000',
    ];

    return (
      <View style={styles.pilihGroup}>
        {pilihanJumlah.map((terpilih, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.pilihItem}
              onPress={() => setJumlahDonasi(terpilih)}>
              <Text style={styles.pilihText}>{terpilih}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  function PilihPembayaran(props: any) {
    const pilihanPemabayaran = [
      { id: 'bni', logo: require('../assets/images/bni.png') },
      { id: 'bri', logo: require('../assets/images/bri.png') },
      { id: 'bca', logo: require('../assets/images/bca.png') },
      { id: 'alfamart', logo: require('../assets/images/alfamart.png') },
      { id: 'indomaret', logo: require('../assets/images/indomaret.png') },
    ];

    return (
      <View style={{}}>
        {pilihanPemabayaran.map((terpilih) => {
          return (
            <PembayaranButton
              key={terpilih.id}
              pembayaranId={terpilih.id}
              logo={terpilih.logo}
              selected={pembayaran}
              jumlah={jumlahDonasi}
            />
          );
        })}
      </View>
    );
  }

  function PembayaranButton(props: any) {
    let isSelected = props.pembayaranId == props.selected ? true : false;
    return (
      <TouchableOpacity
        onPress={async () => {
          let norp = jumlahDonasi.replace('Rp.', '');
          let notitik = norp.replace('.', '');
          let intDonasi = parseInt(notitik);

          console.log('Jumlah Donasi:', intDonasi);

          if (intDonasi < 50000) {
            console.log('Minimum donasi adalah Rp.50.000');
            return alert('Minimum donasi adalah Rp.50.000');
          }

          if (pembayaran != '') navigation.navigate('WakafSukses');
          else {
            console.log('Pilih metode pembayaran dulu');
            return alert('Pilih metode pembayaran dulu');
          }
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: '#e6e6e6',
          borderRadius: 5,
          marginVertical: 5,
        }}>
        <TouchableOpacity onPress={() => setPembayaran(props.pembayaranId)}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View
              style={{
                height: 16,
                width: 16,
                borderRadius: 8,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}>
              {isSelected ? (
                <View
                  style={{
                    height: 8,
                    width: 8,
                    borderRadius: 4,
                    backgroundColor: '#000',
                  }}
                />
              ) : null}
            </View>
            <Image
              source={props.logo}
              style={{ alignSelf: 'flex-end', width: 50, resizeMode: 'contain' }}
            />
          </View>
        </TouchableOpacity>
        <Text style={{ fontFamily: 'poppins-600', fontSize: 12 }}>{props.jumlah}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'poppins-500',
              fontSize: 8,
              lineHeight: 18,
              paddingVertical: 2,
              marginRight: 4,
            }}>
            Confirm & Pay
          </Text>
          <Entypo name="chevron-right" size={10} color="#000" />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    // paddingVertical: 20,
    backgroundColor: '#FFF',
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
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#D1D1D1',
    backgroundColor: '#F7F7F7',
    borderWidth: 1.5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontFamily: 'raleway-600',
    fontSize: 12,
    textAlignVertical: 'center',
    textAlign: 'center',
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
  sumaryBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: '#150A42',
    borderRadius: 10,
  },
  sumaryImg: {
    width: '30%',
    height: '100%',
    resizeMode: 'cover',
    alignSelf: 'flex-start',
    // backgroundColor: 'red',
    borderRadius: 5,
  },
  lokasiIcon: {
    marginHorizontal: 8,
    marginTop: 2,
  },
  lokasi: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  lokasiMain: {
    fontFamily: 'poppins-700',
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  lokasiDetail: {
    flex: 1,
    fontFamily: 'poppins-400',
    fontSize: 10,
    color: '#FFFFFF',
    maxWidth: '80%',
    // backgroundColor: 'red',
  },
  legendText: {
    fontFamily: 'raleway-700',
    fontSize: 16,
    marginVertical: 8,
  },
  pilihGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pilihItem: {
    borderWidth: 1,
    borderColor: '#24116A',
    borderRadius: 5,
    width: '48%',
    marginHorizontal: 1,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pilihText: {
    textAlign: 'center',
    fontFamily: 'poppins-600',
    fontSize: 12,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'poppins-600',
    fontSize: 12,
  },
});
