import { Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import * as SecureStore from 'expo-secure-store';

import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';
import { RootStackScreenProps, StoreState, Wakaf } from '../types';
import { host } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../components/LoadingScreen';

export default function DetailLahanScreen({
  navigation,
  route,
}: RootStackScreenProps<'DetailLahan'>) {
  const [imgLahanList, setImgLahanList] = useState<string[]>([]);
  const [activeImg, setActiveImg] = useState(0);
  const [wakaf, setWakaf] = useState<Wakaf>();

  const isLoading = useSelector((state: StoreState) => state.isLoading);
  const dispatch = useDispatch();

  const initScreen = async () => {
    dispatch({ type: 'SET_LOADING_BEGIN' });

    navigation.setOptions({
      headerTitle: '',
      headerTitleStyle: {
        fontFamily: 'raleway-700',
        fontSize: 20,
      },
      headerShadowVisible: false,
      headerTintColor: '#000000',
      headerStyle: { backgroundColor: 'transparent' },
    });

    getDetailLahan();
  };

  useEffect(() => {
    initScreen();
  }, []);

  const getDetailLahan = async () => {
    const { id } = route.params as any;
    console.log('ID: ', id);

    let userToken = await SecureStore.getItemAsync('USERTOKEN').then(async (token) => token);

    fetch(host + '/wakaf/' + id, {
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
          console.log('ERR| ', response.message);
        }

        // ! TODO: PENTING MENGGANTI INI KARENA API BELUM READY
        let wakafRes = response.data;

        let wakaf: Wakaf = {
          id: wakafRes.id,
          deskripsi: wakafRes.deskripsi,
          harga: wakafRes.harga,
          lokasi: wakafRes.lokasi,
          luas: wakafRes.luas,
          namaDonatur: wakafRes.nama_donatur,
          type: wakafRes.type,
          images: null,
        };

        setWakaf(wakaf);

        if (wakafRes.images[0]) {
          setImgLahanList(wakafRes.images);
        } else
          setImgLahanList([
            'https://placehold.jp/30/bbbbbb/000000/400x180.png?text=Picture+Not+Found',
          ]);

        console.log('DATA WAKAF IS READY');
      });

    dispatch({ type: 'SET_LOADING_END' });
  };

  if (isLoading) return <LoadingScreen background="#FFF" color="blue" />;
  return (
    <>
      <SafeAreaView style={styles.wrapper}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}>
            <Carousel
              layout="default"
              // layoutCardOffset={10}
              data={imgLahanList}
              sliderWidth={Layout.window.width}
              itemWidth={Layout.window.width - 30 * 2}
              renderItem={_imgLahanRenderItem}
              onSnapToItem={(index: React.SetStateAction<number>) => setActiveImg(index)}
            />
            <Pagination
              dotsLength={imgLahanList.length}
              activeDotIndex={activeImg}
              dotStyle={{
                width: 5,
                height: 5,
                borderRadius: 5,
                backgroundColor: '#8D8C8C',
                marginHorizontal: -40,
              }}
              inactiveDotScale={0.8}
              containerStyle={{ marginVertical: -20 }}
            />
          </View>
          {/* Deskripsi */}
          <Text style={styles.description}>{wakaf?.deskripsi}</Text>
          {/* Detail */}
          <View style={styles.detail}>
            <View style={styles.detailPatungan}>
              <View style={styles.detailLeft}>
                <Image
                  source={require('../assets/icons/lokasi.png')}
                  style={styles.detailPatunganIcon}
                />
              </View>
              <View style={styles.lokasi}>
                <Text style={styles.detailTitleText}>Alamat</Text>
                <Text style={styles.lokasiDetail}>{wakaf?.lokasi}</Text>
              </View>
            </View>
            <View style={styles.detailPatungan}>
              <View style={styles.detailLeft}>
                <Image
                  source={require('../assets/icons/luas.png')}
                  style={styles.detailPatunganIcon}
                />
              </View>
              <Text style={styles.detailTitleText}>{wakaf?.luas} M2</Text>
            </View>
            <View style={styles.detailPatungan}>
              <View style={styles.detailLeft}>
                <Image
                  source={require('../assets/icons/owner.png')}
                  style={styles.detailPatunganIcon}
                />
              </View>
              <Text style={styles.detailTitleText}>{wakaf?.namaDonatur}</Text>
            </View>
          </View>
          {/* Button */}
          {/* <TouchableOpacity
          style={styles.publishBtn}
          onPress={() => {
            console.log('Publishing...');
            navigation.push('WakafSukses');
          }}>
          <Text style={styles.publishText}>Publish</Text>
        </TouchableOpacity> */}
        </ScrollView>
      </SafeAreaView>
      {/* {isLoading && <LoadingScreen background="#00000090" color="blue" />} */}
    </>
  );

  function _imgLahanRenderItem({ item, index }: { item: string; index: number }) {
    return (
      <View style={styles.imgItem}>
        {/* <Image source={{ uri: 'https://placeimg.com/150/150/nature' }} style={styles.topItemImg} /> */}
        <Image source={{ uri: item, width: 200, height: 150 }} style={styles.imgLahan} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 30,
    // paddingVertical: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontFamily: 'raleway-700',
    fontSize: 22,
    textAlign: 'center',
  },
  description: {
    fontSize: 10,
    fontFamily: 'raleway-400',
    color: '#000000',
    marginBottom: 20,
    marginTop: 10,
  },
  imgItem: {
    width: '100%',
    alignSelf: 'center',
    // backgroundColor: 'red',
  },
  imgLahan: {
    width: '100%',
    borderRadius: 5,
  },
  detailPatungan: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'transparent',
    marginBottom: 5,
    // paddingHorizontal: 10,
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
    tintColor: '#000',
  },
  detailTitleText: {
    color: '#000000',
    fontFamily: 'poppins-600',
    fontSize: 12,
  },
  lokasi: {
    backgroundColor: 'transparent',
    maxWidth: '90%',
  },
  lokasiDetail: {
    color: '#000000',
    fontFamily: 'poppins-500',
    fontSize: 10,
  },
  publishBtn: {
    backgroundColor: '#24116A',
    borderRadius: 5,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  publishText: {
    color: '#FFFFFF',
    fontFamily: 'raleway-700',
    fontSize: 12,
  },
  detail: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
});
