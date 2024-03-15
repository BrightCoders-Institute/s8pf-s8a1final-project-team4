import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import FormButton from '../Components/Button';
import {useNavigation} from '@react-navigation/native';

export default function LogInFingerprint() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.imgView}>
        <View style={styles.userImg} />
      </View>
      <View style={styles.buttonView}>
        <FormButton
          text={'Log in'}
          fn={() => {
            navigation.navigate('LogIn');
          }}
        />
        <FormButton text={'Log in with google'} fn={() => {}} />
      </View>
      <View style={styles.linksView}>
        <Text style={styles.links}>
          If you don't have an account,{' '}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
              register
            </Text>
          </TouchableOpacity>
          now
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Icon name="fingerprint" size={170} color={'rgba(74, 82, 255, 1)'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flex: 1,
    display: 'flex',
  },
  imgView: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 2,
  },
  userImg: {
    borderRadius: 100,
    width: 120,
    height: 120,
    backgroundColor: 'white',
  },
  buttonView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },

  linksView: {
    flex: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  links: {
    fontSize: 15,
  },
});
