import { StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps, TopPatungan } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { host } from '../constants';

function formatRupiah(nominal: number) {
  const format = nominal.toString().split('').reverse().join('');
  const convert = format.match(/\d{1,3}/g);
  const rupiah = 'Rp ' + convert?.join('.').split('').reverse().join('');

  return rupiah;
}

export default function BerandaScreen({ navigation }: RootTabScreenProps<'Beranda'>) {
  const [topPatungan, setTopPatungan] = useState<TopPatungan[]>([]);
  const balance = Math.floor(Math.random() * 1234567890);

  let wakafList: TopPatungan[] = [];

  const getAllWakaf = async () => {
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
          console.log('ERR| ', response.message);
        }

        // console.log('WAKAFLIST| ', response.data);
        let arr = response.data as [];
        arr.forEach((wakaf: any) => {
          if (wakaf.type == 'crowdfunding' && wakaf.payments_count >= 2) {
            wakafList.push({
              id: wakaf.id,
              deskripsi: wakaf.deskripsi,
              image:
                wakaf.images[0] ??
                'https://placehold.jp/30/bbbbbb/000000/400x180.png?text=Picture+Not+Found',
              lokasi: wakaf.lokasi,
            });
          }
        });

        console.log('DATA WAKAF LIST READY');
        setTopPatungan(wakafList);
      });
  };

  useEffect(() => {
    getAllWakaf();
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Let's</Text>
          <Text style={styles.subtitle}>Share Happiness!</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log('Navigating to Profile...');
            navigation.navigate('Profile');
          }}>
          <Image source={require('../assets/images/profile.png')} style={styles.profileImg} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
        <View style={styles.balanceBox}>
          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1}}> */}
          {/* <FontAwesome
              size={20}
              style={{ color: '#8C959B' }}
              name="qrcode"
              onPress={() => {
                console.log('Opening QR Scanner');
              }}
            />
            <View style={styles.line} /> */}
          <View style={{ flexDirection: 'row' }}>
            <Entypo size={20} style={{ color: '#8CA068' }} name="wallet" />
            <Text style={styles.balanceText}>{formatRupiah(balance)}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.addBtn}>
              <FontAwesome size={10} style={{ color: '#50B8E7' }} name="bank" />
              <Text style={styles.addText}>Transfer</Text>
            </View>
            <View style={styles.addBtn}>
              <FontAwesome size={10} style={{ color: '#50B8E7' }} name="plus" />
              <Text style={styles.addText}>Top Up</Text>
            </View>
          </View>
          {/* </ScrollView> */}
        </View>
        <View style={styles.searchSection}>
          <Image
            source={require('../assets/images/logo-notext.png')}
            style={{ width: 40, height: 40, marginRight: 10 }}
            resizeMode="contain"
          />
          <View style={styles.formSearch}>
            <TextInput style={styles.textInput} placeholder="Cari lahan wakaf" />
            <FontAwesome name={'search'} size={12} style={styles.searchIcon} />
          </View>
        </View>

        {/* Dibawah Search Box */}
        <View style={styles.exploreBox}>
          <Image
            source={require('../assets/images/patungan-img.png')}
            style={styles.exploreImg}
            resizeMode="contain"
          />
          <View style={styles.exploreRight}>
            <Text style={styles.exploreTitle}>Patungan Wakaf</Text>
            <Text style={styles.exploreDesc}>
              Dengan uang 100.000 pun kamu bisa bersedakah wakaf.
            </Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              onPress={() => {
                console.log('Exploring Patungan...');
                navigation.navigate('Patungan');
              }}>
              <Text style={styles.exploreText}>Explore Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.exploreBox}>
          <Image
            source={require('../assets/images/donasi-img.png')}
            style={styles.exploreImg}
            resizeMode="contain"
          />
          <View style={styles.exploreRight}>
            <Text style={styles.exploreTitle}>Donasi Wakaf</Text>
            <Text style={styles.exploreDesc}>
              Sisihkan harta tanahmu untuk melihat mereka tersenyum.
            </Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              onPress={() => {
                console.log('Exploring Donasi...');
                navigation.navigate('Donasi');
              }}>
              <Text style={styles.exploreText}>Explore Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.topSection}>
          <View style={styles.topHeader}>
            <Text style={styles.topTitle}>Top Patungan</Text>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => {
                navigation.navigate('Patungan');
              }}>
              <Text style={styles.seeAllText}>See all</Text>
              <FontAwesome
                name={'arrow-right'}
                size={10}
                style={{ marginLeft: 5, color: '#FFFFFF', marginBottom: 2 }}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={topPatungan}
            renderItem={_topPatunganRenderItem}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={true}
            style={{ marginBottom: 100 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  function _topPatunganRenderItem({ item, index }: { item: TopPatungan; index: number }) {
    return (
      <View style={styles.topItem}>
        {/* <Image source={{ uri: 'https://placeimg.com/150/150/nature' }} style={styles.topItemImg} /> */}
        <Image
          source={
            { uri: item.image }
            // item.image
            //   ? { uri: item.image, width: 100, height: 100 }
            //   : require('../assets/images/lahan-img.png')
          }
          style={styles.topItemImg}
        />
        <View style={styles.topItemBox}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent' }}>
            <Entypo
              name={'location-pin'}
              size={15}
              style={{ color: '#150A42', marginBottom: -2 }}
            />
            <Text style={styles.topItemTitle}>{item.lokasi}</Text>
          </View>
          <Text style={styles.topItemDesc}>{item.deskripsi}</Text>
          <TouchableOpacity
            style={styles.topExploreBtn}
            onPress={() => {
              console.log('Navigating to Detail Lahan...');
              navigation.navigate('DetailLahan', { id: item.id } as any);
            }}>
            <Text style={styles.topExploreText}>Explore Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 25,
    backgroundColor: '#180950',
    // paddingBottom: 100,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  headerText: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  title: {
    fontFamily: 'raleway-900',
    fontSize: 28,
    color: '#FFFFFF',
  },
  subtitle: {
    fontFamily: 'raleway-500',
    fontSize: 14,
    color: '#FFFFFF',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  balanceBox: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    marginHorizontal: 10,
    width: 1,
    height: '100%',
    color: '#8C959B',
    backgroundColor: '#8C959B',
  },
  balanceText: {
    marginHorizontal: 10,
    fontFamily: 'poppins-700',
    fontSize: 12,
    color: '#000000',
    lineHeight: 20,
    alignSelf: 'center',
  },
  addBtn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#50B8E7',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 2,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  addText: {
    marginLeft: 5,
    fontFamily: 'poppins-500',
    fontSize: 8,
    color: '#000000',
  },
  searchSection: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    maxHeight: 30,
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontFamily: 'raleway-500',
    fontSize: 12,
  },
  formSearch: {
    backgroundColor: 'transparent',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchIcon: {
    marginHorizontal: 5,
    bottom: 8,
    right: 10,
    position: 'absolute',
    color: '#959595',
  },
  exploreBox: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 6,
  },
  exploreImg: {
    height: '100%',
    left: -20,
    top: -10,
    maxWidth: '50%',
  },
  exploreRight: {
    flex: 1,
    marginLeft: -20,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    maxWidth: '100%',
    justifyContent: 'space-between',
  },
  exploreTitle: {
    fontFamily: 'raleway-700',
    fontSize: 18,
    color: '#24116A',
  },
  exploreDesc: {
    fontFamily: 'raleway-500',
    fontSize: 10,
    color: '#150A42',
    marginBottom: 10,
  },
  exploreBtn: {
    backgroundColor: '#150A42',
    borderRadius: 5,
    alignSelf: 'flex-end',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  exploreText: {
    fontFamily: 'raleway-700',
    fontSize: 10,
    color: '#FFFFFF',
  },
  topSection: {
    backgroundColor: 'transparent',
    marginVertical: 10,
  },
  topTitle: {
    fontFamily: 'poppins-700',
    fontSize: 18,
    color: '#FFFFFF',
  },
  seeAllText: {
    fontFamily: 'poppins-500',
    fontSize: 10,
    color: '#FFFFFF',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  topItem: {
    flex: 1,
    maxWidth: 150,
    borderRadius: 10,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  topItemImg: {
    resizeMode: 'cover',
    width: '100%',
    maxHeight: 200,
    minHeight: 200,
    flex: 1,
    borderRadius: 10,
  },
  topItemBox: {
    flex: 1,
    zIndex: 2,
    borderRadius: 10,
    padding: 10,
    // left: 50,
    backgroundColor: 'transparent',
  },
  topItemTitle: {
    fontFamily: 'raleway-700',
    fontSize: 12,
    color: '#150A42',
    maxWidth: '85%',
  },
  topItemDesc: {
    flex: 1,
    marginTop: 5,
    fontFamily: 'raleway-500',
    fontSize: 8,
    color: '#000000',
  },
  topExploreBtn: {
    backgroundColor: '#150A42',
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },
  topExploreText: {
    fontFamily: 'raleway-700',
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
