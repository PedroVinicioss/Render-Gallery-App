import React from 'react';
import Routes from "./src/routes/routes";
import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './context/CartContext.js';
import { FavProvider } from './context/FavContext.js';
import { ThemeProvider } from './ThemeContext'; 
import { AuthProvider } from './context/AuthContext.js';
import { LogBox } from "react-native";
import { SignalRProvider } from './context/SignalRContext';

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <FavProvider>
            <SignalRProvider>
              <NavigationContainer>
                <Routes />
              </NavigationContainer>
            </SignalRProvider>
          </FavProvider>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
