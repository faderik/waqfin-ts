import { StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import { useState } from 'react';
import { FontAwesome, Entypo } from '@expo/vector-icons';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function BerandaScreen({ navigation }: RootTabScreenProps<'Beranda'>) {
  const [topPatungan, setTopPatungan] = useState<
    { lokasi: string; image: string; deskripsi: string }[]
  >([
    {
      lokasi: 'Gebog',
      image: 'https://placeimg.com/150/150/nature',
      deskripsi:
        'lahan wakaf yang sangat strategis di samping jalan, cocok untuk dijadikan sekolah ataupun pondok pesantren',
    },
    {
      lokasi: 'Kaliwungu, Kudus',
      image: 'https://placeimg.com/150/150/nature',
      deskripsi:
        'lahan dengan seluas 500 m@ yang berada pada pusat permukiman bisa menjadi solusi untuk pembangunan masjid',
    },
    {
      lokasi: 'Keputih, Surabaya',
      image: 'https://placeimg.com/150/150/nature',
      deskripsi:
        'lahan wakaf yang sangat strategis di samping jalan, cocok untuk dijadikan sekolah ataupun pondok pesantren',
    },
    {
      lokasi: 'Pakuwon, Mulyosari',
      image: 'https://placeimg.com/150/150/nature',
      deskripsi:
        'lahan dengan seluas 500 m@ yang berada pada pusat permukiman bisa menjadi solusi untuk pembangunan masjid',
    },
    {
      lokasi: 'Deyeng, Kediri',
      image: 'https://placeimg.com/150/150/nature',
      deskripsi:
        'lahan wakaf yang sangat strategis di samping jalan, cocok untuk dijadikan sekolah ataupun pondok pesantren',
    },
  ]);

  return (
    <View style={styles.wrapper}>
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
      <View style={styles.balanceBox}>
        <FontAwesome
          size={20}
          style={{ color: '#8C959B' }}
          name="qrcode"
          onPress={() => {
            console.log('Opening QR Scanner');
          }}
        />
        <View style={styles.line} />
        <Entypo size={20} style={{ color: '#8CA068' }} name="wallet" />
        <Text style={styles.balanceText}>Rp 4.640.000</Text>
        <View style={styles.addBtn}>
          <FontAwesome size={10} style={{ color: '#50B8E7' }} name="bank" />
          <Text style={styles.addText}>Transfer</Text>
        </View>
        <View style={styles.addBtn}>
          <FontAwesome size={10} style={{ color: '#50B8E7' }} name="plus" />
          <Text style={styles.addText}>Top Up</Text>
        </View>
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
      <ScrollView style={{ marginTop: 8 }} showsVerticalScrollIndicator={false}>
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
          {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.topItem}>
              <Image
                source={{ uri: 'https://placeimg.com/150/150/nature' }}
                style={styles.topItemImg}
              />
              <View style={styles.topItemBox}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Entypo
                    name={'location-pin'}
                    size={15}
                    style={{ color: '#150A42', marginBottom: -2 }}
                  />
                  <Text style={styles.topItemTitle}>Gebang, Kudus</Text>
                </View>
                <Text style={styles.topItemDesc}>
                  lahan wakaf yang sangat strategis di samping jalan, cocok untuk dijadikan sekolah
                  ataupun pondok pesantren
                </Text>
                <TouchableOpacity style={styles.topExploreBtn}>
                  <Text style={styles.topExploreText}>Explore Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView> */}
          <FlatList
            data={topPatungan}
            renderItem={_topPatunganRenderItem}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={true}
          />
        </View>
      </ScrollView>
    </View>
  );

  function _topPatunganRenderItem({
    item,
    index,
  }: {
    item: { lokasi: string; image: string; deskripsi: string };
    index: number;
  }) {
    return (
      <View style={styles.topItem}>
        {/* <Image source={{ uri: 'https://placeimg.com/150/150/nature' }} style={styles.topItemImg} /> */}
        <Image source={require('../assets/images/lahan-img.png')} style={styles.topItemImg} />
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
              navigation.navigate('DetailLahan');
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
    paddingVertical: 40,
    paddingHorizontal: 25,
    backgroundColor: '#180950',
    paddingBottom: 100,
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
    marginTop: 20,
    flexDirection: 'row',
    padding: 10,
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
  },
  addBtn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#50B8E7',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
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
    marginVertical: 4,
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
