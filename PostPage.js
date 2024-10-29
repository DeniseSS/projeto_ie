import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, Alert, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

function PostPage() {
  const navigation = useNavigation();  // Obtém o objeto de navegação
  const [posts, setPosts] = useState([]);  // Lista de postagens

  const [caption, setCaption] = useState(''); // Legenda opcional para a imagem



  // Função para postar a imagem
  const handlePost = () => {
    if (image) {
      const newPost = { image, caption };
      setPosts([newPost, ...posts]); // Adiciona nova postagem ao início da lista
      setImage(null);
      setCaption('');
    } else {
      Alert.alert('Por favor, selecione uma imagem.');
    }
  };

  return (
    <View style={styles.postPage}>
      <Text style={styles.title}>Postagens de Fotos</Text>

      <View style={styles.postForm}>
        <Text style={styles.subtitle}>Postar uma nova foto</Text>
        

        <TextInput
          style={styles.input}
          placeholder="Escreva uma legenda (opcional)"
          value={caption}
          onChangeText={(text) => setCaption(text)}
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
  imagePicker: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#333',
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
});

export default PostPage;
