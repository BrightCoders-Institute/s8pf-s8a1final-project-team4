import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
//por ahora este componente tiene errores al manejarlo como funcion, en futuras issues se puede seccionar para poder reutilizarlo 
type movimiento = {
    descripcion: string
    tipo: string
    monto: number
}
export const Movement = ({ item }: any) => {
    return (
        <View style={styles.main}>
            <View style={styles.card}>
                {

                    Number(item.monto) > 0 ?
                        <View style={{ width: 30, height: 30, backgroundColor: "#54AB5F", borderRadius: 20 }} />
                        :
                        <View style={{ width: 30, height: 30, backgroundColor: "red", borderRadius: 20 }} />

                }
                <View style={styles.texts}>
                    <View style={{ alignSelf: "flex-end" }} >
                        <Text style={styles.transferName}>{item.descripcion}</Text>
                        <Text style={styles.transferType}>{item.tipo}</Text>
                    </View>
                    {
                        Number(item.monto) > 0 ?
                            <Text style={styles.number}>${item.monto}</Text>
                            :
                            <Text style={[styles.number, { color: "red" }]}>${item.monto}</Text>
                    }

                </View>
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
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
    transferName: {
        color: "black", fontSize: 20
    }, transferType: {
        fontSize: 15
    },
    number: {
        color: "#54AB5F",
        fontSize: 22,
        alignSelf: "flex-start"
    },
    texts: {
        display: "flex",
        flexDirection: "row",
        width: 300,
        justifyContent: "space-between"

    }


})
