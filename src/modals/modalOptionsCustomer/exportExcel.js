import * as Sharing from "expo-sharing";
import { File, Paths } from 'expo-file-system';
import { Alert } from "react-native";
import UseStorage from "../../components/hooks/UseHookStorage";
import { calculoMoraSimple } from "../../utils/calculoCuota/CalculosFuncionesCrediticios";

export const createExcel = async (dataConfiguration) => {
  const { onGetCronograma } = UseStorage();
  try {
    // Traemos todos los datos guardados en el storage
  let resultCustomer = await onGetCronograma();

      if (!resultCustomer || resultCustomer.length === 0) {
        Alert.alert("Aviso", "No hay datos para exportar");
        return;
      }

  // Ánalisis de la mora por cada cliente
  resultCustomer = resultCustomer?.map(element=>{
    let newResult = element?.resultPrestamo.map(ele=>{
      let objeto = {...ele, mora:ele?.statusPay ? ele?.mora :calculoMoraSimple(ele,dataConfiguration)}
      return objeto
    })

     newResult = {...element,resultPrestamo:newResult}

    return newResult

  })

// GUARDAMOS EL ARCHIVO EN FORMATO CSV
// Extraer los encabezados (key del objeto)
const headers = Object.keys(resultCustomer[0]).join(";")

//Crear las filas
  const rows = resultCustomer
    .map((item) => {
      const values = Object.keys(item).map((key) => {
        const value = item[key];

        if (Array.isArray(value)) {

        // Guardar el array como JSON válido dentro de la celda
          const json = JSON.stringify(value);

        // Escapamos las comillas dobles para no romper el CSV
          return `"${json.replace(/"/g, '""')}"`;
        } else {

        // Escapa comillas dobles y reemplaza saltos de línea
          return `"${String(value).replace(/"/g, '""').replace(/\n/g, " ")}"`;
        }
      });
      return values.join(";");
    })
    .join("\n");
  
// Unir todo el archivo en formato CSV
  const csvContent = `${headers}\n${rows}`

//Creamos la ruta
  const file = new File(Paths.document,'Clientes.csv');
  //if (!file.exists) file.create() // Puede generar un error si el archivo ya existe o si no se tienen permisos para crearlo. SI SALE ERROR, HABILITARLO

// Guardamos el contenido
  file.write(csvContent);

//Compartir el archivo
  await Sharing.shareAsync(file.uri);

  }
  catch (error) {
    console.error("Error al importar el archivo:", error);
    Alert.alert("Error", "No se pudo leer el archivo. Asegúrate de que esté disponible localmente.");
  }
  };

