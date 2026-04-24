import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";


export default function Home() {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
          <Text style={styles.textoHeader}>Seja bem vindo!</Text>

        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          

          <Text style={styles.textoBotoes}>Escolha uma opção:</Text>

          <View style={styles.navigation}>
            <Pressable
              onPress={() => navigation.navigate("Produtos")}
              style={styles.button}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Produtos</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Categorias")}
              style={styles.button}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Categorias</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  textoHeader: {
    fontSize: 24,
    fontWeight: "bold",
  },
  textoBotoes: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#10142c",
    width: "95%",
    height: 48,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  navigation: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    gap: 12,
  },
});
