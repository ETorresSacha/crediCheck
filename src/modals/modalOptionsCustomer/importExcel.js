import { editImportData } from '../../views/customer/editImportData';
import { Alert } from "react-native";
import UseStorage from '../../components/hooks/UseHookStorage';
import { orderData } from '../../utils/thunks/Thunks';
import Papa from 'papaparse';
import * as DocumentPicker from 'expo-document-picker';
import { File } from 'expo-file-system';

export const importExcel = async (data, setData, accion) => {
  const { onSaveCronograma } = UseStorage();
  try {
    // Seleccionamos el archivo y copiamos al almacenamiento del equipo
    const result = await DocumentPicker.getDocumentAsync({
    type: "*/*",
    copyToCacheDirectory: true,
  })

  // Guardamos la uri
  const fileUri = result.assets[0].uri;

  // Crear una instancia del archivo local
  const file = new File(fileUri);

  // Leer su contenido como texto (por ejemplo CSV o JSON)
  const csvContent = await file.text();

  //  Convierte el CSV a JSON con PapaParse
    const convertToJson = Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
    });

  // Parseamos los valores de resultPrestamo a un formato de JSON
    let resultData = editImportData(convertToJson.data);

  // Cambiamos el valor de canceled de string a booleano
    resultData.map((elem)=>{
      elem = {...elem,
          canceled:elem.canceled = /^true$/i.test(elem.canceled)
                    ? true
                    : /^false$/i.test(elem.canceled)
                    ? false
                    : elem.canceled}
      })
      
    // Verificamos si hay error en los datos importados
    if (resultData.error) {
      Alert.alert("Error", "Los datos no son válidos");
      
    } else {
      // Combinamos los datos dependiendo de la acción
      let combinedData

      if(accion ==="añadir"){
        const noRepetidos = resultData.filter(n =>!data.dataResult.some(d => d.uuid === n.uuid));
        combinedData = [...data.dataResult,...noRepetidos];
      }
      else{
        combinedData = resultData;
      }

      // Alerta de confirmación
      Alert.alert(
        "¡ALERTA!",
         `Se va ${accion ? accion : "importar"} nuevos clientes. ¿Desea continuar?`,

          [
            {
              text: "Si",
              onPress: async () => {
                // Guardamos los datos combinados
                  await onSaveCronograma(combinedData, "import");
                // Actualizamos el estado
                  setData({...data,
                    dataResult: orderData("fecha", combinedData, false),
                    dataResultCopy: orderData("fecha", combinedData, false)});
              },
              style: "destructive",
            },
            {
              text: "No",   
              style: "destructive",
            },
          ]
        )

    }
    
  } catch (error) {
    console.error('Error al importar:', error);
    Alert.alert("Error", "Error al leer el archivo. Asegúrese de que esté guardado en un formato CSV compatible.");
  }
};
