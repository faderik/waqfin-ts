import { StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import { FontAwesome, Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';
import MapView, { Callout, Camera, Marker } from 'react-native-maps';
import { WebView } from 'react-native-webview';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps, WakafLoc } from '../types';
import { SetStateAction, useEffect, useState } from 'react';

export default function DetailPetaScreen({ navigation }: RootTabScreenProps<'Peta'>) {
  const [mapRef, setMapRef] = useState<any>();
  const [searchResult, setSearchResult] = useState<WakafLoc[]>([]);
  const [markers, setMarkers] = useState<WakafLoc[]>([
    {
      id: 1,
      latlng: { latitude: -6.802867, longitude: 110.82681 },
      img: require('../assets/images/lahan-patungan-2.png'),
      address: {
        main: 'Getas Pajetan, Kudus',
        detail:
          'Jl. Dr. Lukmono Hadi No.1, Getas, Getas Pejaten, Kec. Jati, Kabupaten Kudus, Jawa Tengah 59317',
      },
    },
    {
      id: 2,
      latlng: { latitude: -7.291057, longitude: 112.797651 },
      img: require('../assets/images/lahan-patungan-1.png'),
      address: {
        main: 'Keputih, Surabaya',
        detail: 'Surabaya, Keputih, Sukolilo, Surabaya City, East Java 60111',
      },
    },
    {
      id: 3,
      latlng: { latitude: -7.194648, longitude: 107.666763 },
      img: require('../assets/images/lahan-patungan-1.png'),
      address: {
        main: 'Kertasari, Bandung',
        detail: 'Cibeureum, Kertasari, Bandung Regency, West Java',
      },
    },
    {
      id: 4,
      latlng: { latitude: -7.001907, longitude: 113.201079 },
      img: require('../assets/images/lahan-patungan-1.png'),
      address: {
        main: 'Banyuates, Madura',
        detail: 'Tengginah Laok, Tolang, Banyuates, Sampang Regency, East Java',
      },
    },
    {
      id: 5,
      latlng: { latitude: -7.154826, longitude: 107.003365 },
      img: require('../assets/images/lahan-patungan-1.png'),
      address: {
        main: 'Takokak, Cianjur',
        detail: 'Simpang, Takokak, Cianjur Regency, West Java',
      },
    },
  ]);

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
  }, []);

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
                  source={{ uri: 'https://placeimg.com/230/100/nature' }}
                />
                <Text style={styles.mainAddress}>{marker.address.main}</Text>
                <Text style={styles.detailAddress}>{marker.address.detail}</Text>
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
      <View style={styles.detailSection}>
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
      </View>
    </View>
  );

  function searchLocation(txt: string, locations: WakafLoc[]) {
    const searchResults = locations.filter((loc) => {
      return loc.address.main.toLowerCase().includes(txt.toLowerCase());
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
    borderRadius: 10,
  },
  down: {
    position: 'absolute',
    bottom: -20,
    alignSelf: 'center',
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
