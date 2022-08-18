import {
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import { FontAwesome, Entypo, Feather } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps, StoreState, Wakaf } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { host } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../components/LoadingScreen';

export default function DonasiScreen({ navigation }: RootTabScreenProps<'Donasi'>) {
  const [typeDonasi, setTypeDonasi] = useState<'crowdfunding' | 'mandiri'>('crowdfunding');

  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [email, setEmail] = useState('');
  const [telp, setTelp] = useState('');

  const [desc, setDesc] = useState('');
  const [loc, setLoc] = useState('');
  const [luas, setLuas] = useState('');
  const [harga, setHarga] = useState('');
  const [ket, setKet] = useState('--');

  const [error, setError] = useState<any>({});

  // const [nama, setNama] = useState('Adi');
  // const [alamat, setAlamat] = useState('Srengat');
  // const [email, setEmail] = useState('adi@gmail.com');
  // const [telp, setTelp] = useState('0814123132');

  // const [desc, setDesc] = useState('Buat Pondok Pesantren');
  // const [loc, setLoc] = useState('Dandong, Srengat, Blitar');
  // const [luas, setLuas] = useState('123');
  // const [harga, setHarga] = useState('120.000');
  // const [ket, setKet] = useState('--');

  const [imgName, setImgName] = useState('');
  const [image, setImage] = useState<any>(null);

  const isLoading = useSelector((state: StoreState) => state.isLoading);
  const dispatch = useDispatch();

  return (
    <>
      <SafeAreaView style={styles.wrapper}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}>
          <Text style={styles.title}>Sisihkan hartamu untuk wakaf</Text>
          {/* Profil Donatur */}
          <Text style={styles.legendText}>Profil Donatur</Text>
          <View style={styles.form}>
            <View style={styles.label}>
              <Text style={styles.textLabel}>Nama Donatur</Text>
              <Entypo size={7} color="#FC2323" name="star" />
            </View>
            <TextInput
              style={styles.textInput}
              value={nama}
              onChangeText={(text) => setNama(text)}
            />
          </View>
          <View style={styles.form}>
            <View style={styles.label}>
              <Text style={styles.textLabel}>Alamat</Text>
              <Entypo size={7} color="#FC2323" name="star" />
            </View>
            <TextInput
              style={styles.textInput}
              value={alamat}
              onChangeText={(text) => setAlamat(text)}
            />
          </View>
          <View style={styles.form}>
            <View style={styles.label}>
              <Text style={styles.textLabel}>Email</Text>
              <Entypo size={7} color="#FC2323" name="star" />
            </View>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.form}>
            <View style={styles.label}>
              <Text style={styles.textLabel}>Telepon/Hp</Text>
              <Entypo size={7} color="#FC2323" name="star" />
            </View>
            <TextInput
              style={styles.textInput}
              value={telp}
              onChangeText={(text) => setTelp(text)}
            />
          </View>

          {/* Tipe Donasi */}
          <View style={{ ...styles.form, marginTop: 10 }}>
            <View style={styles.label}>
              <Text style={styles.textLabel}>Tipe Donasi</Text>
              <Entypo size={7} color="#FC2323" name="star" />
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
              <View
                style={{
                  marginRight: 10,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <RadioButton radioId={'crowdfunding'} selected={typeDonasi} />
                <Text style={{ fontSize: 12, color: '#FFF' }}>Crowdfunding</Text>
              </View>
              <View
                style={{
                  marginRight: 10,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <RadioButton radioId={'mandiri'} selected={typeDonasi} />
                <Text style={{ fontSize: 12, color: '#FFF' }}>Mandiri</Text>
              </View>
            </View>
          </View>

          {/* Detail Wakaf */}
          <Text style={styles.legendText}>Detail Wakaf</Text>
          <View style={styles.form}>
            <View style={styles.label}>
              <Text style={styles.textLabel}>Deskripsi</Text>
              <Entypo size={7} color="#FC2323" name="star" />
            </View>
            <TextInput
              style={styles.textInput}
              value={desc}
              onChangeText={(text) => setDesc(text)}
            />
          </View>
          <View style={styles.form}>
            <View style={styles.label}>
              <Text style={styles.textLabel}>Lokasi Lahan</Text>
              <Entypo size={7} color="#FC2323" name="star" />
            </View>
            <TextInput style={styles.textInput} value={loc} onChangeText={(text) => setLoc(text)} />
          </View>
          <View style={styles.form}>
            <View style={styles.label}>
              <Text style={styles.textLabel}>Luas Lahan</Text>
              <Entypo size={7} color="#FC2323" name="star" />
            </View>
            <TextInput
              style={styles.textInput}
              keyboardType={'numeric'}
              value={luas}
              onChangeText={(text) => setLuas(text)}
            />
          </View>
          <View style={styles.form}>
            <View style={styles.label}>
              <Text style={styles.textLabel}>Harga/m2</Text>
              <Entypo size={7} color="#FC2323" name="star" />
            </View>
            <TextInput
              style={styles.textInput}
              keyboardType={'numeric'}
              value={harga}
              onChangeText={(text) => setHarga(text)}
            />
          </View>
          <View style={styles.form}>
            <View style={styles.label}>
              <Text style={styles.textLabel}>Keterangan</Text>
            </View>
            <TextInput style={styles.textInput} value={ket} onChangeText={(text) => setKet(text)} />
          </View>
          {/* Buttons */}
          <View style={styles.buttons}>
            {/* Insert PIctures */}
            <TouchableOpacity
              style={styles.insertPictureGroup}
              onPress={async () => {
                await takePhotoAsync();
              }}>
              <Feather name="file-plus" size={20} color="#FFFFFF" />
              <Entypo name="dot-single" size={15} color="#FF0000" style={styles.badgeIcon} />
              <Text style={styles.uploadText}>{imgName ? imgName : 'Upload Lampiran'}</Text>
            </TouchableOpacity>
            {/* Donate */}
            <TouchableOpacity
              style={styles.donateBtn}
              onPress={async () => {
                console.log('Donating...');
                await submitRequest();
              }}>
              <Image source={require('../assets/icons/donate.png')} style={styles.donateIcon} />
              <Text style={styles.donateText}>Donate</Text>
            </TouchableOpacity>
          </View>
          {/* Show Additional Information */}
          <Text style={styles.infoTitle}>[+] Tampilkan informasi tambahan</Text>
          <Text style={styles.infoDesc}>
            Sesuai dengan peraturan perpajakan di Indonesia, untuk mendapatkan manfaat sebagai
            pengurang Penghasilan Kena Pajak (PKP) sesuai keputusan Dirjen Pajak No. PER-11/PJ/2017,
            kami memelurkan informasi tambahan mengenai profil diri Anda.
          </Text>
        </ScrollView>
      </SafeAreaView>
      {isLoading && <LoadingScreen background="#18095090" color="#FFF" />}
    </>
  );

  function RadioButton(props: any) {
    let isSelected = props.radioId == props.selected ? true : false;
    return (
      <TouchableOpacity
        onPress={() => setTypeDonasi(props.radioId)}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            height: 16,
            width: 16,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: '#FFF',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 5,
            backgroundColor: 'transparent',
          }}>
          {isSelected ? (
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 4,
                backgroundColor: '#FFF',
              }}
            />
          ) : null}
        </View>
        <Text
          style={{
            fontFamily: 'poppins-700',
            fontSize: 12,
            lineHeight: 18,
            paddingVertical: 2,
            color: '#000000',
            // backgroundColor: 'red',
          }}>
          {props.label}
        </Text>
      </TouchableOpacity>
    );
  }

  async function takePhotoAsync() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
    });

    if (result.cancelled) {
      return;
    }

    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    let filename = localUri.split('/').pop() as string;
    setImgName(filename.substring(0, 20) + '...');

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let photo = { uri: localUri, name: filename, type };
    setImage(photo);
  }

  async function submitRequest() {
    dispatch({ type: 'SET_LOADING_BEGIN' });
    const formData = new FormData();

    formData.append('images[]', image);

    formData.append('nama_donatur', nama);
    formData.append('alamat_donatur', alamat);
    formData.append('email_donatur', email);
    formData.append('telp_donatur', telp);
    formData.append('deskripsi', desc);
    formData.append('lokasi', loc);
    formData.append('luas', luas);
    formData.append('harga', harga);
    formData.append('keterangan', ket);

    formData.append('type', typeDonasi);

    let userToken = await SecureStore.getItemAsync('USERTOKEN').then(async (token) => token);

    await fetch(host + '/wakaf', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: 'Bearer ' + userToken,
        Accept: 'application/json',
        'content-type': 'multipart/form-data',
      },
      redirect: 'follow',
    })
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        console.log('TEXT', response);
        if (response.code != 200) {
          console.log('Errorr');
          Alert.alert('Error', response.message);
          return;
        } else {
          console.log('Success');
          navigation.navigate('DetailDonasiPatungan', { id: response.data.id } as any);
        }
      })
      .catch((error) => {
        console.log('Err:', error);
        Alert.alert('Error', error);
      });

    dispatch({ type: 'SET_LOADING_END' });
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 25,
    backgroundColor: '#180950',
  },
  title: {
    fontFamily: 'raleway-700',
    marginHorizontal: 60,
    marginBottom: 20,
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  legendText: {
    fontFamily: 'poppins-700',
    fontSize: 18,
    color: '#FFFFFF',
    marginVertical: 10,
    maxWidth: 100,
    borderBottomColor: '#ABABAB',
    borderBottomWidth: 1,
  },
  form: {
    marginTop: 5,
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  label: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: 100,
  },
  textLabel: {
    color: '#FFF',
    fontFamily: 'poppins-500',
    fontSize: 11,
  },
  textInput: {
    flex: 1,
    maxHeight: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 12,
  },
  donateBtn: {
    marginVertical: 20,
    flexDirection: 'row',
    backgroundColor: '#4F82D9',
    borderRadius: 5,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: 'center',
  },
  donateIcon: {
    marginRight: 8,
  },
  donateText: {
    color: '#FFFFFF',
    fontFamily: 'raleway-700',
    fontSize: 12,
  },
  infoTitle: {
    color: '#4F82D9',
    fontFamily: 'poppins-600',
    fontSize: 12,
  },
  infoDesc: {
    fontFamily: 'poppins-500',
    fontSize: 10,
    color: '#FFFFFF',
    marginBottom: 100,
  },
  buttons: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insertPictureGroup: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 20,
  },
  badgeIcon: {
    marginLeft: -10,
    marginTop: -10,
    zIndex: 2,
  },
  uploadText: {
    fontFamily: 'poppins-500',
    fontSize: 11,
    color: '#FFFFFF',
    paddingVertical: 2,
  },
});
