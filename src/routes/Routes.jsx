import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../views/home/Home";
import Customer from "../views/customer/Customer";
import Calculator from "../views/calculator/Calculator";
import NewForm from "../views/newForm/NewForm";
import Detail from "../views/detail/Detail";
import VerCronograma from "../views/cronograma/VerCronograma";

const optionsStack = {
  headerStyle: {
    backgroundColor: "rgb(31, 36, 36)",
  },
  headerTintColor: "white",
  headerTitleAlign: "center",
};

const Routes = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ optionsStack, statusBarColor: "black" }}
        />
        <Stack.Screen
          name="Clientes"
          component={Customer}
          options={{ optionsStack, statusBarColor: "black" }}
        />
        <Stack.Screen
          name="Calculadora"
          component={Calculator}
          options={{ optionsStack, statusBarColor: "black" }}
        />

        <Stack.Screen
          name="Nuevo cliente"
          component={NewForm}
          options={{ optionsStack, statusBarColor: "rgb(31, 36, 36)" }}
        />
        <Stack.Screen
          name="Detalle"
          component={Detail}
          options={{ optionsStack, statusBarColor: "rgb(31, 36, 36)" }}
        />
        <Stack.Screen
          name="Cronograma"
          component={VerCronograma}
          options={{ optionsStack, statusBarColor: "rgb(31, 36, 36)" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
