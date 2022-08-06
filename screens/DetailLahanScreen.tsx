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
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';
import { RootStackScreenProps } from '../types';

export default function DetailLahanScreen({ navigation }: RootStackScreenProps<'DetailLahan'>) {
  const [imgLahanList, setImgLahanList] = useState<string[]>([
    'https://placeimg.com/300/300/nature',
    'https://placeimg.com/300/300/nature',
    'https://placeimg.com/300/300/nature',
    'https://placeimg.com/300/300/nature',
  ]);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
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
  }, []);

  return (
    <View style={styles.wrapper}>
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
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse turpis ante
          pellentesque scelerisque venenatis. At vel pellentesque purus sit orci etiam nunc urna.
          Nisl, nec amet velit ut consequat egestas bibendum arcu amet. Neque pharetra semper sed
          est ut porttitor. Turpis in morbi elit mus mus ac. Pellentesque aenean ornare quis
          donec.Nunc dapibus diam auctor donec ut. Cursus cursus diam odio nulla volutpat nec,
          bibendum orci, duis. Odio ut.
        </Text>
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
              <Text style={styles.detailTitleText}>Keputih, Sukolilo</Text>
              <Text style={styles.lokasiDetail}>
                Jl. Kampus UMK, Kayuapu Kulon, Gondangmanis, Kec. Bae, Kabupaten Kudus, Jawa Tengah
                59327
              </Text>
            </View>
          </View>
          <View style={styles.detailPatungan}>
            <View style={styles.detailLeft}>
              <Image
                source={require('../assets/icons/luas.png')}
                style={styles.detailPatunganIcon}
              />
            </View>
            <Text style={styles.detailTitleText}>590 M2</Text>
          </View>
          <View style={styles.detailPatungan}>
            <View style={styles.detailLeft}>
              <Image
                source={require('../assets/icons/owner.png')}
                style={styles.detailPatunganIcon}
              />
            </View>
            <Text style={styles.detailTitleText}>Bpk. Parman Solekan</Text>
          </View>
        </View>
        {/* Button */}
        <TouchableOpacity
          style={styles.publishBtn}
          onPress={() => {
            console.log('Publishing...');
            navigation.push('WakafSukses');
          }}>
          <Text style={styles.publishText}>Publish</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  function _imgLahanRenderItem({ item, index }: { item: string; index: number }) {
    return (
      <View style={styles.imgItem}>
        {/* <Image source={{ uri: 'https://placeimg.com/150/150/nature' }} style={styles.topItemImg} /> */}
        <Image source={require('../assets/images/detaillahan.png')} style={styles.imgLahan} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
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
