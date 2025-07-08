import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';
import { editImportData } from '../../views/customer/editImportData';
import { Alert } from "react-native";
import UseStorage from '../../components/hooks/UseHookStorage';
import { orderData } from '../../utils/thunks/Thunks';


import * as FileSystem from 'expo-file-system'; // Añade esto

export const importExcel = async (data, setData) => {
  const { onSaveCronograma } = UseStorage();
  try {
const result = await DocumentPicker.getDocumentAsync({  
  type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],  
  copyToCacheDirectory: true, // ¡Clave para Android!  
  multiple: false,  
});  

    if (result.canceled) return;

    const uri = result.assets[0].uri;

    // Leer el archivo con expo-file-system (solución clave)
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Convertir base64 a binary string
    const binaryStr = atob(base64);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }

    // Procesar el Excel
    const workbook = XLSX.read(bytes.buffer, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(worksheet);

    const resultData = editImportData(json);

    if (resultData.error) {
      Alert.alert("Error", "Los datos no son válidos");
    } else {
      await onSaveCronograma(resultData, "import");
      setData({
        ...data,
        dataResult: orderData("fecha", resultData, false),
        dataResultCopy: orderData("fecha", resultData, false),
      });
    }
  } catch (error) {
    console.error('Error al importar:', error);
    Alert.alert("Error", "No se pudo leer el archivo. ¿Está en formato .xlsx?");
  }
};
