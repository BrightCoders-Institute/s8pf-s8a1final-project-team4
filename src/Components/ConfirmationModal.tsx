import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
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
            <Button text="Cancelar" fn={onCancel} />
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
    height: 220,
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
});
