// Función para importar y renderizar la data
import { Alert } from "react-native";
import { importExcel } from "../../modals/modalOptionsCustomer/importExcel";

export const renderImportData =(valueImport,setValueImport, data,setData,customer)=>{


    if (valueImport) {
      if (data?.dataResult != null && data?.dataResult?.length != 0) {
        const customerText = customer?.length !== 0 ? "clientes" : "clientes cancelados";
        Alert.alert(
          "¡ALERTA!",
          `Existen ${customerText} guardados.\n¿Prefiere añadir clientes nuevos o sustituir a los actuales?`,
          [
            {
              text: "Añadir",
              onPress: async () => importExcel(data,setData,"añadir"),
              style: "destructive",
            },
            {
              text: "Sustituir",
              onPress: async () => importExcel(data,setData,"sustituir"),
              style: "destructive",
            },
          ]
        );
      } else {
        importExcel(data,setData); // importa
      }
      setValueImport(false);
    }
  }