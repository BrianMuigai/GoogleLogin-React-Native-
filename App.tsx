// App.js
import React from 'react';
import {View, StatusBar} from 'react-native';
import {AuthProvider} from './src/presentation/contexts/AuthContext';
import LoginScreen from './src/presentation/screens/LoginScreen';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';

// Create a custom theme by overriding the DefaultTheme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EF4E60', // Set your primary color here
  },
};

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        {/* Set a light background and dark icons */}
        <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
        <View style={{flex: 1}}>
          <LoginScreen />
        </View>
      </PaperProvider>
    </AuthProvider>
  );
}
