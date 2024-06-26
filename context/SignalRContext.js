import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import * as SignalR from '@microsoft/signalr';
import { API_BASE_URL } from '../env';
import { registerForPushNotificationsAsync, scheduleNotification } from '../notificationHelper';

const SignalRContext = createContext();

export const SignalRProvider = ({ children }) => {
  const connection = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function configureNotifications() {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        console.log('Push Notification Token:', token);
        setToken(token);

        connection.current = new SignalR.HubConnectionBuilder()
          .withUrl(`${API_BASE_URL}/chatHub`)
          .configureLogging(SignalR.LogLevel.Information)
          .build();

        connection.current.start()
          .then(() => {
            console.log("Conectado ao SignalR");
            setIsConnected(true);
          })
          .catch((err) => console.error("Erro ao conectar ao SignalR", err));

        connection.current.on("SendMessageNotification", (message) => {
          scheduleNotification(
            {
              title: "Nova mensagem",
              body: "Você recebeu uma nova mensagem...",
              data: { data: message },
            },
            { token: token }
          );
        });

        return () => {
          connection.current.stop().then(() => console.log("Desconectado do SignalR"));
        };
      }
    }

    configureNotifications();

  }, []);

  useEffect(() => {
    console.log("Token atualizado:", token);

    // Coloque outras lógicas dependentes do token aqui, se necessário

  }, [token]);

  return (
    <SignalRContext.Provider value={{ connection: connection.current, isConnected }}>
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = () => {
  return useContext(SignalRContext);
};
