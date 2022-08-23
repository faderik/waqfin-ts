import { StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import { FontAwesome, Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import { Text, View } from '../components/Themed';
import { Patungan, RootTabScreenProps, StoreState, Wakaf } from '../types';
import { ReactNode, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { host } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../components/LoadingScreen';

export default function PatunganScreen({ navigation }: RootTabScreenProps<'Patungan'>) {
  const [patungan, setPatungan] = useState<Patungan[]>([]);

  let wakafList: Patungan[] = [];

  const [harga, setHarga] = useState<'asc' | 'desc' | ''>('');
  const [luas, setLuas] = useState<'asc' | 'desc' | ''>('');

  const isLoading = useSelector((state: StoreState) => state.isLoading);
  const dispatch = useDispatch();

  const sortLuasPatungan = async (type: any) => {
    setLuas(type);
    patungan.sort((a, b) => {
      return type == 'asc' ? b.luas - a.luas : a.luas - b.luas;
    });
  };
  const sortHargaPatungan = async (type: any) => {
    setHarga(type);
    patungan.sort((a, b) => {
      return type == 'asc' ? b.harga - a.harga : a.harga - b.harga;
    });
  };
  const formatRupiah = (nominal: number) => {
    const format = nominal.toString().split('').reverse().join('');
    const convert = format.match(/\d{1,3}/g);
    const rupiah = 'Rp ' + convert?.join('.').split('').reverse().join('');

    return rupiah;
  };
  const ArrowIcon = (props: any) => {
    if (props.type === 'asc' || props.type === 'desc') {
      return (
        <Feather name={props.type === 'asc' ? 'arrow-down' : 'arrow-up'} size={10} color={'#fff'} />
      );
    } else {
      return <Entypo name={'select-arrows'} size={10} color={'#fff'} />;
    }
  };
  const getAllWakaf = async () => {
    dispatch({ type: 'SET_LOADING_BEGIN' });
    let userToken = await SecureStore.getItemAsync('USERTOKEN').then(async (token) => token);

    fetch(host + '/wakaf', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response.code != 200) {
          alert('Something went wrong');
        }

        let arr = response.data as [];
        arr.forEach((wakaf: any) => {
          if (wakaf.type == 'crowdfunding') {
            let curr: string, progress: number;

            curr = wakaf.payments_sum_amount ? wakaf.payments_sum_amount.split('.')[0] : '0';
            progress = Math.floor((parseInt(curr) / (wakaf.luas * wakaf.harga)) * 100);

            wakafList.push({
              id: wakaf.id,
              progress: progress,
              current: formatRupiah(parseInt(curr)),
              lokasi: {
                main: 'Alamat',
                detail: wakaf.lokasi,
              },
              luas: wakaf.luas,
              harga: wakaf.harga,
              owner: wakaf.nama_donatur,
              wakif: wakaf.payments_count,
              img: wakaf.images[0] ? wakaf.images[0] : '',
            });
          }
        });

        setPatungan(wakafList);
        dispatch({ type: 'SET_LOADING_END' });
      });
  };

  useEffect(() => {
    getAllWakaf();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.wrapper}>
        <Text style={styles.title}>Bersama peduli sesama</Text>
        {/* Option Box */}
        <View style={styles.optionBox}>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => {
              harga != 'asc' ? sortHargaPatungan('asc') : sortHargaPatungan('desc');
            }}>
            <Text style={styles.optionText}>Harga</Text>
            <ArrowIcon type={harga} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => {
              luas != 'asc' ? sortLuasPatungan('asc') : sortLuasPatungan('desc');
            }}>
            <Text style={styles.optionText}>Luas Tanah</Text>
            <ArrowIcon type={luas} />
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
      {isLoading && <LoadingScreen background="#18095090" color="#FFF" />}
    </>
  );

  function _patunganRenderItem({ item, index }: { item: Patungan; index: number }) {
    return (
      <View style={styles.patunganItem}>
        {/* <Image source={{ uri: 'https://placeimg.com/150/150/nature' }} style={styles.topItemImg} /> */}
        <View style={{ backgroundColor: 'transparent' }}>
          <Image
            source={
              item.img
                ? { uri: item.img, width: 200, height: 100 }
                : require('../assets/images/lahan-patungan-1.png')
            }
            style={styles.patunganImg}
          />
          <TouchableOpacity
            style={styles.patunganLinker}
            onPress={() => {
              navigation.navigate('DetailLahan', { id: item.id } as any);
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
            <Entypo name="location-pin" size={20} color={'#fff'} />
          </View>
          <View style={styles.lokasi}>
            <Text style={styles.detailTitleText}>{item.lokasi.main}</Text>
            <Text style={styles.lokasiDetail}>{item.lokasi.detail}</Text>
          </View>
        </View>
        <View style={styles.detailPatungan}>
          <View style={styles.detailLeft}>
            <Entypo name="price-tag" size={20} color={'#fff'} />
          </View>
          <Text style={styles.detailTitleText}>{formatRupiah(item.harga)}</Text>
        </View>
        <View style={styles.detailPatungan}>
          <View style={styles.detailLeft}>
            <Entypo name="area-graph" size={18} color={'#fff'} />
          </View>
          <Text style={styles.detailTitleText}>{item.luas} M2</Text>
        </View>
        <View style={styles.detailPatungan}>
          <View style={styles.detailLeft}>
            <FontAwesome5 name="user-circle" size={20} color={'#fff'} />
          </View>
          <Text style={styles.detailTitleText}>{item.owner}</Text>
        </View>
        {/* Button */}
        <TouchableOpacity
          style={styles.donateBtn}
          onPress={() => {
            navigation.push('DetailDonasiPatungan', { id: item.id } as any);
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
    // borderTopWidth: 1,
    backgroundColor: 'transparent',
    padding: 5,
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  optionItem: {
    backgroundColor: 'transparenta',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#FFF',
    marginHorizontal: 2,
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 2,
    justifyContent: 'center',
  },
  optionText: {
    color: '#FFFFFF',
    fontFamily: 'poppins-400',
    fontSize: 12,
    marginHorizontal: 5,
  },
  optionIcon: {
    width: 20,
    resizeMode: 'contain',
  },
  patunganItem: {
    backgroundColor: 'transparent',
    borderWidth: 1,
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
    minHeight: 150,
    maxHeight: 150,
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
