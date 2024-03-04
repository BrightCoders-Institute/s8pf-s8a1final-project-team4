import { StyleSheet, View } from "react-native";
import ProfileImage from "./ProfileImage";

function ProfileImageScreen() {
    return (
      <View style={style.main}>
        <ProfileImage />
      </View>
    );
  }
  
  const style = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
    },
  });

  export default ProfileImageScreen;