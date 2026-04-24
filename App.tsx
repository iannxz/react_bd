import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/screens/Home/Home"
import Categorias from "./src/screens/Categorias/Categorias"
import Produtos from "./src/screens/Produtos/Produtos";

export type RootStackParamList = {
  Home: undefined;
  Categorias: undefined;
  Produtos: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Tela Inicial" }}
        />
        <Stack.Screen
          name="Categorias"
          component={Categorias}
        />
        <Stack.Screen
          name="Produtos"
          component={Produtos}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
