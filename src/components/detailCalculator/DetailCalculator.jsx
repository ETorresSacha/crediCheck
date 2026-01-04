import React from "react";
import { View, StyleSheet, Text } from "react-native";

const DetailCalculator = ({ resultCuota, periodo }) => {
  const cuota = resultCuota[0]?.cuotaFinal;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>S/. {cuota} </Text>
        <Text style={[styles.text, { fontSize: 20 }]}> {periodo}</Text>
      </View>
    </View>
  );
};

export default DetailCalculator;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "cornsilk",
    textAlign: "center",
  },
});
