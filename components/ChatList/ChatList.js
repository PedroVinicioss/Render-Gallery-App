import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useThemedStyles } from "./useThemedStyles";

const ChatList = ({ chats, onPressChatItem }) => {
    const styles = useThemedStyles(); 
    const renderChatItem = ({ item }) => {
        // console.log(item);
        return (
            <TouchableOpacity
                style={styles.chatItem}
                onPress={() => onPressChatItem(item)}
                >
                <Image
                    source={{ uri: item.user_chat.pic }}
                    style={styles.userPic}
                />
                <View style={styles.chatDetails}>
                    <Text style={styles.userName}>{item.user_chat.name}</Text>
                    <Text style={styles.lastMessage}>{item.messages.length > 0 ? item.messages[item.messages.length - 1].msg_content : 'No messages'}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={chats}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.chat_id.toString()}
            contentContainerStyle={styles.listContainer}
        />
    );
};

export default ChatList;
