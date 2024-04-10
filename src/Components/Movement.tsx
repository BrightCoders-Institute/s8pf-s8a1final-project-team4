import React from 'react'
import { StyleSheet, View, Text} from 'react-native'
//por ahora este componente tiene errores al manejarlo como funcion, en futuras issues se puede seccionar para poder reutilizarlo 
const Movement = (transferName?: string, transferType?: string, number?: string) => {
    return (
        <View>
            <View style={styles.main}>
                <View style={styles.card}>
                    <View style={{ width: 30, height: 30, backgroundColor: "#54AB5F", borderRadius: 20 }} />
                    <View>
                        <View>
                            <View>
                                <Text style={styles.transferName}>{transferName}</Text>
                                <Text style={styles.transferType}>{transferType}</Text>
                            </View>
                            <Text style={styles.number}>${number}</Text>
                        </View>
                    </View>

                </View>
            </View>
        </View>
    )
}
export default Movement
const styles = StyleSheet.create({
    main: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    card: {
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90%"
    },
    date: {
        color: '#00079A', fontSize: 22, fontWeight: "bold"
    },
    transferName: {
        color: "black", fontSize: 20
    }, transferType: {
        fontSize: 15
    },
    number: {
        color: "#54AB5F",
        fontSize: 22
    }


})
