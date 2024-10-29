import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

function FormPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: ''
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    // Aqui você pode manipular os dados do formulário, enviando-os para um servidor, por exemplo
    Alert.alert(`Nome: ${formData.nome}, Email: ${formData.email}, Mensagem: ${formData.mensagem}`);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Formulário de Contato</Text>

      <View style={styles.inputContainer}>
        <Text>Nome:</Text>
        <TextInput
          style={styles.input}
          value={formData.nome}
          onChangeText={(value) => handleChange('nome', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          keyboardType="email-address"
          onChangeText={(value) => handleChange('email', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Mensagem:</Text>
        <TextInput
          style={styles.textarea}
          value={formData.mensagem}
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChange('mensagem', value)}
        />
      </View>

      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
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
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    height: 100,
    textAlignVertical: 'top', // Para alinhar o texto no topo no Android
  },
});

export default FormPage;

