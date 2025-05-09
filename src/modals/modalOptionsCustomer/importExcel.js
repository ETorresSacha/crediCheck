import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';
import { editImportData } from '../../views/customer/editImportData';
import { Alert } from "react-native";
import UseStorage from '../../components/hooks/UseHookStorage';
import { orderData } from '../../utils/thunks/Thunks';
const {  onSaveCronograma } = UseStorage();

export const importExcel = async (data,setData) => {
  
  try {
    console.log("import");
    
    // Permitir al usuario seleccionar un archivo
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
    });
    console.log("result: ",result);
    
    
    if (result.canceled === true) {
      console.log('User cancelled the picker');
      return;
    }
    const  uri   = result.assets[0].uri;
console.log("uri: ",uri);

//     // Leer el archivo usando fetch
//     const response = await fetch(uri);
//     const blob = await response.blob();
//     const reader = new FileReader();

    // reader.onload = (e) => {
    //   const arrayBuffer = e.target.result;
    //   const binaryStr = new Uint8Array(arrayBuffer)
    //     .reduce((data, byte) => data + String.fromCharCode(byte), '');
    //   const workbook = XLSX.read(binaryStr, { type: 'binary' });

    //   // Convertir el primer sheet a JSON
    //   const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    //   const json = XLSX.utils.sheet_to_json(worksheet);

    //   //todo--> Edita los valores que son de tipo string a json
    //   const resultData = editImportData(json)

    //   //todo--> Guarda los datos importados en el storage y setea el estado
    //   const saveImport = async () => {
    //       await onSaveCronograma(resultData, "import"); // guarda en el storage

    //       setData({                                    // Setea el estado
    //         ...data,
    //         dataResult: orderData("fecha",resultData,false) ,
    //         dataResultCopy: orderData("fecha",resultData,false),
    //       });
    //   };

    //   if (resultData.length != 0) {
    //     if (resultData.error) {                        // Cuando ocurre un error
    //       return Alert.alert("Los datos no son válidos");
    //     } else {
    //       saveImport();                                // Guarda
    //     }
    //   }
    //   //     todo--------------------------*-----------------------todo
    // };

    // reader.readAsArrayBuffer(blob);
  } catch (error) {
    console.error('Error:', error);
  }
};



    // // 1. Convertir datos a hoja de cálculo
    // const worksheet = XLSX.utils.json_to_sheet(exampleData);

    // // 2. Crear libro y añadir la hoja
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Clientes");

    // // 3. Escribir archivo en binario
    // const binaryExcel = XLSX.write(workbook, {
    //   type: "binary",
    //   bookType: "xlsx",
    // });

    // // 4. Convertir binario a buffer
    // const buffer = Buffer.from(binaryExcel, "binary");

    // // 5. Convertir a base64 para guardar
    // const base64Excel = buffer.toString("base64");

    // // 6. Definir ruta del archivo
    // const fileUri = FileSystem.documentDirectory + "clientes.xlsx";

    // // 7. Guardar archivo
    // await FileSystem.writeAsStringAsync(fileUri, base64Excel, {
    //   encoding: FileSystem.EncodingType.Base64,
    // });

    // // 8. Compartir archivo
    // await Sharing.shareAsync(fileUri);