import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import { getHistory } from '../Firebase/db';
import Movement from '../Components/Movement';
import { formatDate } from '../Components/MoveCard';
export default function History() {
  const navigation = useNavigation()
  const [hover, setHover] = useState<string>('btn1')
  const [data, setData] = useState<object>({})
  
  const handlePress = (name: string) => {
    setHover(name)
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
     setData(grupedByDate)
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
        {/* Esto deberia ir en un componente externo para reutilizarse */}
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

                  <View style={styles.main}>
                    <View style={styles.card}>
                    {
                            Number(movimiento.monto) > 0 ? 
                            <View style={{ width: 30, height: 30, backgroundColor: "#54AB5F", borderRadius: 20 }} />
                            : 
                            <View style={{ width: 30, height: 30, backgroundColor: "red", borderRadius: 20 }} />
                          }
                        <View style={styles.texts}>
                          <View style={{alignSelf:"flex-end"}} >
                            <Text style={styles.transferName}>{movimiento.descripcion}</Text>
                            <Text style={styles.transferType}>{movimiento.tipo}</Text>
                          </View>
                          {
                            Number(movimiento.monto) > 0 ? 
                            <Text style={styles.number}>${movimiento.monto}</Text> 
                            : 
                            <Text style={[styles.number,{color:"red"}]}>${movimiento.monto}</Text>
                          }
                       
                        </View>
                    </View>
                  </View>

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
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    },
  date: {
    color: '#00079A', fontSize: 22, fontWeight: "bold",margin:10
  },
  transferName: {
    color: "black", fontSize: 20
  }, transferType: {
    fontSize: 15
  },
  number: {
    color: "#54AB5F",
    fontSize: 22,
    alignSelf:"flex-start"
  },
  texts:{
    display:"flex",
    flexDirection:"row",
   
    width:300,
    justifyContent:"space-between"

  }
})
