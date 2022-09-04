import { StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import { FontAwesome, Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';
import MapView, { Callout, Camera, Marker } from 'react-native-maps';
import { WebView } from 'react-native-webview';
import * as SecureStore from 'expo-secure-store';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps, WakafLoc } from '../types';
import { SetStateAction, useEffect, useState } from 'react';
import { host } from '../constants';

function formatRupiah(nominal: number) {
  const format = nominal.toString().split('').reverse().join('');
  const convert = format.match(/\d{1,3}/g);
  const rupiah = 'Rp ' + convert?.join('.').split('').reverse().join('');

  return rupiah;
}

export default function DetailPetaScreen({ navigation }: RootTabScreenProps<'Peta'>) {
  const [mapRef, setMapRef] = useState<any>();
  const [searchResult, setSearchResult] = useState<WakafLoc[]>([]);
  const [markers, setMarkers] = useState<WakafLoc[]>([]);
  let wakafList: WakafLoc[] = [];

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTitleStyle: {
        fontFamily: 'raleway-700',
        fontSize: 20,
      },
      headerShadowVisible: false,
      headerTintColor: '#000000',
      headerStyle: { backgroundColor: '#180950' },
      // OR
      headerShown: false,
    });

    getAllWakaf();
  }, []);

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
          alert('Something went wrong');
        }

        let arr = response.data as [];
        arr.forEach((wakaf: any) => {
          if (wakaf.type == 'crowdfunding') {
            wakafList.push({
              id: wakaf.id,
              address: {
                main: 'Alamat',
                detail: wakaf.lokasi,
              },
              harga: wakaf.harga,
              img:
                wakaf.images[0] ??
                'https://placehold.jp/30/bbbbbb/000000/400x180.png?text=Picture+Not+Found',
              initiator: wakaf.nama_donatur,
              latlng: {
                latitude: parseFloat(wakaf.latitude?.toString() ?? '0'),
                longitude: parseFloat(wakaf.longitude?.toString() ?? '0'),
              },
              luas: wakaf.luas,
            });
          }
        });

        setMarkers(wakafList);
      });
  };

  return (
    // Tidak perlu dikasi SafeAreaView karena Full Screen Map
    <View style={styles.wrapper}>
      {/* Map */}
      <MapView
        ref={(ref) => setMapRef(ref)}
        style={styles.map}
        initialCamera={{
          center: {
            latitude: -6.802867,
            longitude: 110.82681,
          },
          pitch: 1,
          heading: 1,
          altitude: 1,
          zoom: 16,
        }}
        mapType={'satellite'}>
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker.latlng}>
            <Callout tooltip={true}>
              <View style={styles.callout}>
                <WebView
                  style={styles.webview}
                  source={
                    { uri: marker.img }
                    // marker.img ? { uri: marker.img } : require('../assets/images/lahan-img.png')
                  }
                />
                <Text style={styles.mainAddress}>{marker.initiator}</Text>
                <View style={styles.groupDetailItem}>
                  <Entypo style={styles.iconCallout} name="location-pin" size={16} color="#000" />
                  <Text style={styles.detailAddress}>{marker.address.detail}</Text>
                </View>
                <View style={styles.groupDetailItem}>
                  <Entypo style={styles.iconCallout} name="price-tag" size={16} color="#000" />
                  <Text style={styles.detailAddress}>{formatRupiah(marker.harga)}</Text>
                </View>
                <View style={styles.groupDetailItem}>
                  <Entypo style={styles.iconCallout} name="area-graph" size={16} color="#000" />
                  <Text style={styles.detailAddress}>{marker.luas} M2</Text>
                </View>

                <Entypo name="triangle-down" size={30} color="#FFF" style={styles.down} />
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Entypo name={'chevron-left'} size={20} color={'#000'} />
        </TouchableOpacity>

        <View style={styles.formSearch}>
          <TextInput
            style={styles.textInput}
            placeholder="Cari lahan wakaf !"
            onChangeText={(text) => {
              searchLocation(text, markers);
            }}
          />
          <FontAwesome name={'search'} size={15} style={styles.searchIcon} />
        </View>
      </View>
      <FlatList
        style={styles.flatList}
        data={searchResult}
        renderItem={_searchRenderItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />

      {/* Detail Section */}
      {/* <View style={styles.detailSection}>
        <View style={styles.detailItem}>
          <Entypo name={'price-tag'} size={15} color={'#FFF'} />
          <Text style={styles.detailText}>1.500.000/M2</Text>
        </View>
        <View style={styles.detailItem}>
          <FontAwesome5 name={'mountain'} size={15} color={'#FFF'} />
          <Text style={styles.detailText}>520 M2</Text>
        </View>
        <View style={styles.detailItem}>
          <FontAwesome5 name={'user-circle'} size={18} color={'#FFF'} />
          <Text style={styles.detailText}>Bp.Soleman</Text>
        </View>
      </View> */}
    </View>
  );

  function searchLocation(txt: string, locations: WakafLoc[]) {
    const searchResults = locations.filter((loc) => {
      return loc.address.detail.toLowerCase().includes(txt.toLowerCase());
    });

    setSearchResult(searchResults);
    if (txt === '') {
      setSearchResult([]);
    }
  }

  function _searchRenderItem({ item, index }: { item: WakafLoc; index: number }) {
    return (
      <TouchableOpacity
        style={{
          borderRadius: 5,
          padding: '2%',
          marginTop: 5,
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#FFF',
          alignItems: 'center',
        }}
        onPress={async () => {
          await mapRef.animateCamera({
            center: { latitude: item.latlng.latitude, longitude: item.latlng.longitude },
            zoom: 16,
          });
          setSearchResult([]);
        }}>
        <View
          style={{
            alignSelf: 'center',
            overflow: 'hidden',
            maxWidth: '80%',
            backgroundColor: 'transparent',
          }}>
          <Text
            style={{
              marginLeft: 8,
              textAlignVertical: 'center',
              fontSize: 12,
              fontFamily: 'poppins-600',
            }}>
            {item.address.main}
          </Text>
          <Text
            style={{
              marginLeft: 8,
              textAlignVertical: 'center',
              fontSize: 10,
              fontFamily: 'poppins-400',
            }}>
            {item.address.detail}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'transparent',
            alignItems: 'center',
            right: 10,
            marginRight: 0,
            marginLeft: 'auto',
          }}>
          <Entypo name="location" size={20} color="#150A42" />
        </View>
      </TouchableOpacity>
    );
  }
}

let styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: '#180950',
  },
  // After Map
  map: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  // Detail Section
  detailSection: {
    position: 'absolute',
    bottom: 60,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 15,
    backgroundColor: '#150A42',
    paddingHorizontal: 15,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginHorizontal: 2,
  },
  detailText: {
    fontFamily: 'poppins-500',
    fontSize: 12,
    marginLeft: 10,
    color: '#FFF',
  },
  callout: {
    maxWidth: 220,
    // minHeight: 100,
    alignSelf: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    zIndex: 90,
    borderRadius: 8,
    marginBottom: 10,
  },
  iconCallout: {
    paddingRight: 10,
  },
  calloutImg: {
    height: 200,
    width: 330,
    borderRadius: 10,
  },
  mainAddress: {
    fontFamily: 'poppins-700',
    fontSize: 12,
    color: '#000',
    marginTop: 10,
  },
  detailAddress: {
    fontFamily: 'poppins-500',
    fontSize: 10,
    color: '#000',
  },
  imageWrapperAndroid: {
    height: 200,
    flex: 1,
    marginTop: -85,
    width: 330,
  },
  webview: {
    height: 100,
    width: 230,
    resizeMode: 'contain',
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  down: {
    position: 'absolute',
    bottom: -20,
    alignSelf: 'center',
  },
  groupDetailItem: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },

  // Header Section
  header: {
    position: 'absolute',
    top: 60,
    width: '100%',
    maxHeight: 40,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  back: {
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFF',
    padding: 10,
    height: '100%',
  },
  formSearch: {
    backgroundColor: 'transparent',
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontFamily: 'raleway-500',
    fontSize: 12,
    marginLeft: 10,
  },
  searchIcon: {
    marginHorizontal: 5,
    bottom: 13,
    right: 10,
    position: 'absolute',
    color: '#959595',
  },
  flatList: {
    width: '100%',
    position: 'absolute',
    top: 60 + 50,
    paddingHorizontal: 25,
  },
});
