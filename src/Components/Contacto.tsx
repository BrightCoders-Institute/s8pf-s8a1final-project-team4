import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

type Props = {
  nombre: string | number; // Permitir que nombre sea un número también
  numero: number;
  icono: string;
  imagen?: string;
};

export default function Contacto({ nombre, numero, icono, imagen }: Props) {
  const navigation = useNavigation();

  const handleContactPress = () => {
    console.log("Este es mi número: " + numero);
    navigation.navigate('Transferir', { name: nombre, card_number: numero });
  };

  // Verificar si nombre es una cadena de texto y convertirlo a texto si es un número
  const nombreTexto = typeof nombre === 'number' ? nombre.toString() : nombre;

  return (
    <TouchableOpacity
      style={styles.container}
<<<<<<< Updated upstream
      onPress={() => {
        navigation.navigate('Transferir', {name: nombre, card_number: numero});
      }}>
=======
      onPress={handleContactPress}>
>>>>>>> Stashed changes
      {imagen ? (
        <Image
          style={styles.img}
          source={{
            uri: imagen,
          }}
        />
      ) : (
        <View style={styles.headerImgTextCont}>
          {/* Verificar si nombreTexto es una cadena de texto antes de usar toUpperCase */}
          {typeof nombreTexto === 'string' && nombreTexto.length > 0 && (
            <Text style={styles.headerImgText}>{nombreTexto[0].toUpperCase()}</Text>
          )}
        </View>
      )}
      <View style={styles.containerInfo}>
        <Text style={styles.text}>{nombreTexto}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.text}>{'● ' + numero?.toString().slice(-4)}</Text>
          <Icon name={icono} size={30} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: 20,
  },
  img: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },
  headerImgTextCont: {
    height: 70,
    width: 70,
    borderRadius: 100,
    backgroundColor: '#4A52FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImgText: {
    color: 'white',
    fontSize: 28,
  },
  containerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#00079A',
    padding: 15,
    borderRadius: 4,
  },
  text: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 15,
  },
});
