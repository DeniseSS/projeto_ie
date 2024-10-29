import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SignUp({ setIsAuthenticated }) {
  const [user, setUser] = useState({
    nome: '',
    email: '',
    senha: ''
  });

  const navigation = useNavigation(); // Hook para navegação

  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = () => {
    // Simula o cadastro do usuário
    if (user.nome && user.email && user.senha) {
      Alert.alert('Usuário cadastrado com sucesso!');
      setIsAuthenticated(true); // Define o usuário como autenticado
      navigation.navigate('Home'); // Redireciona para a página principal
    } else {
      Alert.alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={styles.signupContainer}>
      <Text style={styles.title}>Cadastro de Usuário</Text>
      
      <View style={styles.inputContainer}>
        <Text>Nome:</Text>
        <TextInput
          style={styles.input}
          value={user.nome}
          onChangeText={(value) => handleChange('nome', value)}
          required
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          value={user.email}
          keyboardType="email-address"
          onChangeText={(value) => handleChange('email', value)}
          required
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Senha:</Text>
        <TextInput
          style={styles.input}
          value={user.senha}
          secureTextEntry={true}
          onChangeText={(value) => handleChange('senha', value)}
          required
        />
      </View>

      <Button title="Cadastrar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default SignUp;

