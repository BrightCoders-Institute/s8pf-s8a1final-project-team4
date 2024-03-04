import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface Props {
  sourceUri?: string; 
}

const ImageComp: React.FC<Props> = ({ sourceUri = 'https://i.seadn.io/gae/P0gV3Ci4aMOQGD4QPob0rv2b2l7unl7s92Euzt9naH-FMStffkImfBFrgxOx0c5lCTyTUF1j6fGMqJE6ugR9UfPsTvNLaRxrQHgR5A?auto=format&dpr=1&w=1000' }) => {
  React.useEffect(() => {
    console.log('ImageComp se está renderizando con la nueva URL:', sourceUri);
  }, [sourceUri]);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: sourceUri,
        }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: '',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
});

export default ImageComp;
