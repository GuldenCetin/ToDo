import React, { useState } from 'react';
import { SafeAreaView, Text, Alert, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera } from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import styles from './components/styles';
import Button from './components/Button/Button';

const App = () => {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Dosya Yükleme Fonksiyonu
  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setUploadedFile(result[0].uri);
      Alert.alert('Dosya Yüklendi', `Yüklenen dosya: ${result[0].name}`);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Kullanıcı dosya seçimini iptal etti.');
      } else {
        console.error('Dosya yükleme hatası:', err);
      }
    }
  };

  // Kamera Kullanımı Fonksiyonu
  const handleTakePhoto = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Kamera İzni Gerekiyor',
          message: 'Fotoğraf çekmek için kameraya erişim izni vermelisiniz.',
          buttonNeutral: 'Daha Sonra Sor',
          buttonNegative: 'İptal',
          buttonPositive: 'Tamam',
        }
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Uyarı', 'Kamera izni verilmedi.');
        return;
      }
    }

    // Kamera başlatma işlemi
    launchCamera({ mediaType: 'photo', cameraType: 'back' }, (response) => {
      if (response.didCancel) {
        Alert.alert('Fotoğraf çekiminden vazgeçildi.');
      } else if (response.errorMessage) {
        Alert.alert('Hata', response.errorMessage);
      } else if (response.assets && response.assets[0].uri) {
        setPhoto(response.assets[0].uri);
        Alert.alert('Fotoğraf Çekildi', 'Fotoğraf başarıyla çekildi.');
      }
    });
  };

  // GPS Verisi Alma Fonksiyonu
  const getLocation = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Konum İzni Gerekiyor',
          message: 'Konum verilerinizi alabilmek için izin vermelisiniz.',
          buttonNeutral: 'Daha Sonra Sor',
          buttonNegative: 'İptal',
          buttonPositive: 'Tamam',
        }
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Uyarı', 'Konum izni verilmedi.');
        return;
      }
    }

    // Geolocation API'yi kullanarak konumu al
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        Alert.alert('Konum Alındı', `Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      (error) => {
        console.warn(error.message);
        Alert.alert('Konum Hatası', 'Konum verisi alınamadı.');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>React Native - Kamera, Dosya Yükleme ve GPS</Text>

      {/* Dosya Yükleme */}
      <Button onPress={handleFileUpload} title="Dosya Yükle" />
      {uploadedFile && <Text>Yüklenen Dosya: {uploadedFile}</Text>}

      {/* Fotoğraf Çekme */}
      <Button onPress={handleTakePhoto} title="Fotoğraf Çekme" />
      {photo && <Text>Çekilen Fotoğraf: {photo}</Text>}

      {/* GPS Verisi */}
      <Button onPress={getLocation} title="Konum Al" />
      {location && (
        <Text>
          Konum: Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      )}
    </SafeAreaView>
  );
};

export default App;
