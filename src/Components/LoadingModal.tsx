import React from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';

export default function LoadingModal({visible}) {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View
        style={{
          backgroundColor: 'rgba(255,255,255,.7)',
          flex: 1,
          justifyContent: 'center',
        }}>
        <View style={{alignSelf: 'center', padding: 50}}>
          <ActivityIndicator size={100} color={'blue'} />
          <Text
            style={{
              alignSelf: 'center',
              color: 'blue',
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
