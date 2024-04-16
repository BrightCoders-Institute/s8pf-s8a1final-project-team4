import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import Button from './Button';

export default function ConfirmationModal({
  visible,
  message,
  onCancel,
  onConfirm,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonView}>
            <Button text="Confirmar" fn={onConfirm} />
            <TouchableOpacity style={styles.buttons} onPress={onCancel}>
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    backgroundColor: 'white',
    // height: 220,
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    gap: 10,
  },
  message: {
    color: 'black',
    fontSize: 20,
  },
  buttonView: {marginTop: 20, gap: 30},
  buttons: {
    backgroundColor: '#D03C42',
    width: '60%',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 100},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 13,
    alignSelf: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
  },
});
