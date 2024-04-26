import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';

export default function InfoModal({visible, message, onCancel}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}>
      <View style={styles.background}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.close} onPress={onCancel}>
            <Icon name="close-outline" size={35} color={'#007CFF'} />
          </TouchableOpacity>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(138, 138, 138 ,0.5)',
  },
  container: {
    backgroundColor: '#021B9E',
    margin: 20,
    borderRadius: 15,
    paddingTop: 50,
    alignItems: 'center',
    gap: 10,
    borderColor: '#00079A',
    borderWidth: 3,
    elevation: 10,
  },
  message: {
    paddingHorizontal: 15,
    paddingBottom: 30,
    color: 'white',
    fontSize: 22,
    // fontFamily: 'arial',
  },
  close: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'white',
    elevation: 15,
    borderRadius: 100,
    alignSelf: 'flex-end',
    borderWidth: 2,
    borderColor: '#007CFF',
  },
});
