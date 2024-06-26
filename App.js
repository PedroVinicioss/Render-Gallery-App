import React, { useEffect } from 'react';
import Routes from "./src/routes/routes";
import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './context/CartContext.js';
import { FavProvider } from './context/FavContext.js';
import { ThemeProvider } from './ThemeContext'; 
import { AuthProvider } from './context/AuthContext.js';
import { LogBox } from "react-native";
import { useSignalR } from './useSignalR';
import { registerForPushNotificationsAsync } from './notificationHelper';

LogBox.ignoreAllLogs(true);

export default function App() {
  const { connection, isConnected } = useSignalR();

  useEffect(() => {
    const configureNotifications = async () => {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        console.log('Push Notification Token:', token);
      }
    };

    configureNotifications();
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <FavProvider>
            <NavigationContainer>
              <Routes connection={connection} isConnected={isConnected} />
            </NavigationContainer>
          </FavProvider>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
