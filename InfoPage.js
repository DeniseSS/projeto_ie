import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

function InfoPage() {
  const [info, setInfo] = useState([]); // Lista de informações
  const {image, setImage} = useState<ImageSourcePropType | null>(null); 
  const [caption, setCaption] = useState(""); // Legenda opcional para a imagem

  // Função para selecionar uma imagem
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setImage(uri);
    }
  };

  // Função para adicionar a informação
  const handleAddInfo = () => {
    if (image) {
      const newInfo = { id: Date.now(), image, caption }; // Cria uma nova informação com imagem e legenda
      setInfo([...info, newInfo]); // Adiciona a nova informação à lista
      setImage(null); // Limpa o estado da imagem
      setCaption(""); // Limpa o estado da legenda
    } else {
      Alert.alert("Por favor, selecione uma imagem.");
    }
  };

  return (
    <View style={styles.infoPage}>
      <Text style={styles.title}>Informações</Text>

      <View style={styles.infoForm}>
        <Text style={styles.subtitle}>Adicionar nova informação</Text>

        <Button title="Escolha uma imagem" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={styles.infoImage} />}

        <TextInput
          style={styles.input}
          placeholder="Escreva uma legenda (opcional)"
          value={caption}
          onChangeText={setCaption}
        />

        <Button title="Adicionar" onPress={handleAddInfo} />
      </View>

      <View style={styles.infoFeed}>
        <Text style={styles.subtitle}>Informações enviadas</Text>
        {info.length === 0 && <Text>Nenhuma informação ainda.</Text>}

        <FlatList
          data={info}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.infoItem}>
              {item.image && (
                <Image source={item.image} style={styles.infoImage} />
              )}
              {item.caption ? (
                <Text style={styles.infoText}>{item.caption}</Text>
              ) : (
                <Text style={styles.infoText}>Sem legenda</Text>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoPage: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoForm: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  imagePicker: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
  },
  imagePickerText: {
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  infoFeed: {
    flex: 1,
  },
  infoItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  infoImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
  },
});

export default InfoPage;
