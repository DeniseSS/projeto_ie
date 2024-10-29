import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  Alert,
  FlatList,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Use esta biblioteca para a seleção de imagem
import { useNavigation } from '@react-navigation/native';

const PlaceholderImage = require('./assets/icon.png'); // Placeholder para a imagem

export default function Images() {
  const navigation = useNavigation(); // Obtém o objeto de navegação
  const [posts, setPosts] = useState([]); // Lista de postagens
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined); // Imagem selecionada
  const [caption, setCaption] = useState(''); // Legenda opcional para a imagem
  const [address, setAddress] = useState(''); // Endereço
  const [cep, setCep] = useState(''); // CEP
  const [city, setCity] = useState(''); // Cidade

  // Função para selecionar uma imagem
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Define a imagem selecionada
    } else {
      alert('Você não selecionou nenhuma imagem.');
    }
  };

  // Função para buscar informações de endereço baseado no CEP
  const fetchAddressByCep = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setAddress(data.logradouro);
        setCity(data.localidade);
      } else {
        Alert.alert('CEP não encontrado.');
        setAddress('');
        setCity('');
      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      Alert.alert('Erro ao buscar endereço. Tente novamente.');
    }
  };

  // Função para postar a imagem e os dados
  const handlePost = () => {
    if (selectedImage) {
      const newPost = {
        image: { uri: selectedImage },
        caption,
        address,
        cep,
        city,
      }; // Cria um novo post
      setPosts([newPost, ...posts]); // Adiciona nova postagem ao início da lista
      setSelectedImage(undefined); // Limpa a imagem selecionada
      setCaption(''); // Limpa a legenda
      setAddress(''); // Limpa o endereço
      setCep(''); // Limpa o CEP
      setCity(''); // Limpa a cidade
    } else {
      Alert.alert('Por favor, selecione uma imagem.');
    }
  };

  return (
    <View style={styles.postPage}>
      <Text style={styles.title}>Postagens de Fotos</Text>

      <View style={styles.postForm}>
        <Text style={styles.subtitle}>Postar uma nova foto</Text>

        <Button title="Escolher uma foto" onPress={pickImageAsync} />
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={styles.selectedImage}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Escreva uma legenda (opcional)"
          value={caption}
          onChangeText={(text) => setCaption(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite o CEP"
          value={cep}
          onChangeText={(text) => {
            setCep(text);
            if (text.length === 8) fetchAddressByCep(text); // Chama a função ao preencher o CEP
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={address}
          onChangeText={setAddress}
        />

        <TextInput
          style={styles.input}
          placeholder="Cidade"
          value={city}
          onChangeText={setCity}
        />

        <Button title="Postar" onPress={handlePost} />
      </View>

      <View style={styles.postFeed}>
        <Text style={styles.subtitle}>Postagens recentes</Text>
        {posts.length === 0 && <Text>Nenhuma postagem ainda.</Text>}

        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Image source={item.image} style={styles.postImage} />
              {item.caption && <Text style={styles.postCaption}>{item.caption}</Text>}
              <Text style={styles.postAddress}>Endereço: {item.address}</Text>
              <Text style={styles.postCity}>Cidade: {item.city}</Text>
              <Text style={styles.postCep}>CEP: {item.cep}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postPage: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  postForm: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  postFeed: {
    flex: 1,
  },
  post: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  postCaption: {
    fontSize: 16,
  },
  postAddress: {
    fontSize: 14,
  },
  postCity: {
    fontSize: 14,
  },
  postCep: {
    fontSize: 14,
  },
});
