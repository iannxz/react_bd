import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Produto = {
  id: string;
  nome: string;
  preco: string;
  categoria: string;
};

export default function Produtos() {
  const [modalVisible, setModalVisible] = useState(false);
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const categorias: string[] = [];

  function Salvar() {
    if (nome.trim()) {
      setProdutos((prev) => [
        ...prev,
        { id: Date.now().toString(), nome, preco, categoria },
      ]);
    }
    setNome("");
    setPreco("");
    setCategoria("");
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <Text style={styles.titulo}>Produtos</Text>
          <Pressable onPress={() => setModalVisible(true)} style={styles.btnNovo}>
            <Text style={styles.btnNovoTexto}>Novo +</Text>
          </Pressable>
        </View>

        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={
            <Text style={styles.semProdutos}>Nenhum produto cadastrado.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardNome}>{item.nome}</Text>
                <TouchableOpacity
                  onPress={() =>
                    setProdutos((prev) => prev.filter((p) => p.id !== item.id))
                  }
                  style={styles.btnRemover}
                >
                  <Text style={styles.btnRemoverTexto}>Remover</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cardInfo}>
                {item.preco ? (
                  <Text style={styles.cardPreco}>R$ {item.preco}</Text>
                ) : null}
                {item.categoria ? (
                  <Text style={styles.cardCategoria}>{item.categoria}</Text>
                ) : null}
              </View>
            </View>
          )}
        />

        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => {
              setDropDownVisible(false);
              setModalVisible(false);
            }}
          />

          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Adicionar Produto</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome do produto"
              value={nome}
              onChangeText={setNome}
            />

            <TextInput
              style={styles.input}
              placeholder="Preço"
              value={preco}
              onChangeText={setPreco}
              keyboardType="numeric"
            />

            <Pressable
              style={styles.stylesDropDown}
              onPress={() => setDropDownVisible((prev) => !prev)}
            >
              <Text style={categoria ? styles.textoDropDown : styles.placeholderDropDown}>
                {categoria || "Selecionar Categoria"}
              </Text>
            </Pressable>

            {dropDownVisible && (
              <View style={styles.dropDownLista}>
                {categorias.length === 0 ? (
                  <Text style={styles.dropDownVazio}>Nenhuma categoria disponível</Text>
                ) : (
                  categorias.map((cat) => (
                    <Pressable
                      key={cat}
                      style={styles.dropDownItem}
                      onPress={() => {
                        setCategoria(cat);
                        setDropDownVisible(false);
                      }}
                    >
                      <Text style={styles.dropDownItemTexto}>{cat}</Text>
                    </Pressable>
                  ))
                )}
              </View>
            )}

            <View style={styles.modalBotoes}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.btnCancelar]}
                onPress={() => {
                  setDropDownVisible(false);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.btnTexto}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.btnSalvar]}
                onPress={Salvar}
              >
                <Text style={styles.btnTexto}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#10142c",
  },
  btnNovo: {
    backgroundColor: "#303345",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnNovoTexto: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  lista: {
    padding: 16,
    gap: 12,
    flexGrow: 1,
  },
  semProdutos: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 16,
    marginTop: 40,
  },
  card: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 16,
    gap: 6,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnRemover: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  btnRemoverTexto: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  cardNome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#10142c",
  },
  cardInfo: {
    flexDirection: "row",
    gap: 12,
  },
  cardPreco: {
    fontSize: 14,
    color: "#374151",
  },
  cardCategoria: {
    fontSize: 14,
    color: "#6b7280",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    gap: 12,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#10142c",
    marginBottom: 8,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#f9fafb",
  },
  modalBotoes: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  modalBtn: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnCancelar: {
    backgroundColor: "#6b7280",
  },
  btnSalvar: {
    backgroundColor: "#10142c",
  },
  btnTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  stylesDropDown: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
  },
  textoDropDown: {
    fontSize: 15,
    color: "#111827",
  },
  placeholderDropDown: {
    fontSize: 15,
    color: "#9ca3af",
  },
  dropDownLista: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  dropDownVazio: {
    padding: 12,
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 14,
  },
  dropDownItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  dropDownItemTexto: {
    fontSize: 15,
    color: "#111827",
  },
});
