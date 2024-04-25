import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {getHistory} from '../Firebase/db';
import {Movement} from '../Components/Movement';
import {formatDate} from '../Components/MoveCard';
import DatePicker from 'react-native-date-picker';
// import Mapsview from '../Components/MapView';

export default function History() {
  const [hover, setHover] = useState<string>('btn1');
  const [data, setData] = useState<object>({});
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handlePress = (name: string) => {
    setHover(name);
    filter(name);
    // console.log(date, date2);
  };

  async function filter(type: string) {
    try {
      const data = await getHistory();
      if (type == 'btn2') {
        const grupedByArrivals = data.debito.reduce(
          (acc: any, movement: object) => {
            const date = movement.fecha;
            if (!acc[date] && movement.monto > 0) {
              acc[date] = [];
            }
            if (movement.monto > 0) {
              acc[date].push(movement);
            }
            return acc;
          },
          {},
        );
        setData(grupedByArrivals);
      } else if (type == 'btn3') {
        const grupedBySent = data.debito.reduce(
          (acc: any, movement: object) => {
            const date = movement.fecha;
            if (!acc[date] && Number(movement.monto) < 0) {
              acc[date] = [];
            }
            if (Number(movement.monto) < 0) {
              acc[date].push(movement);
            }
            return acc;
          },
          {},
        );
        setData(grupedBySent);
      } else if (type == 'btn1') {
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getData = async () => {
    const data = await getHistory();
    console.log(data);
    const grupedByDate = data.debito.reduce((acc: any, movement: object) => {
      const date = movement.fecha;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(movement);
      return acc;
    }, {});
    // console.log(grupedByDate);
    setData(grupedByDate);
  };

  async function filterByDate() {
    try {
      if (date != null && date2 != null) {
        const data = await getHistory();
        const startDate = new Date(date);
        startDate.setUTCHours(0, 0, 0, 0);
        const endDate = new Date(date2);
        endDate.setUTCHours(0, 0, 0, 0);
        console.log('end', startDate);

        const grupedByDate = data.debito.reduce(
          (acc: any, movement: object) => {
            const Localdate = movement.fecha;
            let fecha = new Date(movement.fecha);
            if (fecha >= startDate && fecha <= endDate) {
              if (!acc[Localdate]) {
                acc[Localdate] = [];
              }
              acc[Localdate].push(movement);
              return acc;
            }
            return acc;
          },
          {},
        );

        // console.log(grupedByDate);
        setData(grupedByDate);
      } else {
        console.log('selecciona otra fecha ');
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const today = new Date();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.filters}>
          <TouchableOpacity
            style={hover === 'btn1' ? styles.selectedFilter : styles.filterView}
            onPress={() => handlePress('btn1')}>
            <Icon
              name="checkmark-circle-outline"
              size={30}
              color={hover === 'btn1' ? 'rgba(74, 82, 255, 1)' : 'white'}
            />
            <Text
              style={
                hover === 'btn1' ? styles.textFilterHover : styles.textFilter
              }>
              Todos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={hover === 'btn2' ? styles.selectedFilter : styles.filterView}
            onPress={() => handlePress('btn2')}>
            <Icon
              name="trending-up-outline"
              size={30}
              color={hover === 'btn2' ? 'rgba(74, 82, 255, 1)' : 'white'}
            />
            <Text
              style={
                hover === 'btn2' ? styles.textFilterHover : styles.textFilter
              }>
              Entradas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={hover === 'btn3' ? styles.selectedFilter : styles.filterView}
            onPress={() => handlePress('btn3')}>
            <Icon
              name="trending-down-outline"
              size={30}
              color={hover === 'btn3' ? 'rgba(74, 82, 255, 1)' : 'white'}
            />
            <Text
              style={
                hover === 'btn3' ? styles.textFilterHover : styles.textFilter
              }>
              Salidas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={hover === 'btn4' ? styles.selectedFilter : styles.filterView}
            onPress={() => handlePress('btn4')}>
            <Icon
              name="calendar"
              size={30}
              color={hover === 'btn4' ? 'rgba(74, 82, 255, 1)' : 'white'}
            />
            <Text
              style={
                hover === 'btn4' ? styles.textFilterHover : styles.textFilter
              }>
              Fechas
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filters} />
      </View>

      <View style={styles.mainHistory}>
        {hover == 'btn4' && (
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                style={styles.btnBack}
                onPress={() => setOpen(true)}
                disabled={false}>
                <Text style={styles.btnText}>
                  {date != null ? date.toLocaleDateString() : 'Fecha inicial'}
                </Text>
                <Icon
                  name="calendar"
                  size={30}
                  color={'rgba(74, 82, 255, 1)'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnBack}
                onPress={() => setOpen2(true)}
                disabled={false}>
                <Text style={styles.btnText}>
                  {date2 != null ? date2.toLocaleDateString() : 'Fecha final'}
                </Text>
                <Icon
                  name="calendar"
                  size={30}
                  color={'rgba(74, 82, 255, 1)'}
                />
              </TouchableOpacity>
              <DatePicker
                mode="date"
                modal
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
                maximumDate={date2}
                buttonColor="#00079A"
                dividerColor="blue"
                title="Seleccionar primer fecha"
              />
              <DatePicker
                mode="date"
                modal
                open={open2}
                date={date2}
                onConfirm={date => {
                  setOpen2(false);
                  setDate2(date);
                }}
                onCancel={() => {
                  setOpen2(false);
                }}
                maximumDate={today}
                buttonColor="#00079A"
                dividerColor="blue"
                title="Seleccionar segunda fecha"
                minimumDate={date}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: 15,
              }}>
              <TouchableOpacity
                style={[
                  styles.btnBack,
                  {backgroundColor: 'rgba(74, 82, 255, 1)'},
                ]}
                onPress={() => filterByDate()}>
                <Text style={[styles.btnText, {color: 'white'}]}>Filtrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {Object.keys(data).length === 0 && (
          <Text
            style={{
              color: 'rgba(74, 82, 255, 1)',
              fontSize: 15,
              alignSelf: 'center',
            }}>
            No hay movimientos para mostrar
          </Text>
        )}
        <FlatList
          data={Object.entries(data)}
          keyExtractor={item => item[0]}
          renderItem={({item}) => (
            <View>
              <Text style={styles.date}>{formatDate(item[0])}</Text>
              <FlatList
                data={item[1]}
                renderItem={({item: movimiento}) => (
                  <Movement item={movimiento} />
                )}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flex: 1,
    gap: 40,
  },
  header: {
    backgroundColor: '#00079A',
    flexDirection: 'column',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
    paddingVertical: 40,
    borderBottomRightRadius: 40,
  },
  mainHistory: {
    flex: 1,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filters: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textFilter: {
    color: 'white',
    fontSize: 20,
    padding: 10,
  },
  textFilterHover: {
    color: '#00079A',
    fontSize: 20,
    padding: 10,
  },
  filterView: {
    alignItems: 'center',
  },
  selectedFilter: {
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    color: '#00079A',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    paddingLeft: 15,
  },
  btnBack: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(74, 82, 255, 1)',
    width: '40%',
    shadowOffset: {width: 0, height: 100},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 13,
    // display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnText: {
    color: 'rgba(74, 82, 255, 1)',
    fontSize: 15,
    fontWeight: '600',
  },
});
