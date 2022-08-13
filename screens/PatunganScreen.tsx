import { StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import { Patungan, RootTabScreenProps } from '../types';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PatunganScreen({ navigation }: RootTabScreenProps<'Patungan'>) {
  const [patungan, setPatungan] = useState<Patungan[]>([
    {
      progress: 90,
      current: 'Rp.955.670.200',
      lokasi: {
        main: 'Bae, Kudus',
        detail:
          'Jl. Kampus UMK, Kayuapu Kulon, Gondangmanis, Kec. Bae, Kabupaten Kudus, Jawa Tengah 59327',
      },
      luas: '590M2',
      owner: 'Bpk. Parman Solekan',
      wakif: 120,
    },
    {
      progress: 65,
      current: 'Rp.850.110.000',
      lokasi: {
        main: 'Keputih, Sukolilo',
        detail: 'Jl. Keputih Gg.IIB No.52, Surabaya, Jawa Timur, 66151',
      },
      luas: '122 M2',
      owner: 'Bpk. Aldi Saputra',
      wakif: 68,
    },
    {
      progress: 21,
      current: 'Rp.211.110.000',
      lokasi: {
        main: 'Gebang, Sukolilo',
        detail: 'Jl. Gebang Gg.IIIC No.96, Surabaya, Jawa Timur, 66132',
      },
      luas: '564 M2',
      owner: 'Bpk. Yoga Maulana',
      wakif: 200,
    },
    {
      progress: 34,
      current: 'Rp.21.110.000',
      lokasi: {
        main: 'Mulyosari, Sukolilo',
        detail: 'Jl. Mulyosari Gg.IA No.31, Surabaya, Jawa Timur, 66340',
      },
      luas: '123 M2',
      owner: 'Bpk. Deni Sumargo',
      wakif: 90,
    },
  ]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.title}>Bersama peduli sesama</Text>
      {/* Option Box */}
      <View style={styles.optionBox}>
        {/* <TouchableOpacity style={styles.optionItem}>
          <Image source={require('../assets/icons/category.png')} style={styles.optionIcon} />
          <Text style={styles.optionText}>Category</Text>
          <Entypo size={10} color="#FFF" name="chevron-down" />
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.optionItem}>
          <Image source={require('../assets/icons/filter.png')} style={styles.optionIcon} />
          <Text style={styles.optionText}>Filter</Text>
          <Entypo size={10} color="#FFF" name="chevron-down" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <Image source={require('../assets/icons/sortby.png')} style={styles.optionIcon} />
          <Text style={styles.optionText}>Sort By</Text>
          <Entypo size={10} color="#FFF" name="chevron-down" />
        </TouchableOpacity>
      </View>
      {/* List Patungan */}
      <FlatList
        data={patungan}
        renderItem={_patunganRenderItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );

  function _patunganRenderItem({ item, index }: { item: Patungan; index: number }) {
    return (
      <View style={styles.patunganItem}>
        {/* <Image source={{ uri: 'https://placeimg.com/150/150/nature' }} style={styles.topItemImg} /> */}
        <View style={{ backgroundColor: 'transparent' }}>
          <Image
            source={require('../assets/images/lahan-patungan-1.png')}
            style={styles.patunganImg}
          />
          <TouchableOpacity
            style={styles.patunganLinker}
            onPress={() => {
              console.log('Navigating to Detail Lahan...');
              navigation.navigate('DetailLahan');
            }}>
            <Image source={require('../assets/icons/linker.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.legend}>
          <Text style={styles.legendText}>Progress Donasi</Text>
          <Text style={styles.legendText}>{item.wakif} Wakif</Text>
        </View>
        <View style={styles.progressSection}>
          <View style={styles.progressWhite}>
            <View
              style={{
                backgroundColor: '#5DD314',
                width: item.progress + '%',
                height: 5,
                borderRadius: 5,
              }}></View>
          </View>
          <Text style={styles.progressText}>{item.progress}%</Text>
        </View>
        {/* Nilai patungan sekarang */}
        <Text style={styles.currentText}>{item.current}</Text>
        {/* Detail */}
        <View style={styles.detailPatungan}>
          <View style={styles.detailLeft}>
            <Image
              source={require('../assets/icons/lokasi.png')}
              style={styles.detailPatunganIcon}
            />
          </View>
          <View style={styles.lokasi}>
            <Text style={styles.detailTitleText}>{item.lokasi.main}</Text>
            <Text style={styles.lokasiDetail}>{item.lokasi.detail}</Text>
          </View>
        </View>
        <View style={styles.detailPatungan}>
          <View style={styles.detailLeft}>
            <Image source={require('../assets/icons/luas.png')} style={styles.detailPatunganIcon} />
          </View>
          <Text style={styles.detailTitleText}>{item.luas}</Text>
        </View>
        <View style={styles.detailPatungan}>
          <View style={styles.detailLeft}>
            <Image
              source={require('../assets/icons/owner.png')}
              style={styles.detailPatunganIcon}
            />
          </View>
          <Text style={styles.detailTitleText}>{item.owner}</Text>
        </View>
        {/* Button */}
        <TouchableOpacity
          style={styles.donateBtn}
          onPress={() => {
            console.log('Navigating to Donate page...');
            navigation.push('DetailDonasiPatungan');
          }}>
          <Text style={styles.donateText}>Donate</Text>
          <Image source={require('../assets/icons/donate.png')} style={styles.donateIcon} />
        </TouchableOpacity>
      </View>
    );
  }
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
  optionBox: {
    flexDirection: 'row',
    borderTopColor: '#FFF',
    borderTopWidth: 1,
    backgroundColor: 'transparent',
    padding: 5,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionItem: {
    backgroundColor: 'transparenta',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  optionText: {
    color: '#FFFFFF',
    fontFamily: 'poppins-500',
    fontSize: 10,
    marginHorizontal: 5,
  },
  optionIcon: {
    width: 20,
    resizeMode: 'contain',
  },
  patunganItem: {
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginVertical: 5,
  },
  patunganImg: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 5,
  },
  patunganLinker: {
    position: 'absolute',
    right: 0,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },
  legendText: {
    color: '#FFFFFF',
    fontFamily: 'poppins-400',
    fontSize: 11,
  },
  progressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: 'transparent',
    // paddingHorizontal: 10,
    marginLeft: 10,
  },
  progressWhite: {
    backgroundColor: '#FFFFFF',
    height: 5,
    width: '100%',
    maxWidth: '85%',
    borderRadius: 5,
    marginVertical: 4,
    marginRight: 5,
  },
  progressText: {
    color: '#FFFFFF',
    fontFamily: 'poppins-700',
    fontSize: 10,
  },
  currentText: {
    color: '#FFFFFF',
    fontFamily: 'poppins-700',
    fontSize: 14,
    marginBottom: 7,
    paddingHorizontal: 10,
  },
  donateBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    alignSelf: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  donateText: {
    color: '#180950',
    fontFamily: 'poppins-700',
    fontSize: 10,
  },
  donateIcon: {
    tintColor: '#180950',
    marginLeft: 5,
    width: 13,
    resizeMode: 'contain',
  },
  detailPatungan: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'transparent',
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  detailLeft: {
    backgroundColor: 'transparent',
    minWidth: 15,
    marginRight: 20,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  detailPatunganIcon: {
    // padding: 15,
    maxWidth: 20,
    maxHeight: 20,
    resizeMode: 'contain',
  },
  detailTitleText: {
    color: '#FFFFFF',
    fontFamily: 'poppins-600',
    fontSize: 12,
  },
  lokasi: {
    backgroundColor: 'transparent',
    maxWidth: '90%',
  },
  lokasiDetail: {
    color: '#FFFFFF',
    fontFamily: 'poppins-500',
    fontSize: 10,
  },
});
