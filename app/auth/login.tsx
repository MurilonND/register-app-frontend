import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }

        try {
            const response = await axios.post("http://192.168.0.171:3000/auth/login", {
                email,
                password,
            });

            if (response.data) {
                // Alert.alert("Sucesso", "Login realizado!");
                // TODO: Salvar User Data
                router.replace("/product");
            } else {
                Alert.alert("Erro", "Credenciais inválidas.");
            }
        } catch (error) {
            Alert.alert("Erro", "Falha na autenticação. Tente novamente.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => router.push("/auth/register")}
                style={styles.registerLink}
            >
                <Text style={styles.registerText}>
                    Não tem uma conta? <Text style={styles.registerHighlight}>Registre-se</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#4CAF50",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    registerLink: {
        marginTop: 10,
    },
    registerText: {
        fontSize: 16,
        color: "#333",
    },
    registerHighlight: {
        color: "#4CAF50",
        fontWeight: "bold",
    },
});
