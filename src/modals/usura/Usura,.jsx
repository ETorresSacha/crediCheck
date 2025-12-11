import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const Usura = ({ isVisible, setIsVisible, tcea }) => {
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
              <Text style={styles.riskWarning}>
                ⚠️ ADVERTENCIA LEGAL: LÍMITE DE USURA
              </Text>
            </View>
            <View style={styles.contentTectAlert}>
              <View style={styles.alertContainer}>
                <Text style={styles.textTitle}>
                  La Tasa Efectiva Anual (TEA) calculada para este préstamo es
                  de
                  <Text style={styles.teaValue}> {tcea} %</Text>.{"\n"}
                </Text>

                <Text style={styles.textTitle}>
                  Esta tasa supera el límite máximo legal establecido por el
                  BCRP/SBS. Cobrarla puede constituir el{" "}
                  <Text style={styles.keyLegalPhrase}>DELITO DE USURA</Text>{" "}
                  (Art. 214 del Código Penal).
                </Text>

                <Text style={styles.disclaimerText}>
                  Reconoce haber sido advertido del riesgo legal y asume la{" "}
                  <Text style={styles.keyLegalPhrase}>
                    RESPONSABILIDAD TOTAL y ÚNICA
                  </Text>{" "}
                  sobre la aplicación de esta tasa.
                </Text>
              </View>
            </View>

            {/*   Botones de acción */}
            <View style={styles.buttonContainer}>
              {/* Botón de Seguridad (Verde) */}
              <TouchableOpacity
                style={[styles.button, styles.safeButton]}
                onPress={() => setIsVisible(false)}
              >
                <Text style={styles.buttonText}>VOLVER</Text>
              </TouchableOpacity>

              {/* Botón de Riesgo (Rojo) */}
              <TouchableOpacity
                style={[styles.button, styles.riskButton]}
                onPress={() => setIsVisible(false)}
              >
                <Text style={styles.buttonText}>ACEPTO</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  modalContent: {
    padding: 15,
    backgroundColor: "#FDECEC", // Fondo muy claro para indicar advertencia
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D8000C", // Borde rojo fuerte
    textAlign: "left",
    width: "85%",
    alignSelf: "center",
  },
  contenttitle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    color: "cornsilk",
    fontWeight: "bold",
    borderTopLeftRadius: 14,
    marginTop: 20,
    borderTopRightRadius: 14,
  },

  textTitle: {
    fontWeight: "bold",
    fontFamily: "system-ui",
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  contentTectAlert: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    alignItems: "center",
    gap: 15,
  },
  textAlert: {
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
    width: "40%",
    textAlign: "center",
    alignItems: "center",
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

  alertContainer: {
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#D8000C", // Borde rojo fuerte
    textAlign: "left",
  },
  riskWarning: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D8000C", // Color rojo para riesgo
    marginBottom: 8,
    textAlign: "center",
  },
  teaValue: {
    fontSize: 18,
    fontWeight: "700", // Extra bold para el porcentaje
    color: "#000000",
    letterSpacing: 0.25,
  },
  keyLegalPhrase: {
    fontWeight: "bold",
    color: "#D8000C", // Rojo para resaltar "DELITO DE USURA"
  },
  disclaimerText: {
    fontSize: 14,
    color: "#444444",
    marginTop: 10,
    lineHeight: 20, // Mejora la legibilidad del párrafo de descargo
    letterSpacing: 0.25,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // O 'space-around'
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1, // Para que ocupen el mismo ancho
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white", // Texto blanco sobre colores fuertes
    fontWeight: "bold",
    fontSize: 14,
  },
  safeButton: {
    backgroundColor: "#4CAF50", // Verde
  },
  riskButton: {
    backgroundColor: "#D32F2F", // Rojo
  },
});
