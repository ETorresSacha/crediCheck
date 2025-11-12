import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const ItemsHome = ({ dataConfiguration }) => {
  const navigation = useNavigation();

  const handleOnPress = (value, data) => {
    navigation.navigate(value, data);
  };
  return (
    <View style={styles.container}>
      {/* clientes pendientes */}
      <TouchableOpacity
        onPress={() => handleOnPress("Clientes")}
        style={styles.item}
      >
        <FontAwesome name="users" size={100} color="rgb(36, 224, 58)" />
        <Text style={styles.text}> Clientes Pendientes</Text>
      </TouchableOpacity>

      {/* clientes cancelados */}
      <TouchableOpacity
        onPress={() => handleOnPress("Clientes", { enable: true })}
        style={styles.item}
      >
        <MaterialCommunityIcons
          name="account-cancel"
          size={100}
          color="rgb(36, 224, 221)"
        />
        <Text style={styles.text}> Clientes Cancelados</Text>
      </TouchableOpacity>

      {/* calculadora */}
      <TouchableOpacity
        onPress={() => handleOnPress("Calculadora", dataConfiguration)}
        style={styles.item}
      >
        <Ionicons name="calculator" size={100} color="rgb(224, 205, 36)" />
        <Text style={styles.text}> Evaluar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemsHome;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
    marginTop: "20%",
    paddingVertical: RFPercentage(5),
    borderRadius: 20,
    gap: 30,
  },

  text: {
    fontWeight: "bold",
    color: "cornsilk",
    textAlign: "center",
    width: RFPercentage(15),
    fontSize: RFValue(17),
  },
  item: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
});
