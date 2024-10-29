import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FormPage from './FormPage';  // Página de formulário
import InfoPage from './InfoPage';  // Página de informações
import SignUp from './SignUp';      // Página de cadastro
import PostPage from './PostPage';  // Nova página de postagens
import Images from './images';
import Publication from './Publication';

const Stack = createStackNavigator();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Verifica se o usuário está autenticado

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Rota da tela de cadastro */}
        <Stack.Screen name="SignUp">
          {() => <SignUp setIsAuthenticated={setIsAuthenticated} />}
        </Stack.Screen>

        {/* Rota para a página principal, protegida */}
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false}} />
        
        {/* Rota para o formulário, protegida */}
        <Stack.Screen name="FormPage" component={FormPage} options={{ headerShown: true }} />

        {/* Rota para a página de informações, protegida */}
        <Stack.Screen name="InfoPage" component={Publication} options={{ headerShown: true }} />

        {/* Nova rota para a página de postagens (Seção 1) */}
        <Stack.Screen name="PostPage" component={Images} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>Asfalto</Text>
        <Text>Informações sobre o asfalto.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('PostPage')}>
          <Text style={styles.link}>Clique aqui para ver as postagens</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Iluminação</Text>
        <Text>Informações sobre a iluminação.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('InfoPage')}>
          <Text style={styles.link}>Clique aqui para ver mais informações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    marginTop: 10,
  }
});

export default App;
