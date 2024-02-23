import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CardScreen() {
  const [card, setCard] = useState(false);
  const handleCard = () => setCard(!card);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.userImage}
          source={{
            uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
          }}
        />
        <Text style={styles.title}>Registro de Tarjeta</Text>
      </View>
      <View style={styles.inputsContainer}>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Nombre Completo"
            placeholderTextColor="#999"
            style={styles.input}
          />
          <Icon name="person-outline" style={styles.icon} />
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Saldo Inicial"
            placeholderTextColor="#999"
            style={styles.input}
            keyboardType="numeric"
          />
          <Icon name="card-outline" style={styles.icon} />
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Nip"
            placeholderTextColor="#999"
            style={styles.input}
            keyboardType="numeric"
            maxLength={3}
          />
          <Icon name="lock-closed-outline" style={styles.icon} />
        </View>
        <View style={styles.debitView}>
          <TouchableOpacity onPress={handleCard}>
            <Icon name="arrow-back-outline" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.debitText}>{card ? 'Debito' : 'Crédito'}</Text>
          <TouchableOpacity onPress={handleCard}>
            <Icon name="arrow-forward-outline" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity>
          <Text style={styles.buttonText}>Crear Tarjeta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7D6FD1',
    paddingTop: 50,
    paddingHorizontal: 30,
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    gap: 40,
  },
  header: {
    display: 'flex',
    gap: 20,
    alignItems: 'center',
  },
  userImage: {
    borderRadius: 100,
    height: 100,
    width: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: 'white',
  },
  inputsContainer: {
    display: 'flex',
    gap: 20,
  },
  inputView: {
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    color: 'black',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  input: {
    color: 'black',
    fontWeight: '600',
    flex: 1,
  },
  icon: {
    fontSize: 28,
    color: 'blue',
  },
  debitView: {
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  debitText: {
    color: 'black',
    fontWeight: '900',
    fontSize: 17,
  },
  button: {
    backgroundColor: '#280ec9',
    borderRadius: 100,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 250,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 20,
  },
});
