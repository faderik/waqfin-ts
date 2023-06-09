import { StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import { FontAwesome, Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import { Text, View } from '../components/Themed';
import { Patungan, RootStackScreenProps, StoreState, Wakaf, WakafHistory } from '../types';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { host } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../components/LoadingScreen';

export default function HistoryWakafScreen({ navigation }: RootStackScreenProps<'HistoryWakaf'>) {
  const [histories, setHistories] = useState<WakafHistory[]>([]);

  let wakafHistories: WakafHistory[] = [];

  const isLoading = useSelector((state: StoreState) => state.isLoading);
  const dispatch = useDispatch();

  const formatRupiah = (nominal: number) => {
    const format = nominal.toString().split('').reverse().join('');
    const convert = format.match(/\d{1,3}/g);
    const rupiah = 'Rp ' + convert?.join('.').split('').reverse().join('');

    return rupiah;
  };
 
  const getAllWakafHistory = async () => {
    dispatch({ type: 'SET_LOADING_BEGIN' });
    let userToken = await SecureStore.getItemAsync('USERTOKEN').then(async (token) => token);

    fetch(host + '/wakaf/histories', {
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
          if (wakaf.type == 'mandiri') {
            console.log(wakaf.images);

            wakafHistories.push({
              id: wakaf.id,
              deskripsi: wakaf.deskripsi,
              images: wakaf.images,
              harga: wakaf.harga,
              lokasi: wakaf.lokasi,
              luas: wakaf.luas,
              namaDonatur: wakaf.nama_donatur,
              type: wakaf.type,
              keterangan: wakaf.keterangan,
              tglDigunakan: wakaf.tgl_digunakan,
            });
          }
        });

        setHistories(wakafHistories);
        dispatch({ type: 'SET_LOADING_END' });
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'History Wakaf',
      headerTitleStyle: {
        fontFamily: 'raleway-700',
        fontSize: 18,
      },
      headerShadowVisible: false,
      headerTintColor: '#FFFFFF',
      headerStyle: { backgroundColor: '#180950' },
    });

    getAllWakafHistory();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.wrapper}>
        {/* List History Wakaf */}
        {histories.length == 0 ? 
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'transparent'}}>
          <Text style={{textAlign: 'center', color:'#FFF', fontFamily: 'poppins-500'}}>Belum memiliki riwayat Wakaf</Text>
        </View> : 
        <FlatList
          data={histories}
          renderItem={_historyRenderItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />}
        {/* </ScrollView> */}
      </SafeAreaView>
      {isLoading && <LoadingScreen background="#18095090" color="#FFF" />}
    </>
  );

  function _historyRenderItem({ item, index }: { item: WakafHistory; index: number }) {
    return (
      <View style={styles.patunganItem}>
        {/* <Image source={{ uri: 'https://placeimg.com/150/150/nature' }} style={styles.topItemImg} /> */}
        <View style={{ backgroundColor: 'transparent' }}>
          <Image
            source={
              item.images.length > 0
                ? { uri: item.images[0], width: 200, height: 100 }
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
          <Text style={styles.legendText}>Digunakan pada</Text>
          <Text style={{color: item.tglDigunakan == null ? '#FF0000' : '#00FF00'}}>{item.tglDigunakan ?? "Belum digunakan"}</Text>
        </View>
        {
          item.tglDigunakan != null && <View style={styles.legend}><Text style={styles.legendText}>{item.keterangan}</Text></View>
        }
        
        {/* Detail */}
        <View style={styles.detailPatungan}>
          <View style={styles.detailLeft}>
            <Entypo name="location-pin" size={20} color={'#fff'} />
          </View>
          <View style={styles.lokasi}>
            <Text style={styles.detailTitleText}>Alamat</Text>
            <Text style={styles.lokasiDetail}>{item.lokasi}</Text>
          </View>
        </View>
        <View style={styles.detailPatungan}>
          <View style={styles.detailLeft}>
            <Entypo name="area-graph" size={18} color={'#fff'} />
          </View>
          <Text style={styles.detailTitleText}>{item.luas} M2</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: '#180950',
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
    paddingVertical: 10,
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
