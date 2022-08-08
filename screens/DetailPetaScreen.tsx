import { StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import { FontAwesome, Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';
import MapView, { Callout, Marker } from 'react-native-maps';
import { WebView } from 'react-native-webview';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { SetStateAction, useEffect, useState } from 'react';

export default function DetailPetaScreen({ navigation }: RootTabScreenProps<'Peta'>) {
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
    <View style={styles.wrapper}>
      {/* Map */}
      <MapView
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
      {/* Peta Button */}
      <TouchableOpacity style={styles.back} onPress={() => navigation.popToTop()}>
        <Entypo name={'chevron-left'} size={20} color={'#FFF'} />
        <Text style={styles.petaText}>Peta</Text>
      </TouchableOpacity>
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
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    left: 20,
    borderRadius: 10,
    backgroundColor: '#00000080',
    padding: 10,
  },
  petaText: {
    fontFamily: 'poppins-700',
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 3,
    marginRight: 10,
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
});
