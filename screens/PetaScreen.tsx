import { StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import MapView, { Callout, Marker } from 'react-native-maps';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps, WakafLoc } from '../types';
import { useState } from 'react';
import WebView from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PetaScreen({ navigation }: RootTabScreenProps<'Peta'>) {
  const [mapRef, setMapRef] = useState<any>();
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

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.title}>We make it easy for you</Text>
      {/* Map */}

      <MapView
        ref={(ref) => {
          setMapRef(ref);
        }}
        onPress={() => navigation.navigate('DetailPeta')}
        style={styles.map}
        initialCamera={{
          center: {
            latitude: -6.802867,
            longitude: 110.82681,
          },
          pitch: 1,
          heading: 1,
          // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
          altitude: 1,
          // Only when using Google Maps.
          zoom: 15,
        }}
        mapType={'satellite'}>
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker.latlng}>
            <Callout tooltip={true}>
              <View style={styles.callout}>
                {/* <Text style={styles.imageWrapperAndroid}>
                  <Image
                    source={require('../assets/images/bca.png')}
                    resizeMode="cover"
                    style={styles.calloutImg}
                  />
                </Text> */}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 25,
    backgroundColor: '#180950',
  },
  // Before Map
  title: {
    fontFamily: 'raleway-700',
    marginHorizontal: 60,
    marginBottom: 20,
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
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
    marginHorizontal: 20,
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
    right: 30,
    position: 'absolute',
    color: '#959595',
  },
  // After Map
  map: {
    width: '95%',
    height: '70%',
    marginTop: 20,
    alignSelf: 'center',
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
  callout: {
    maxWidth: 220,
    alignSelf: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    zIndex: 90,
    borderRadius: 8,
    marginBottom: 10,
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
});
