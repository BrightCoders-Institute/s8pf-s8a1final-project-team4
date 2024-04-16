import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput,Button } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import { getHistory } from '../Firebase/db';
import { Movement} from '../Components/Movement';
import { formatDate } from '../Components/MoveCard';
import FormInput from '../Components/Input';
import FormButton from '../Components/Button';
import DatePicker from 'react-native-date-picker'


export default function History() {
  const navigation = useNavigation()
  const [hover, setHover] = useState<string>('btn1')
  const [data, setData] = useState<object>({})
  const [date, setDate] = useState(new Date())
  const [date2, setDate2] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)

  const handlePress = (name: string) => {
    setHover(name)
    filter(name)
    console.log(date,date2)
  }
  async function filter(type: string) {
    try {
      const data = await getHistory()
      if (type == 'btn2') {
        const grupedByArrivals = data.debito.reduce((acc: any, movement: object) => {
          const date = movement.fecha;
          if (!acc[date] && movement.monto > 0) {
            acc[date] = []
          }
          if (movement.monto > 0) {
            acc[date].push(movement);
          }
          return acc;
        }, {});
        setData(grupedByArrivals)
      } else if (type == 'btn3') {
        const grupedBySent = data.debito.reduce((acc: any, movement: object) => {
          const date = movement.fecha;
          if (!acc[date] && Number(movement.monto) < 0) {
            acc[date] = []
          }
          if (Number(movement.monto) < 0) {
            acc[date].push(movement);
          }
          return acc;
        }, {});
        setData(grupedBySent)
      } else if (type == 'btn1') {
        getData()
      }
    } catch (err) {
      console.log(err)
    }
  }
  const getData = async () => {
    const data = await getHistory()
    console.log(data)
    const grupedByDate = data.debito.reduce((acc: any, movement: object) => {
      const date = movement.fecha;
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(movement);
      return acc;
    }, {});
    console.log(grupedByDate)
    setData(grupedByDate)
  }

  function filterByDate(){
    try{
      if(date != null && date2 != null ){
        console.log("format",date.toString())
        console.log(date,date2)
      } else {
        console.log("selecciona otra fecha ")
      }

    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.head}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-back" size={30} color={'white'} />
          </TouchableOpacity>
          <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", marginLeft: 30 }}>Historial</Text>
        </View>
        <View>
          <View style={styles.filters}>

            <TouchableOpacity style={[hover === 'btn1' && styles.selectedFilter]} onPress={() => handlePress('btn1')}>
              <Text style={[hover === 'btn1' && styles.textFilterHover, hover != 'btn1' && styles.textFilter]}>Todos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[hover === 'btn2' && styles.selectedFilter]} onPress={() => handlePress('btn2')}>
              <Text style={[hover === 'btn2' && styles.textFilterHover, hover != 'btn2' && styles.textFilter]}>Entradas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[hover === 'btn3' && styles.selectedFilter]} onPress={() => handlePress('btn3')}>
              <Text style={[hover === 'btn3' && styles.textFilterHover, hover != 'btn3' && styles.textFilter]}>Salidas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[hover === 'btn4' && styles.selectedFilter]} onPress={() => handlePress('btn4')}>
              <Text style={[hover === 'btn4' && styles.textFilterHover, hover != 'btn4' && styles.textFilter]}>Fechas</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.mainHistory}>
        {
          hover == 'btn4' &&
          
          <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
            <TouchableOpacity style={styles.btnBack} onPress={() => setOpen(true)} disabled={false} >
              <Text style={styles.btnText}>{date != null ? date.toLocaleDateString() : "Fecha inicial"}</Text>
              <Icon name='calendar' size={30} color={'rgba(74, 82, 255, 1)'}></Icon>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnBack} onPress={() => setOpen2(true)} disabled={false} >
              <Text style={styles.btnText}>{date2 != null ? date2.toLocaleDateString() : "Fecha final"}</Text>
              <Icon name='calendar' size={30} color={'rgba(74, 82, 255, 1)'}></Icon>
            </TouchableOpacity>
           
      <DatePicker
        mode='date'
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          filterByDate()
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
       <DatePicker
        mode='date'
        modal
        open={open2}
        date={date2}
        onConfirm={(date) => {
          setOpen2(false)
          setDate2(date)
          filterByDate()
        }}
        onCancel={() => {
          setOpen2(false)
        }}
      />
          </View>
        }
        <FlatList
          data={Object.entries(data)}
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.date}>
                {formatDate(item[0])}
              </Text>
              <FlatList
                data={item[1]}
                renderItem={({ item: movimiento }) => (
                  <Movement item={movimiento} />
                )}
              />
            </View>
          )}
        />
      </View>
    </View>
  )
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
    paddingVertical: 15,
    flex: 1
  },
  mainHistory: {
    flex: 4
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filters: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textFilter: {
    color: "white",
    fontSize: 20,
    padding: 10
  },
  textFilterHover: {
    color: "#00079A",
    fontSize: 20,
    padding: 10
  },
  selectedFilter: {
    backgroundColor: "white",
    borderRadius: 20,

  },
  head: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    color: '#00079A', fontSize: 22, fontWeight: "bold", margin: 10
  },
  btnBack:{
    backgroundColor: 'white',
    borderWidth:1,
    borderColor:"rgba(74, 82, 255, 1)",
    width: '40%',
    shadowOffset: {width: 0, height: 100},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 13,
    display:"flex",
    justifyContent:"space-around",
    alignItems:"center",
    flexDirection:"row"
  },
  btnText:{
    color: 'rgba(74, 82, 255, 1)',
    fontSize: 15,
    fontWeight: '600'
  }
 
});
