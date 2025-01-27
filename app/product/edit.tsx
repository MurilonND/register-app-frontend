import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useRouter, useGlobalSearchParams } from "expo-router";

export default function EditProduct() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<string | number>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = useGlobalSearchParams();

  useEffect(() => {
    if (id) {
      fetchProductDetails(id as string);
    }
  }, [id]);

  const fetchProductDetails = async (productId: string) => {
    try {
      const response = await axios.get(
        `http://192.168.0.171:3000/products/${productId}`
      );
      const { name, quantity } = response.data;
      setName(name);
      setQuantity(quantity.toString());
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes do produto.");
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !quantity) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`http://192.168.0.171:3000/products/${id}`, {
        name,
        quantity: parseInt(quantity as string, 10),
      });
      Alert.alert("Sucesso", "Produto atualizado com sucesso!");
      router.push("/product");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o produto.");
    } finally {
      setLoading(false);
    }
  };

  //TODO: Adicionar logica de retirada e adição

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Produto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantity.toString()}
        onChangeText={setQuantity}
      />
      <TouchableOpacity
        style={[styles.saveButton, loading && styles.buttonDisabled]}
        onPress={handleSave}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Salvando..." : "Salvar"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.push("/product")}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#F44336",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "#888",
  },
});
