import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

type Product = {
  id: number;
  name: string;
  quantity: number;
};

export default function ProductIndex() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://192.168.0.171:3000/products");
      setProducts(response.data);
    } catch (error) {
      Alert.alert("Erro", "Falha ao carregar produtos.");
    }
  };

  const handleDelete = async (id: number) => {
    Alert.alert("Confirmação", "Tem certeza que deseja excluir este produto?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`http://192.168.0.171:3000/products/${id}`);
            Alert.alert("Sucesso", "Produto excluído!");
            fetchProducts();
          } catch (error) {
            Alert.alert("Erro", "Falha ao excluir o produto.");
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View>
      <View style={styles.productCard}>
        <View>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productQuantity}>Quantidade: {item.quantity}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push(`/product/edit?id=${item.id}`)}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push(`/product/patch`)}
      >
        <Text style={styles.buttonText}>Registrar entrada/saida</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto encontrado.</Text>}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/product/create")}
      >
        <Text style={styles.addButtonText}>Adicionar Produto</Text>
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
  list: {
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  productQuantity: {
    fontSize: 16,
    color: "#666",
  },
  registerButton: {
    backgroundColor: "#4d81ff",
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
});
