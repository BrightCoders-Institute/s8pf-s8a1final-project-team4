import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import FormButton from '../Components/Button';
import {useNavigation} from '@react-navigation/native';

export default function LogInFingerprint() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoView}>
        <Text style={styles.logoText}>SnapPay</Text>
      </View>
      <Icon2 name="user" size={80} color={'#00079A'} style={styles.align} />
      <View style={{gap: 30}}>
        <FormButton
          text={'Log in'}
          fn={() => {
            navigation.navigate('LogIn');
          }}
        />
        <View style={{gap: 25}}>
          <FormButton text={'Log in with Google'} fn={() => {}} />
          <View style={styles.textView}>
            <Text style={styles.text}>If you don't have an account,</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text style={styles.register}>register</Text>
            </TouchableOpacity>
            <Text style={styles.text}>now</Text>
          </View>
        </View>
        <View style={styles.align}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}
            style={{paddingTop: 20}}>
            <Icon name="fingerprint" size={160} color={'#4A52FF'} />
          </TouchableOpacity>
          <Text style={{color: 'grey', fontSize: 15}}>
            Entrar con huella digital
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flex: 1,
    gap: 50,
  },
  logoView: {
    backgroundColor: '#00079A',
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderBottomRightRadius: 8,
  },
  logoText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  align: {
    alignSelf: 'center',
  },
  textView: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: 'black',
    fontSize: 15,
  },
  register: {
    color: '#041CF0',
    textDecorationLine: 'underline',
    fontWeight: '900',
    fontSize: 18,
  },
});
