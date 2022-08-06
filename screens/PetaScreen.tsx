import { StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import { FontAwesome, Entypo, Feather } from '@expo/vector-icons';
import MapView, { Callout, Marker } from 'react-native-maps';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { SetStateAction, useState } from 'react';
import WebView from 'react-native-webview';

export default function PetaScreen({ navigation }: RootTabScreenProps<'Peta'>) {
  const [markers, setMarkers] = useState([
    {
      latlng: { latitude: -6.802867, longitude: 110.82681 },
      img: require('../assets/images/lahan-patungan-2.png'),
      address: {
        main: 'Getas Pajetan, Kudus',
        detail:
          'Jl. Dr. Lukmono Hadi No.1, Getas, Getas Pejaten, Kec. Jati, Kabupaten Kudus, Jawa Tengah 59317',
      },
    },
    {
      latlng: { latitude: -6.806813, longitude: 110.824218 },
      img: require('../assets/images/lahan-patungan-1.png'),
      address: {
        main: 'Keputih, Surabaya',
        detail: 'Jl. Ir Soekarno No.52B, Kec. Sukolilo, Kota Surabaya Jawa Timur 66111',
      },
    },
  ]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>We make it easy for you</Text>
      <View style={styles.searchSection}>
        <View style={styles.formSearch}>
          <TextInput style={styles.textInput} placeholder="Cari lahan wakaf !" />
          <FontAwesome name={'search'} size={12} style={styles.searchIcon} />
        </View>
      </View>
      {/* Map */}

      <MapView
        onPress={() => navigation.navigate('DetailPeta')}
        style={styles.map}
        initialRegion={{
          latitude: -6.80153, // till -6.801599
          longitude: 110.82383,
          latitudeDelta: 0.0101,
          longitudeDelta: 0.0102,
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
    </View>
  );

  function setFullscreen() {
    styles.map.height = '100%';
    styles.map.width = '100%';
  }
}

let styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 25,
    backgroundColor: '#180950',
    paddingBottom: 100,
  },
  // Before Map
  title: {
    fontFamily: 'raleway-700',
    marginHorizontal: 60,
    marginBottom: 20,
    marginTop: 40,
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
