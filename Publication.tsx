import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { Card, Button } from 'react-native-paper';

const Publication = () => {
  const [posts, setPosts] = useState([]);

  // Função para buscar dados da API
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://192.168.0.103:3000/publication'); // Altere para o endpoint correto
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <Card.Content>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.image} />
            )}
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.address}>Endereço: {item.address}</Text>
            <Text style={styles.city}>Cidade: {item.city}</Text>
            <Text style={styles.cep}>CEP: {item.cep}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => console.log('Cancel pressed')}>Cancel</Button>
            <Button onPress={() => console.log('Ok pressed')}>Ok</Button>
          </Card.Actions>
        </Card>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    marginBottom: 5,
  },
  city: {
    fontSize: 14,
    marginBottom: 5,
  },
  cep: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default Publication;
