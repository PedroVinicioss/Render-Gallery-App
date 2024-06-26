import { useEffect, useRef, useState } from 'react';
import * as SignalR from '@microsoft/signalr';
import { API_BASE_URL } from './env';
import { registerForPushNotificationsAsync, scheduleNotification, handleNotification, handleNotificationResponse, sendPushNotification } from './notificationHelper'; // Importa o helper

export const useSignalR = () => {
  const connection = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
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


      connection.current.on("ReceiveMessage", (message) => {
        // Envia notificação
        scheduleNotification(
            {
                // title: "Nova mensagem",
                // body: message.message,
                // data: { data: message },
                title: "Nova mensagem",
                body: "Você recebeu uma nova mensagem..." + message.message,
                data: { data: message },
            },
        );
    });

    return () => {
      connection.current.stop().then(() => console.log("Desconectado do SignalR"));
    };
  }, []);

  return {
    connection: connection.current,
    isConnected,
  };
};
