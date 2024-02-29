import React from 'react'
import { View, StyleSheet, Text, Image, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StylesText } from '../Styles/TextStyles';




export default function ProfileImage() {
    type ItemProps = { img: string }
     const imgs = [
        {
            id: 1,
            img: "https://i.seadn.io/gae/P0gV3Ci4aMOQGD4QPob0rv2b2l7unl7s92Euzt9naH-FMStffkImfBFrgxOx0c5lCTyTUF1j6fGMqJE6ugR9UfPsTvNLaRxrQHgR5A?auto=format&dpr=1&w=1000"
        },
        {
            id: 2,
            img: "https://i.pinimg.com/736x/99/27/90/99279086833d4d0662c19f294035630b.jpg"
        },
        {
            id: 3,
            img: "https://i.pinimg.com/originals/cd/a2/54/cda2540385d1570523ccb205a499a910.jpg"
        },
        {
            id: 4,
            img: "https://i.pinimg.com/736x/81/7e/31/817e31e32b2f2fefa062da3ba7bc6a9b.jpg"
        },
        {
            id: 5,
            img: "https://art.ngfiles.com/comments/66000/iu_66799_7115510.jpg"
        },
        {
            id: 6,
            img: "https://ih1.redbubble.net/image.1223298883.5505/flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg"
        },
        {
            id: 7,
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxjcGhIL3tSJ5FJ-2FaBSvm6mx93DgSbLww&usqp=CAU"
        },
        {
            id: 8,
            img: "https://static.wikia.nocookie.net/xbox/images/8/81/Soccer-ball-gamerpic.png/revision/latest/scale-to-width-down/250?cb=20200428004844"
        },
        {
            id: 9,
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrZmzTeDmH0HElobebKYl_OWNoptf4RLawCA&usqp=CAU"
        },
        {
            id: 10,
            img: "https://i.seadn.io/gae/P0gV3Ci4aMOQGD4QPob0rv2b2l7unl7s92Euzt9naH-FMStffkImfBFrgxOx0c5lCTyTUF1j6fGMqJE6ugR9UfPsTvNLaRxrQHgR5A?auto=format&dpr=1&w=1000"
        },
        {
            id: 11,
            img: "https://i.seadn.io/gae/P0gV3Ci4aMOQGD4QPob0rv2b2l7unl7s92Euzt9naH-FMStffkImfBFrgxOx0c5lCTyTUF1j6fGMqJE6ugR9UfPsTvNLaRxrQHgR5A?auto=format&dpr=1&w=1000"
        },
        {
            id: 12,
            img: "https://i.seadn.io/gae/P0gV3Ci4aMOQGD4QPob0rv2b2l7unl7s92Euzt9naH-FMStffkImfBFrgxOx0c5lCTyTUF1j6fGMqJE6ugR9UfPsTvNLaRxrQHgR5A?auto=format&dpr=1&w=1000"
        },
        {
            id: 13,
            img: "https://i.seadn.io/gae/P0gV3Ci4aMOQGD4QPob0rv2b2l7unl7s92Euzt9naH-FMStffkImfBFrgxOx0c5lCTyTUF1j6fGMqJE6ugR9UfPsTvNLaRxrQHgR5A?auto=format&dpr=1&w=1000"
        },
        {
            id: 14,
            img: "https://i.seadn.io/gae/P0gV3Ci4aMOQGD4QPob0rv2b2l7unl7s92Euzt9naH-FMStffkImfBFrgxOx0c5lCTyTUF1j6fGMqJE6ugR9UfPsTvNLaRxrQHgR5A?auto=format&dpr=1&w=1000"
        },
        {
            id: 15,
            img: "https://i.seadn.io/gae/P0gV3Ci4aMOQGD4QPob0rv2b2l7unl7s92Euzt9naH-FMStffkImfBFrgxOx0c5lCTyTUF1j6fGMqJE6ugR9UfPsTvNLaRxrQHgR5A?auto=format&dpr=1&w=1000"
        },
        {
            id: 16,
            img: "https://i.seadn.io/gae/P0gV3Ci4aMOQGD4QPob0rv2b2l7unl7s92Euzt9naH-FMStffkImfBFrgxOx0c5lCTyTUF1j6fGMqJE6ugR9UfPsTvNLaRxrQHgR5A?auto=format&dpr=1&w=1000"
        },
        {
            id: 17,
            img: "https://i.seadn.io/gae/P0gV3Ci4aMOQGD4QPob0rv2b2l7unl7s92Euzt9naH-FMStffkImfBFrgxOx0c5lCTyTUF1j6fGMqJE6ugR9UfPsTvNLaRxrQHgR5A?auto=format&dpr=1&w=1000"
        },
        {
            id: 18,
            img: "https://i.seadn.io/gae/P0gV3Ci4aMOQGD4QPob0rv2b2l7unl7s92Euzt9naH-FMStffkImfBFrgxOx0c5lCTyTUF1j6fGMqJE6ugR9UfPsTvNLaRxrQHgR5A?auto=format&dpr=1&w=1000"
        },
        {
            id: 19,
            img: "https://i.seadn.io/gae/P0gV3Ci4aMOQGD4QPob0rv2b2l7unl7s92Euzt9naH-FMStffkImfBFrgxOx0c5lCTyTUF1j6fGMqJE6ugR9UfPsTvNLaRxrQHgR5A?auto=format&dpr=1&w=1000"
        },
        {
            id: 20,
            img: "https://i.seadn.io/gae/P0gV3Ci4aMOQGD4QPob0rv2b2l7unl7s92Euzt9naH-FMStffkImfBFrgxOx0c5lCTyTUF1j6fGMqJE6ugR9UfPsTvNLaRxrQHgR5A?auto=format&dpr=1&w=1000"
        }
    ];
    //item para renderizar en la flatList, aqui debería de ir la interración con las imágenes
    const Item = ({ img }: ItemProps) => (

        <View style={{ margin: 15 }}>
            <Image style={styles.icon} source={{ uri: img }} />
        </View>
    )


    return (
        //contenedor principal
        <View style={styles.mainView}>
            {/* contenedor de icono de usuario, pero no se ven los iconos aun */}
            <View style={styles.userIcon}>
                <Image style={styles.icon} source={{ uri: "https://i.seadn.io/gae/P0gV3Ci4aMOQGD4QPob0rv2b2l7unl7s92Euzt9naH-FMStffkImfBFrgxOx0c5lCTyTUF1j6fGMqJE6ugR9UfPsTvNLaRxrQHgR5A?auto=format&dpr=1&w=1000" }} />
            </View>
            {/* contenedor blanco donde esta la flatlist */}
            <View style={styles.grid}>
                {/* flatlist que obtiene la imágenes de el array imgs, renderiza la estructura del item que esta 
                al inicio de la funcion, pasandole como imagen el item.img, se separa en 3 columnas directamente
                en la flatllist y no en los estilos porque asi recomendaba la documentación, ademas de que la 'key' 
                debe de ser igual al 'numColumns' */}
                <FlatList
                    data={imgs}
                    renderItem={({ item }) => <Item img={item.img} />}
                    key={3}
                    numColumns={3}
                />
            </View>
            {/* contenedor de el icono y el texto  */}
            <View style={styles.fingerPrint}>
                <Icon name='fingerprint' size={80} />
                <Text style={StylesText.accountText}>If you don't have an account, <Text style={StylesText.links}>register</Text> now </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#7D6FD1"
    },

    icon: {
        borderRadius: 50,
        height: 80,
        width: 80
    },
    grid: {
        borderColor: "black",
        borderWidth: 3,
        height: "50%",
        backgroundColor: "white",
        width: "95%",
        display: "flex",
        justifyContent: "center",
        padding: 30,
        alignItems: "center",
        borderRadius: 25,

    },
    fingerPrint: {
        height: "20%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
    }, userIcon: {
        display: "flex",
        justifyContent: "flex-end",
        margin: 15
    }

})

