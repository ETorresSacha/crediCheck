import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform } from "react-native";
import Routes from "./src/routes/Routes.jsx";
//import { Provider as PaperProvider, RadioButton } from "react-native-paper";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        // paddingTop: Platform.OS === "android" ? 25 : 0,
      }}  
    > 
      <Routes />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
    alignItems: "center",
    justifyContent: "center",
  },
});


//! TENER EN CUENTA ESTE TEMA
// 💡 Recomendaciones Clave para tu Aplicación (Clave Legal)
// Para que tu aplicación sea útil, atractiva y reduzca el riesgo de facilitar la usura, te sugiero:


// 1. Añadir un "Alerta de Usura": Esta es la recomendación más importante.

// * Implementa una función en la aplicación que consulte la tasa máxima legal vigente para microcréditos (la puedes obtener del BCRP).

// * Si el prestamista ingresa una tasa que supera este límite (ej. 10% mensual), la aplicación debe mostrar una advertencia clara:

// * "⚠️ Advertencia: La tasa de interés ingresada (X% Anual) supera la tasa máxima establecida por el BCRP. El uso de esta tasa podría considerarse Usura."
//  tipificado en el Artículo 214 del Código Penal del Perú.

// 3. Disclaimer Legal Fuerte: En los términos y condiciones de uso, establece claramente que la aplicación es solo una herramienta de cálculo y que el 
// usuario es el único responsable de asegurar que las tasas aplicadas cumplan con la legislación peruana vigente contra la Usura.