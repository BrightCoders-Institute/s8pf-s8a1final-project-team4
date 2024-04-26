import React from 'react';
import {View, Text, Modal, StyleSheet, ActivityIndicator} from 'react-native';

export default function LoadingModal({visible}) {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View
        style={{
          backgroundColor: 'rgba(0, 7, 88,.9)',
          flex: 1,
          justifyContent: 'center',
        }}>
        <View style={{alignSelf: 'center', padding: 50}}>
          <ActivityIndicator size={115} color={'white'} />
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
              fontSize: 20,
              fontWeight: '900',
            }}>
            Espera ...
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
