import { StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import { FontAwesome, Entypo, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { SetStateAction, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PengaduanKasusScreen({ navigation }: RootTabScreenProps<'Kasus'>) {
  const [typeKasus, setTypeKasus] = useState(0);
  const [isAnonim, setIsAnonim] = useState(false);

  const [imgName, setImgName] = useState('');
  const [img, setImg] = useState<any>('');

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}>
        <Text style={styles.title}>Sampaikan laporan anda</Text>
        {/* Type Pengaduan */}
        <Text style={styles.legendText}>Pilih klasifikasi laporan</Text>
        <View style={styles.typeBox}>
          <RadioButton radioId={1} selected={typeKasus} label={'PENGADUAN'} />
          <View style={{ width: 2, height: '100%', borderRadius: 2, backgroundColor: '#000' }} />
          <RadioButton radioId={2} selected={typeKasus} label={'ASPIRASI'} />
        </View>
        {/* Panduan */}
        <TouchableOpacity
          style={styles.panduanGroup}
          onPress={() => {
            navigation.navigate('PanduanKasus');
          }}>
          <Text style={styles.panduanText}>
            Perhatikan Cara Menyampaikan Pengaduan Yang Baik dan Benar
          </Text>
          <Entypo name="help-with-circle" size={15} color="#FFFFFF" />
          <Entypo name="dot-single" size={15} color="#FF0000" style={styles.badgeIcon} />
        </TouchableOpacity>
        {/* Form */}
        <TextInput style={styles.judul} placeholder={'Ketik judul laporan anda!'} />
        <TextInput
          style={styles.isi}
          placeholder={'Ketik isi laporan anda!'}
          multiline={true}
          numberOfLines={4}
        />
        <TextInput
          style={styles.deskripsi}
          placeholder={'Deskripsi kejadian!'}
          multiline={true}
          numberOfLines={3}
        />
        <TextInput style={styles.tanggal} placeholder={'Pilih tanggal kejadian'} />
        <TextInput style={styles.lokasi} placeholder={'Ketik lokasi kejadian'} />
        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.panduanGroup}
            onPress={async () => {
              await takePhotoAsync();
            }}>
            <Feather name="file-plus" size={20} color="#FFFFFF" />
            <Entypo name="dot-single" size={15} color="#FF0000" style={styles.badgeIcon} />
            <Text style={styles.uploadText}>Upload Lampiran</Text>
          </TouchableOpacity>

          <RadioButtonAnonim radioId={'anonim'} selected={isAnonim} label={'Anonim'} />

          {/* Button Lapor */}
          <TouchableOpacity
            style={styles.laporBtn}
            onPress={() => {
              // Add popup alert repoting success
              // navigation.navigate('WakafSukses');
            }}>
            <Text style={styles.laporText}>LAPOR!</Text>
            <FontAwesome name="send" size={10} color={'#000000'} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  async function takePhotoAsync() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
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
    setImg(photo);
  }

  function RadioButton(props: any) {
    let isSelected = props.radioId == props.selected ? true : false;
    return (
      <TouchableOpacity
        onPress={() => setTypeKasus(props.radioId)}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            height: 16,
            width: 16,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
            backgroundColor: 'transparent',
          }}>
          {isSelected ? (
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 4,
                backgroundColor: '#000',
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

  function RadioButtonAnonim(props: any) {
    return (
      <TouchableOpacity
        onPress={() => setIsAnonim((prevValue) => !prevValue)}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            height: 16,
            width: 16,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 5,
            backgroundColor: 'transparent',
          }}>
          {isAnonim ? (
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 4,
                backgroundColor: '#FFFFFF',
              }}
            />
          ) : null}
        </View>
        <Text
          style={{
            fontFamily: 'poppins-500',
            fontSize: 10,
            lineHeight: 12,
            paddingVertical: 2,
            color: '#FFF',
            // backgroundColor: 'red',
          }}>
          {props.label}
        </Text>
      </TouchableOpacity>
    );
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
    fontFamily: 'poppins-400',
    fontSize: 10,
    color: '#FFFFFF',
    marginVertical: 10,
    // maxWidth: 100,
  },
  textInput: {
    flex: 1,
    maxHeight: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 12,
    // fontFamily: 'poppins-500',
  },
  laporBtn: {
    marginVertical: 20,
    flexDirection: 'row',
    backgroundColor: '#4F82D9',
    borderRadius: 5,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: 'center',
  },
  laporIcon: {
    marginRight: 8,
  },
  laporText: {
    color: '#000000',
    fontFamily: 'raleway-700',
    fontSize: 12,
    // lineHeight: 12,
    marginRight: 5,
  },
  typeBox: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-evenly',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  panduanGroup: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 20,
  },
  panduanText: {
    textAlign: 'right',
    fontFamily: 'poppins-500',
    fontSize: 8,
    color: '#FFFFFF',
    marginRight: 10,
    maxWidth: '60%',
  },
  badgeIcon: {
    marginLeft: -10,
    marginTop: -10,
    zIndex: 2,
  },
  judul: {
    backgroundColor: '#FFF',
    maxHeight: 30,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: 'poppins-500',
    fontSize: 10,
    marginBottom: 10,
  },
  isi: {
    backgroundColor: '#FFF',
    height: 100,
    textAlignVertical: 'top',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontFamily: 'poppins-500',
    fontSize: 10,
    marginBottom: 10,
  },
  deskripsi: {
    backgroundColor: '#FFF',
    height: 80,
    textAlignVertical: 'top',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontFamily: 'poppins-500',
    fontSize: 10,
    marginBottom: 10,
  },
  tanggal: {
    backgroundColor: '#FFF',
    maxHeight: 30,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: 'poppins-500',
    fontSize: 10,
    marginBottom: 10,
  },
  lokasi: {
    backgroundColor: '#FFF',
    maxHeight: 30,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: 'poppins-500',
    fontSize: 10,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 100,
  },
  uploadText: {
    fontFamily: 'poppins-500',
    fontSize: 11,
    color: '#FFFFFF',
    paddingVertical: 2,
  },
});
