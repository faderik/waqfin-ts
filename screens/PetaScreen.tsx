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
            latitude: 0.0,
            longitude: 115.0,
          },
          pitch: 1,
          heading: 1,
          // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
          altitude: 1,
          // Only when using Google Maps.
          zoom: 3,
        }}
        mapType={'satellite'}></MapView>
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
