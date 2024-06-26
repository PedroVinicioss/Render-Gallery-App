import React, { useEffect, useState, useContext, useRef } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'; 
import { AuthContext } from "../../../context/AuthContext";
import axios from 'axios';
import { API_BASE_URL } from '../../../env';
import { useSignalR } from '../../../context/SignalRContext';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const { user } = useContext(AuthContext);
  const { connection, isConnected } = useSignalR();
  const urlApi = API_BASE_URL;

  if (user == null) {
    navigation.navigate("Login");
  }

  const route = useRoute();
  const { user_chat, chat_id, messages_chat } = route.params;

  useEffect(() => {
    if (messages_chat && messages_chat.length > 0) {
      setMessages(messages_chat.map((msg, index) => ({
        id: index,
        text: msg.msg_content,
        sender: msg.user_id_from === user.id ? 'user' : 'other',
        senderName: msg.user_id_from === user.id ? user.name : user_chat.name,
        timestamp: new Date(msg.dataHora)
      })));
    } else {
      setMessages([]);
    }
  }, [messages_chat]);

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsOpen(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsOpen(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (isConnected && connection) {
      connection.on("ReceiveMessage", (message) => {
        console.log("Nova mensagem recebida:", message);
        setMessages(prevMessages => [...prevMessages, {
          id: prevMessages.length,
          text: message.message,
          sender: 'other',
          senderName: message.from.toString(),
          timestamp: new Date(message.dateTime)
        }]);
      });

      return () => {
        connection.off("ReceiveMessage");
      };
    }
  }, [isConnected, connection]);

  const handleMessageSend = async () => {
    if (message.trim() === '') return;

    try {
      const data = {
        from: user.id,
        to: user_chat.id, 
        msg: message,
        cid: chat_id
      };

      const response = await axios.post(`${urlApi}/sendMessageChat`, data);

      console.log(response.data);

      const newMessage = { id: messages.length, text: message, sender: 'user', timestamp: new Date() };
      setMessages([...messages, newMessage]);
      setMessage('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  const renderMessagesWithDateSeparators = () => {
    let lastMessageDate = null;

    return messages.map((msg, index) => {
      const messageDate = msg.timestamp.toDateString();
      const showDateSeparator = messageDate !== lastMessageDate;
      lastMessageDate = messageDate;

      return (
        <View key={msg.id}>
          {showDateSeparator && <Text style={styles.dateSeparator}>{messageDate}</Text>}
          <Message
            text={msg.text}
            sender={msg.sender}
            senderName={msg.senderName}
            timestamp={msg.timestamp}
            messages={messages} 
          />
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.buttonIconBack}
        >
          <Ionicons name="chevron-back" size={25} color="#00406A" />
        </TouchableOpacity>
        <Image
          source={{ uri: user_chat.pic }}
          style={{ width: 40, height: 40, borderRadius: 25, marginLeft: 10 }}
        />
        <View style={{ alignItems: "flex-start", height: "100%" }}>
          <Text style={styles.title}>{user_chat.name}</Text>
          <Text style={styles.title2}>Online</Text>
        </View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {renderMessagesWithDateSeparators()}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={[styles.inputContainer, { paddingBottom: 5 }]}
      >
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={message}
          onChangeText={(text) => setMessage(text)}
          onSubmitEditing={handleMessageSend}
        />
        <TouchableOpacity style={styles.circleContainer} onPress={handleMessageSend}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const Message = ({ text, sender, senderName, timestamp, messages }) => {
  const isUser = sender === 'user';
  const messageStyle = isUser ? styles.userMessage : styles.otherMessage;
  const timeStyle = isUser ? styles.userMessage : styles.otherMessage;
  const messageTextColor = isUser ? 'white' : 'black';
  const showSenderName = !isUser && (messages.length === 0 || messages[messages.length - 1]?.sender !== 'other');

  const formattedTime = timestamp ? formatTime(timestamp) : '';

  return (
    <View>
      <View style={[styles.messageContainer, messageStyle]}>
        <Text style={[styles.messageText, { color: messageTextColor }]}>{text}</Text>
        <Text style={[styles.timestamp, { color: messageTextColor }]}>{formattedTime}</Text>
      </View>
    </View>
  );
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    marginTop: 0,
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    height: 100,
    paddingHorizontal: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: "center",
  },
  title2: {
    marginLeft: 10,
    fontSize: 14,
    color: '#000000',
    textAlign: "center",
  },
  messagesContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  messageContainer: {
    maxWidth: '80%',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#00406A',
    marginTop: 0, 
    borderTopRightRadius: 0,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ddd',
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  senderName: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
    alignSelf: 'flex-end',
    marginTop: 3,
    marginLeft: 10,
  },
  dateSeparator: {
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: 12,
    color: '#888',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginRight: 10,
  },
  circleContainer: {
    backgroundColor: "#00406A",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
