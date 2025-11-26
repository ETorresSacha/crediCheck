import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Users from "../../components/users/Users";
import ModalLeyenda from "../../modals/modalLeyenda/ModalLeyenda";
import { Entypo, Fontisto } from "@expo/vector-icons";
import { orderData } from "../../utils/thunks/Thunks";
import { renderImportData } from "./renderImportData";
import MessageNotification from "../notificacionExpo/MessageNotification";
import { RFPercentage } from "react-native-responsive-fontsize";

const RenderCustomer = ({
  data,
  setData,
  enable,
  dataConfiguration,
  valueImport,
  setValueImport,
  dataCustomer,
  day,
  inicio,
}) => {
  const [order, setOrder] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Ordenar
  const handleSort = (type, value) => {
    // dataFilter toma los valores dependiendo de que componente es llamado la función,
    // "clientes" o "clientes cancelados"
    let dataFilter = !enable
      ? dataCustomer?.dataResult
      : dataCustomer?.customerCanceled;

    let result = orderData(type, dataFilter, value, enable);
    setData({ ...data, dataResult: result });
    setOrder(!value);
  };

  // Importar data cuando se active el valor de valueImport
  useFocusEffect(
    React.useCallback(() => {
      //Función
      renderImportData(
        valueImport,
        setValueImport,
        data,
        setData,
        dataCustomer?.dataResult
      );
    }, [valueImport])
  );

  return (
    <View style={styles.container}>
      {/* Encabezado de los datos a renderizar */}
      <View style={!enable ? [styles.containerTitle] : [styles.containerTitle]}>
        {/* DNI */}
        <TouchableOpacity
          style={[styles.title, { width: RFPercentage(8.5) }]}
          onPress={() => handleSort("dni", order, enable)}
        >
          <Text style={[styles.texTitle]}>DNI</Text>
        </TouchableOpacity>

        {/* Nombre */}
        <TouchableOpacity
          style={[
            styles.title,
            { width: RFPercentage(10), alignItems: "flex-start" },
          ]}
          onPress={() => handleSort("nombre", order)}
        >
          <Text style={[styles.texTitle]}>NOMBRE</Text>
        </TouchableOpacity>

        {/* Fecha de pago */}
        {!enable ? (
          <TouchableOpacity
            style={[styles.title, { width: RFPercentage(10) }]}
            onPress={() => handleSort("fecha", order)}
          >
            <Text style={styles.texTitle}>FECHA DE PAGO</Text>
          </TouchableOpacity>
        ) : null}

        {/* Monto de la cuota o del préstamo */}
        <TouchableOpacity
          style={[styles.title, { width: RFPercentage(8.5) }]}
          onPress={() => handleSort("cuota", order)}
        >
          <Text style={[styles.texTitle, { textAlign: "center" }]}>
            {!enable ? "CUOTA" : "CRÉDITO"}
          </Text>
        </TouchableOpacity>

        {/* Icono de alerta */}
        {!enable ? (
          <View style={[styles.title, { width: RFPercentage(3.2) }]}></View>
        ) : null}
      </View>

      {/* Renderiza los datos  */}
      <ScrollView style={styles.containerCuotas}>
        {!enable ? ( //  clientes
          <Users
            data={dataCustomer?.dataResult}
            dataConfiguration={dataConfiguration}
            day={day}
          />
        ) : (
          // Clientes cancelados
          <Users
            data={dataCustomer?.customerCanceled}
            dataConfiguration={dataConfiguration}
            enable={enable}
          />
        )}
      </ScrollView>

      {/* Ícono de la cantidad de clientes */}
      <View style={[styles.piePagina]}>
        <View style={styles.iconoAllUser}>
          <Entypo
            name={!enable ? "user" : "remove-user"}
            style={{ color: "rgb(250, 191, 15)", fontSize: 30 }}
          ></Entypo>
          <View style={{ display: "flex", alignItems: "center" }}>
            <Text style={styles.piePaginaText}>
              {!enable
                ? dataCustomer?.dataResult?.length
                : dataCustomer?.customerCanceled?.length}
            </Text>
            <Text style={styles.textPiePagina}>Clientes</Text>
          </View>
        </View>

        {/* Ícono de la leyenda */}
        {!enable ? (
          <TouchableOpacity
            style={[styles.title]}
            onPress={() => setIsVisible(true)}
          >
            <Fontisto
              name="pie-chart-2"
              style={{ color: "rgb(207, 250, 15)", fontSize: 21 }}
            />
            <Text style={styles.textPiePagina}>Leyenda</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Modal de la leyenda */}
      <ModalLeyenda
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        clientes={dataCustomer}
        day={day}
      />

      {/* Notificaciones de los clientes por cobrar */}
      {!inicio ? <MessageNotification data={dataCustomer} day={day} /> : null}
    </View>
  );
};

export default RenderCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(36, 146, 224, 0.625)",
    marginHorizontal: 7,
    marginBottom: 5,
  },
  containerTitle: {
    borderTopStartRadius: 13,
    borderTopEndRadius: 13,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
    height: 50,
  },
  title: {
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    textAlign: "center",
  },
  texTitle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 13,
    color: "white",
  },
  containerCuotas: {
    borderColor: "rgb(198, 198, 198)",
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  containerNoCustomers: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 200,
  },
  piePagina: {
    display: "flex",
    borderBottomStartRadius: 13,
    borderBottomEndRadius: 13,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
    height: 37,
  },
  iconoAllUser: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    gap: 5,
  },
  piePaginaText: {
    fontSize: 17,
    color: "white",
  },
  textPiePagina: {
    fontSize: 9,
    color: "white",
    fontWeight: "bold",
  },
});
