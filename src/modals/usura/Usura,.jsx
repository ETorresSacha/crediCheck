import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const Usura = ({ isVisible, setIsVisible }) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.contenttitle}>
              <Text
                style={[
                  styles.textTitle,
                  {
                    textAlign: "center",
                    color: "orange",
                    fontSize: RFValue(18),
                  },
                ]}
              >
                ALERTA LEGAL
              </Text>
            </View>
            <View style={styles.contentTectAlert}>
              <Octicons name="alert-fill" size={80} color="yellow" />
              <View style={styles.textAlert}>
                <Text style={[styles.textTitle, { textAlign: "center" }]}>
                  "La tasa ingresada [X%] excede el límite máximo legal para
                  microcréditos según el BCRP. Continuar el préstamo con esta
                  tasa puede constituir el delito de Usura."
                </Text>
              </View>
            </View>
            <View style={styles.contentButtons}>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.textButton}>CONTINUAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.textButton}>CANCELAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Usura;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "rgba(6, 18, 20, 0.836)",
    borderRadius: 15,
    // position: "absolute",
    // top: "30%",
    // left: "7%",
    // right: "7%",
    borderColor: "yellow",
    borderWidth: 1,
    //paddingVertical: 10,
  },
  contenttitle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    color: "cornsilk",
    fontWeight: "bold",
    //backgroundColor: "#E7E7E5",
    borderTopLeftRadius: 14,
    marginTop: 20,
    borderTopRightRadius: 14,
  },

  textTitle: {
    //fontSize: 20,
    fontWeight: "bold",
    color: "white",
    fontFamily: "system-ui",
  },
  contentTectAlert: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    alignItems: "center",
    gap: 15,
  },
  textAlert: {
    // backgroundColor: "#f60e2b",
    width: "65%",
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    height: 40,
    justifyContent: "center",
    borderRadius: 10,
    gap: 10,
    elevation: 5,
    borderWidth: 1,
    backgroundColor: "rgb(36, 224, 221)",
    //marginBottom: 15,
    width: "40%",
    textAlign: "center",
    alignItems: "center",
    //alignSelf: "center",
    // marginHorizontal: 100,
  },
  contentButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  textButton: {
    fontSize: RFValue(14),
    color: "cornsilk",
    fontFamily: "system-ui",
  },
});
