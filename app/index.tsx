import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from "expo-router";

export default function WelcomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.welcomeText}>
        Bem-vindo à nossa aplicação!
      </ThemedText>
      <ThemedText style={styles.description}>
        Estamos felizes em tê-lo aqui. Explore nossas funcionalidades de manipulação de inventario e aproveite a experiência.
      </ThemedText>


      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.replace("/auth/login")}
      >
        <Text style={styles.buttonText}>Entrar na sua conta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.replace("/auth/register")}
      >
        <Text style={styles.buttonText}>Criar uma nova conta</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    margin:10,
    borderRadius: 5,
  },
  registerButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
